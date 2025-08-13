// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import EmailVerificationModal from '../components/EmailVerificationModal';
const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

export default function Home() {
  const [formData, setFormData] = useState({
    system_size: '',
    total_price: '',
    has_battery: false,
    battery_brand: '',
    battery_quantity: 1,
    battery_capacity: ''
  });
  const [batteryOptions, setBatteryOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      const res = await fetch(`${API_BASE_URL}/battery-options`);
      const data = await res.json();
      setBatteryOptions(data.battery_options || []);
    }
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'has_battery' && !checked
        ? { battery_brand: '', battery_quantity: 1, battery_capacity: '' }
        : {})
    }));
  };

  const handleBatteryBrandChange = (e) => {
    const selected = e.target.value;
    const battery = batteryOptions.find((b) => b.brand === selected);
    setFormData(prev => ({
      ...prev,
      battery_brand: selected,
      battery_capacity: battery && selected !== 'Other'
        ? battery.capacity : ''
    }));
  };

  const calculateTotalCapacity = () => {
    if (!formData.has_battery) return 0;
    if (formData.battery_brand === 'Other') {
      return parseFloat(formData.battery_capacity || 0) * formData.battery_quantity;
    }
    const battery = batteryOptions.find(b => b.brand === formData.battery_brand);
    return battery ? battery.capacity * formData.battery_quantity : 0;
  };

  const handleEmailVerified = (email, adminStatus=false) => {
    setUserEmail(email);
    setIsVerified(true);
    setIsAdmin(adminStatus);
    if (pendingAnalysis) {
      setPendingAnalysis(false);
      setTimeout(() => handleSubmit(), 100);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!isAdmin && analysisCount >= 1 && !isVerified && !pendingAnalysis) {
      setPendingAnalysis(true);
      setShowEmailModal(true);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/analyze-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_email: userEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setAnalysisCount(prev => prev + 1);
        setIsAdmin(data.is_admin || false);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* hero and form omitted for brevity; keep as in previous working version */}
      <EmailVerificationModal
        isOpen={showEmailModal}
        onClose={() => { setShowEmailModal(false); setPendingAnalysis(false); }}
        onVerified={handleEmailVerified}
      />
    </div>
  );
}
