import React, { useState } from 'react';
import { Upload, X, Info, FileText } from 'lucide-react';

const PremiumAnalysisForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Basic fields (from free version)
    systemSize: '',
    totalCost: '',
    batteryIncluded: false,
    batteryBrand: '',
    batteryCapacity: '',
    batteryQuantity: 1,
    location: '',
    email: '',
    
    // Premium fields - Panel details
    panelBrand: '',
    panelModel: '',
    panelWattage: '',
    panelQuantity: '',
    
    // Premium fields - Inverter details
    inverterBrand: '',
    inverterModel: '',
    inverterType: '',
    inverterCapacity: '',
    
    // Premium fields - Battery details (extended)
    batteryModel: '',
    batteryWarranty: '',
    
    // Premium fields - Installation details
    scaffoldingIncluded: false,
    scaffoldingCost: '',
    birdProtectionIncluded: false,
    birdProtectionCost: '',
    roofType: '',
    roofMaterial: '',
    
    // Premium fields - Installer information
    installerCompany: '',
    installerLocation: '',
    installerMCS: '',
    installerYearsInBusiness: '',
    installerWarrantyYears: '',
    
    // Premium fields - Installation timeline
    installationTimeline: '',
    
    // Premium fields - Quote PDF upload
    quotePDF: null
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, quotePDF: 'Please upload a PDF file' }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors(prev => ({ ...prev, quotePDF: 'File size must be less than 10MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, quotePDF: file }));
      setErrors(prev => ({ ...prev, quotePDF: '' }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, quotePDF: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required basic fields
    if (!formData.systemSize || parseFloat(formData.systemSize) <= 0) {
      newErrors.systemSize = 'System size is required';
    }
    if (!formData.totalCost || parseFloat(formData.totalCost) <= 0) {
      newErrors.totalCost = 'Total cost is required';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    
    // Required premium fields - Panel details
    if (!formData.panelBrand) {
      newErrors.panelBrand = 'Panel brand is required';
    }
    if (!formData.panelModel) {
      newErrors.panelModel = 'Panel model is required';
    }
    if (!formData.panelWattage || parseFloat(formData.panelWattage) <= 0) {
      newErrors.panelWattage = 'Panel wattage is required';
    }
    if (!formData.panelQuantity || parseInt(formData.panelQuantity) <= 0) {
      newErrors.panelQuantity = 'Panel quantity is required';
    }
    
    // Required premium fields - Inverter details
    if (!formData.inverterBrand) {
      newErrors.inverterBrand = 'Inverter brand is required';
    }
    if (!formData.inverterModel) {
      newErrors.inverterModel = 'Inverter model is required';
    }
    if (!formData.inverterType) {
      newErrors.inverterType = 'Inverter type is required';
    }
    if (!formData.inverterCapacity || parseFloat(formData.inverterCapacity) <= 0) {
      newErrors.inverterCapacity = 'Inverter capacity is required';
    }
    
    // Battery fields (if battery included)
    if (formData.batteryIncluded) {
      if (!formData.batteryBrand) {
        newErrors.batteryBrand = 'Battery brand is required';
      }
      if (!formData.batteryModel) {
        newErrors.batteryModel = 'Battery model is required';
      }
      if (!formData.batteryCapacity || parseFloat(formData.batteryCapacity) <= 0) {
        newErrors.batteryCapacity = 'Battery capacity is required';
      }
    }
    
    // Required premium fields - Installer information
    if (!formData.installerCompany) {
      newErrors.installerCompany = 'Installer company name is required';
    }
    if (!formData.installerLocation) {
      newErrors.installerLocation = 'Installer location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setUploading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Premium Badge */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👑</span>
          <div>
            <h3 className="text-xl font-bold">Premium Analysis</h3>
            <p className="text-sm opacity-90">Get detailed insights with comprehensive component assessment</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">📊</span> Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                System Size (kW) *
              </label>
              <input
                type="number"
                step="0.01"
                name="systemSize"
                value={formData.systemSize}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.systemSize ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., 4.2"
              />
              {errors.systemSize && <p className="text-red-500 text-sm mt-1">{errors.systemSize}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Cost (£) *
              </label>
              <input
                type="number"
                step="0.01"
                name="totalCost"
                value={formData.totalCost}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.totalCost ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., 8500"
              />
              {errors.totalCost && <p className="text-red-500 text-sm mt-1">{errors.totalCost}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location (City/Postcode) *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., London or SW1A 1AA"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
        </section>

        {/* Panel Details Section */}
        <section className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">☀️</span> Solar Panel Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Panel Brand *
              </label>
              <input
                type="text"
                name="panelBrand"
                value={formData.panelBrand}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.panelBrand ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., JA Solar, Trina, Longi"
              />
              {errors.panelBrand && <p className="text-red-500 text-sm mt-1">{errors.panelBrand}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Panel Model *
              </label>
              <input
                type="text"
                name="panelModel"
                value={formData.panelModel}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.panelModel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., JAM72S30-545/MR"
              />
              {errors.panelModel && <p className="text-red-500 text-sm mt-1">{errors.panelModel}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Panel Wattage (W) *
              </label>
              <input
                type="number"
                step="1"
                name="panelWattage"
                value={formData.panelWattage}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.panelWattage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., 400"
              />
              {errors.panelWattage && <p className="text-red-500 text-sm mt-1">{errors.panelWattage}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Panels *
              </label>
              <input
                type="number"
                step="1"
                name="panelQuantity"
                value={formData.panelQuantity}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.panelQuantity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., 10"
              />
              {errors.panelQuantity && <p className="text-red-500 text-sm mt-1">{errors.panelQuantity}</p>}
            </div>
          </div>
        </section>

        {/* Inverter Details Section */}
        <section className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">⚡</span> Inverter Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inverter Brand *
              </label>
              <input
                type="text"
                name="inverterBrand"
                value={formData.inverterBrand}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.inverterBrand ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., SolarEdge, Enphase, GivEnergy"
              />
              {errors.inverterBrand && <p className="text-red-500 text-sm mt-1">{errors.inverterBrand}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inverter Model *
              </label>
              <input
                type="text"
                name="inverterModel"
                value={formData.inverterModel}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.inverterModel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., SE5000H-RWS"
              />
              {errors.inverterModel && <p className="text-red-500 text-sm mt-1">{errors.inverterModel}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inverter Type *
              </label>
              <select
                name="inverterType"
                value={formData.inverterType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.inverterType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
              >
                <option value="">Select type...</option>
                <option value="string">String Inverter</option>
                <option value="microinverter">Microinverter</option>
                <option value="hybrid">Hybrid Inverter</option>
                <option value="power_optimizer">Power Optimizer</option>
              </select>
              {errors.inverterType && <p className="text-red-500 text-sm mt-1">{errors.inverterType}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inverter Capacity (kW) *
              </label>
              <input
                type="number"
                step="0.01"
                name="inverterCapacity"
                value={formData.inverterCapacity}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.inverterCapacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., 5.0"
              />
              {errors.inverterCapacity && <p className="text-red-500 text-sm mt-1">{errors.inverterCapacity}</p>}
            </div>
          </div>
        </section>

        {/* Battery Details Section */}
        <section className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">🔋</span> Battery Storage
          </h3>
          
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="batteryIncluded"
                checked={formData.batteryIncluded}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-sm font-semibold text-gray-700">Battery storage included in quote</span>
            </label>
          </div>
          
          {formData.batteryIncluded && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Battery Brand *
                </label>
                <input
                  type="text"
                  name="batteryBrand"
                  value={formData.batteryBrand}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.batteryBrand ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="e.g., Tesla, GivEnergy, Enphase"
                />
                {errors.batteryBrand && <p className="text-red-500 text-sm mt-1">{errors.batteryBrand}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Battery Model *
                </label>
                <input
                  type="text"
                  name="batteryModel"
                  value={formData.batteryModel}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.batteryModel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="e.g., Powerwall 3, Giv-Bat 9.5"
                />
                {errors.batteryModel && <p className="text-red-500 text-sm mt-1">{errors.batteryModel}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Battery Capacity (kWh) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="batteryCapacity"
                  value={formData.batteryCapacity}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.batteryCapacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="e.g., 9.5"
                />
                {errors.batteryCapacity && <p className="text-red-500 text-sm mt-1">{errors.batteryCapacity}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Batteries
                </label>
                <input
                  type="number"
                  step="1"
                  name="batteryQuantity"
                  value={formData.batteryQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Battery Warranty (years)
                </label>
                <input
                  type="number"
                  step="1"
                  name="batteryWarranty"
                  value={formData.batteryWarranty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 10"
                />
              </div>
            </div>
          )}
        </section>

        {/* Installation Details Section */}
        <section className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">🏗️</span> Installation Details
          </h3>
          
          <div className="space-y-4">
            {/* Scaffolding */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  name="scaffoldingIncluded"
                  checked={formData.scaffoldingIncluded}
                  onChange={handleChange}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-sm font-semibold text-gray-700">Scaffolding included</span>
              </label>
              
              {formData.scaffoldingIncluded && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Scaffolding Cost (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="scaffoldingCost"
                    value={formData.scaffoldingCost}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 500"
                  />
                </div>
              )}
            </div>
            
            {/* Bird Protection */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  name="birdProtectionIncluded"
                  checked={formData.birdProtectionIncluded}
                  onChange={handleChange}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-sm font-semibold text-gray-700">Bird protection included</span>
              </label>
              
              {formData.birdProtectionIncluded && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bird Protection Cost (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="birdProtectionCost"
                    value={formData.birdProtectionCost}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 150"
                  />
                </div>
              )}
            </div>
            
            {/* Roof Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Roof Type
                </label>
                <select
                  name="roofType"
                  value={formData.roofType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select type...</option>
                  <option value="pitched">Pitched</option>
                  <option value="flat">Flat</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Roof Material
                </label>
                <select
                  name="roofMaterial"
                  value={formData.roofMaterial}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select material...</option>
                  <option value="tile">Tile</option>
                  <option value="slate">Slate</option>
                  <option value="metal">Metal</option>
                  <option value="felt">Felt</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Installer Information Section */}
        <section className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">🏢</span> Installer Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="installerCompany"
                value={formData.installerCompany}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.installerCompany ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., ABC Solar Ltd"
              />
              {errors.installerCompany && <p className="text-red-500 text-sm mt-1">{errors.installerCompany}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="installerLocation"
                value={formData.installerLocation}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.installerLocation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="e.g., Manchester"
              />
              {errors.installerLocation && <p className="text-red-500 text-sm mt-1">{errors.installerLocation}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                MCS Registration Number
              </label>
              <input
                type="text"
                name="installerMCS"
                value={formData.installerMCS}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., MCS12345"
              />
              <p className="text-xs text-gray-500 mt-1">
                <Info className="inline w-3 h-3" /> Required for SEG payments
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Years in Business
              </label>
              <input
                type="number"
                step="1"
                name="installerYearsInBusiness"
                value={formData.installerYearsInBusiness}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., 5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Warranty Period (years)
              </label>
              <input
                type="number"
                step="1"
                name="installerWarrantyYears"
                value={formData.installerWarrantyYears}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., 10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Installation Timeline
              </label>
              <input
                type="text"
                name="installationTimeline"
                value={formData.installationTimeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., 4-6 weeks"
              />
            </div>
          </div>
        </section>

        {/* Quote PDF Upload Section */}
        <section className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-teal-600">📄</span> Quote Document (Optional)
          </h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                Upload your quote PDF for additional verification and analysis. This helps us cross-check the information and identify any discrepancies.
              </p>
            </div>
          </div>
          
          {!formData.quotePDF ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <label className="cursor-pointer">
                <span className="text-teal-600 font-semibold hover:text-teal-700">
                  Click to upload
                </span>
                <span className="text-gray-600"> or drag and drop</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">PDF up to 10MB</p>
              {errors.quotePDF && <p className="text-red-500 text-sm mt-2">{errors.quotePDF}</p>}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-900">{formData.quotePDF.name}</p>
                  <p className="text-sm text-gray-500">
                    {(formData.quotePDF.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </section>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Analyzing...' : 'Analyze Quote'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PremiumAnalysisForm;
