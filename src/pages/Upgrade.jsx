import { useState } from "react";

export default function Upgrade() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleClick() {
    setBusy(true);
    setMsg("");
    try {
      alert("Secure checkout coming soon. Launch price £24.99.");
    } catch (e) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Unlock Premium</h1>
      <p className="opacity-80 mb-6">
        Get the full Buyer’s Protection Guide: component brands, red flags, ROI chart,
        and a downloadable PDF.
      </p>
      {msg && <p className="text-red-600 mb-4">{msg}</p>}
      <button
        onClick={handleClick}
        disabled={busy}
        className="px-5 py-3 rounded-xl bg-teal-600 text-white disabled:opacity-60"
      >
        {busy ? "Preparing…" : "Upgrade (Launch price £24.99)"}
      </button>
      <p className="text-sm opacity-70 mt-4">One‑off payment. Instant unlock after checkout.</p>
    </section>
  );
}
