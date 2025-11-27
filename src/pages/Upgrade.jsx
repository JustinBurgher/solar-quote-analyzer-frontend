import { useState } from "react";

const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

export default function Upgrade() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");

  async function handleClick() {
    setBusy(true);
    setMsg("");
    
    // Validate email
    if (!email || !email.includes('@')) {
      setMsg("Please enter a valid email address");
      setBusy(false);
      return;
    }
    
    try {
      // Call backend to create Stripe checkout session
      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (e) {
      setMsg("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Unlock Premium</h1>
      <p className="opacity-80 mb-6">
        Get the full Buyer's Protection Guide: component brands, red flags, ROI chart,
        and a downloadable PDF.
      </p>
      
      {msg && <p className="text-red-600 mb-4">{msg}</p>}
      
      {/* Email input field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          disabled={busy}
        />
      </div>
      
      <button
        onClick={handleClick}
        disabled={busy}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {busy ? 'Loading...' : 'Upgrade Now - £44.99'}
      </button>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>✓ Secure Payment</p>
        <p>✓ Instant Access</p>
        <p>✓ Money-Back Guarantee</p>
      </div>
    </section>
  );
}
