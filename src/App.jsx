import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/ui/Navigation';
import Home from './pages/home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Upgrade from './pages/Upgrade';
import Verify from './pages/Verify';
import PremiumSuccess from './pages/PremiumSuccess';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/premium-success" element={<PremiumSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
