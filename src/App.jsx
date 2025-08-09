<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar Verify - Don't Get Ripped Off on Solar</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .hero-gradient {
            background: linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%);
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .tab-button.active { background-color: #14b8a6; color: white; }
        .tab-button { background-color: #f8fafc; color: #475569; }
        .size-button { 
            transition: all 0.2s; 
            border: 2px solid #e2e8f0;
            background-color: #ffffff;
        }
        .size-button:hover { 
            border-color: #14b8a6; 
            background-color: #eff6ff;
        }
        .size-button.selected { 
            background-color: #14b8a6; 
            color: white; 
            border-color: #14b8a6;
        }
        .custom-input { display: none; }
        .custom-input.active { display: block; }
        .battery-models { display: none; }
        .battery-models.active { display: block; }
        .consultation-step { display: none; }
        .consultation-step.active { display: block; }
        .progress-bar {
            transition: width 0.3s ease;
        }
        .consultation-option {
            transition: all 0.2s;
            cursor: pointer;
        }
        .consultation-option:hover {
            border-color: #14b8a6 !important;
            background-color: #eff6ff !important;
        }
        .consultation-option.selected {
            border-color: #14b8a6 !important;
            background-color: #eff6ff !important;
        }
        .recommendation-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        .insight-card {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #0ea5e9;
        }
        .tips-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #22c55e;
        }
        .steps-card {
            background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
            border: 1px solid #eab308;
        }
        .system-icon {
            width: 3rem;
            height: 3rem;
            background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        .confidence-badge {
            display: inline-block;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.875rem;
        }
        .premium-teaser {
            position: relative;
            overflow: hidden;
        }
        .premium-teaser::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #14b8a6, #3b82f6, #8b5cf6, #ec4899);
            background-size: 200% 100%;
            animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .mobile-py-12 {
            padding-top: 3rem;
            padding-bottom: 3rem;
        }
        @media (max-width: 768px) {
            .mobile-py-12 {
                padding-top: 2rem;
                padding-bottom: 2rem;
            }
            .mobile-card {
                margin: 0 1rem;
                padding: 1.5rem;
            }
            .mobile-grid {
                grid-template-columns: 1fr;
            }
            .mobile-text-sm {
                font-size: 0.875rem;
            }
            .mobile-text-lg {
                font-size: 1rem;
            }
            .mobile-button {
                padding: 0.625rem 1.25rem;
                font-size: 0.875rem;
            }
        }
        
        /* Email gate styles */
        .email-gate {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        /* Results styles */
        .results-section {
            margin-top: 2rem;
            padding: 1.5rem;
            background-color: #f9fafb;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
        }
        
        .grade-badge {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 700;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .grade-a { background-color: #10b981; color: white; }
        .grade-b { background-color: #f59e0b; color: white; }
        .grade-c { background-color: #ef4444; color: white; }
        .grade-d { background-color: #dc2626; color: white; }
        .grade-f { background-color: #7f1d1d; color: white; }
        
        .upgrade-prompt {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-top: 1rem;
            text-align: center;
        }
        
        /* Pricing section styles */
        .pricing-dark {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        
        .pricing-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 2rem;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .pricing-card:hover {
            transform: translateY(-4px);
            border-color: #14b8a6;
        }
        
        .pricing-card.popular {
            border: 2px solid #14b8a6;
            transform: scale(1.05);
        }
        
        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #14b8a6;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
        }
        
        .pricing-icon {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.5rem;
        }
        
        .icon-basic { background: #14b8a6; }
        .icon-pro { background: #ef4444; }
        .icon-complete { background: #f59e0b; }
        
        .feature-list {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
        }
        
        .feature-list li {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
            color: #cbd5e1;
        }
        
        .feature-list li.premium {
            color: #fbbf24;
        }
        
        .feature-icon {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.75rem;
            flex-shrink: 0;
        }
        
        .hidden { display: none; }
        
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #14b8a6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Logo styles */
        .logo-icon {
            width: 2rem;
            height: 2rem;
            background: #14b8a6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.75rem;
        }
        
        .logo-text {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
        }
        
        .logo-verify {
            color: #10b981;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="logo-icon">
                            <span class="text-white text-sm">🏠</span>
                        </div>
                        <span class="logo-text">solar<span class="logo-verify">✓</span>erify</span>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#home" class="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                        <a href="#about" class="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                        <a href="#analyzer" class="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Quote Analyzer</a>
                        <a href="#pricing" class="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
                        <a href="#contact" class="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-gradient">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mobile-py-12">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Don't Get <span class="text-yellow-300">Ripped Off</span><br>
                    By Solar Companies
                </h1>
                <p class="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
                    Get instant professional analysis of your solar quotes. Spot overpriced systems, low-quality components, and misleading claims before you sign.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#analyzer" class="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 mobile-button">
                        Analyze My Quote Free
                    </a>
                    <a href="#pricing" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition duration-300 mobile-button">
                        View Pricing
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 mobile-py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Solar Verify?</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    The solar industry is full of overpriced quotes and misleading claims. We help you identify fair pricing, quality components, and trustworthy installers.
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Instant Analysis</h3>
                    <p class="text-gray-600">Upload your quote and get immediate feedback on pricing, components, and overall value within seconds.</p>
                </div>
                
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Fair Pricing</h3>
                    <p class="text-gray-600">Compare your quote against current market rates and identify if you're being overcharged for your solar system.</p>
                </div>
                
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Quality Check</h3>
                    <p class="text-gray-600">Verify component quality, warranty terms, and installer credentials to ensure you're getting a reliable system.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quote Analyzer Section -->
    <section id="analyzer" class="py-16 mobile-py-12 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h3 class="text-3xl section-heading font-bold mb-4">Free Quote Analyzer</h3>
                <p class="text-xl mobile-text-lg text-gray-600">Upload your solar quotes and get instant analysis of pricing, quality, and value</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-8 mobile-card">
                <!-- Email Gate (hidden initially) -->
                <div id="email-gate" class="email-gate hidden">
                    <h4 class="text-xl font-bold text-blue-800 mb-3">🔓 Unlock 2 More Free Checks</h4>
                    <p class="text-blue-700 mb-4">Enter your email to get 2 additional free quote checks plus solar tips and guides.</p>
                    <form id="email-form" class="flex flex-col sm:flex-row gap-3">
                        <input type="email" id="email-input" placeholder="Enter your email address" class="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                        <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Get Free Checks
                        </button>
                    </form>
                </div>

                <!-- Tab Navigation -->
                <div class="flex flex-wrap mb-6 border-b">
                    <button class="tab-button active px-6 py-3 mobile-button font-semibold rounded-t-lg" onclick="switchTab('manual')">
                        Manual Entry
                    </button>
                    <button class="tab-button px-6 py-3 mobile-button font-semibold rounded-t-lg" onclick="switchTab('upload')">
                        Upload PDF
                    </button>
                </div>
                
                <!-- Manual Entry Tab -->
                <div id="manual-tab" class="tab-content active">
                    <form id="quote-form" class="space-y-6">
                        <div class="grid md:grid-cols-2 mobile-grid gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">System Size</label>
                                <div class="flex">
                                    <input type="number" id="system-size" step="0.1" placeholder="6.5" class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
                                    <span class="bg-gray-100 px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">kW</span>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Battery Size (Optional)</label>
                                <div class="flex">
                                    <input type="number" id="battery-size" step="0.1" placeholder="13.5" class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <span class="bg-gray-100 px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">kWh</span>
                                </div>
                                <small class="text-gray-500 text-sm">Leave blank if no battery</small>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Total Quote Price</label>
                            <div class="flex">
                                <span class="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">£</span>
                                <input type="number" id="total-price" placeholder="15000" class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" required>
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
                            <span id="analyze-text">Check My Quote</span>
                            <span id="analyze-loading" class="hidden">
                                <span class="loading"></span> Analyzing...
                            </span>
                        </button>
                    </form>
                </div>
                
                <!-- Upload PDF Tab -->
                <div id="upload-tab" class="tab-content">
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Upload your solar quote</h3>
                        <p class="text-gray-500 mb-4">Get detailed analysis with component quality, red flag detection, and professional PDF report</p>
                        <a href="#pricing" class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300 inline-block">
                            Choose Analysis Level
                        </a>
                        <p class="text-sm text-gray-400 mt-2">Starting from £14.99 - includes detailed component analysis and downloadable report</p>
                    </div>
                </div>
                
                <!-- Results Section -->
                <div id="results" class="results-section hidden">
                    <div class="text-center mb-6">
                        <div id="grade-badge" class="grade-badge"></div>
                        <div id="price-per-kw" class="text-2xl font-bold text-gray-800 mb-2"></div>
                        <div id="verdict" class="text-lg text-gray-600"></div>
                    </div>
                    
                    <!-- Additional Results - Only show what we actually know -->
                    <div id="detailed-results" class="grid md:grid-cols-3 gap-4 mb-6 hidden">
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div id="pricing-analysis" class="text-lg font-semibold text-teal-600 mb-1">-</div>
                            <div class="text-sm text-gray-600">Pricing Analysis</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div id="market-comparison" class="text-lg font-semibold text-teal-600 mb-1">-</div>
                            <div class="text-sm text-gray-600">Market Comparison</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div id="value-assessment" class="text-lg font-semibold text-teal-600 mb-1">-</div>
                            <div class="text-sm text-gray-600">Value Assessment</div>
                        </div>
                    </div>
                    
                    <!-- Upgrade Prompt - Updated messaging -->
                    <div class="upgrade-prompt">
                        <h4 class="text-xl font-bold text-amber-800 mb-3">🚨 Want Full Rip-Off Protection?</h4>
                        <p class="text-amber-700 mb-4">Upload your actual quote PDF for comprehensive rip-off detection including:</p>
                        <ul class="text-left text-amber-700 mb-4 space-y-1">
                            <li>• Component quality red flags (cheap panels, poor inverters)</li>
                            <li>• Installer reputation & credential check</li>
                            <li>• Contract terms analysis & hidden fees detection</li>
                            <li>• Price negotiation strategies & talking points</li>
                            <li>• Professional PDF report with evidence</li>
                        </ul>
                        <a href="#pricing" class="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 inline-block">
                            Get Full Protection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16 mobile-py-12 pricing-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Protection Level</h2>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    From basic rip-off detection to complete contract protection
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Basic Analysis -->
                <div class="pricing-card">
                    <div class="pricing-icon icon-basic">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white text-center mb-2">Basic Protection</h3>
                    <div class="text-center mb-6">
                        <div class="text-4xl font-bold text-teal-400 mb-1">£14.99</div>
                        <div class="text-gray-400">One-time payment</div>
                    </div>
                    <ul class="feature-list">
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Pricing rip-off detection
                        </li>
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Market comparison analysis
                        </li>
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Basic component quality check
                        </li>
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Simple PDF report
                        </li>
                    </ul>
                    <button class="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
                        Get Basic Protection
                    </button>
                </div>

                <!-- Pro Analysis -->
                <div class="pricing-card popular">
                    <div class="popular-badge">POPULAR</div>
                    <div class="pricing-icon icon-pro">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white text-center mb-2">Pro Protection</h3>
                    <div class="text-center mb-6">
                        <div class="text-4xl font-bold text-teal-400 mb-1">£29.99</div>
                        <div class="text-gray-400">One-time payment</div>
                    </div>
                    <ul class="feature-list">
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Everything in Basic
                        </li>
                        <li class="premium">
                            <svg class="feature-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Contract red flag analysis
                        </li>
                        <li class="premium">
                            <svg class="feature-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Expert consultation call
                        </li>
                        <li class="premium">
                            <svg class="feature-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Negotiation strategies
                        </li>
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Detailed protection report
                        </li>
                    </ul>
                    <button class="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
                        Get Pro Protection
                    </button>
                </div>

                <!-- Complete Package -->
                <div class="pricing-card">
                    <div class="pricing-icon icon-complete">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white text-center mb-2">Complete Protection</h3>
                    <div class="text-center mb-6">
                        <div class="text-4xl font-bold text-teal-400 mb-1">£49.99</div>
                        <div class="text-gray-400">One-time payment</div>
                    </div>
                    <ul class="feature-list">
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Everything in Pro
                        </li>
                        <li class="premium">
                            <svg class="feature-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Multiple quote comparison
                        </li>
                        <li class="premium">
                            <svg class="feature-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Priority expert support
                        </li>
                        <li class="premium">
                            <svg class="feature-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            6-month follow-up support
                        </li>
                        <li>
                            <svg class="feature-icon text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            Complete rip-off protection
                        </li>
                    </ul>
                    <button class="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
                        Get Complete Protection
                    </button>
                </div>
            </div>
            
            <div class="text-center mt-8">
                <a href="#" class="text-teal-400 hover:text-teal-300 font-medium">
                    View detailed pricing comparison →
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 mobile-py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Have questions about your solar quote? Need help understanding the analysis? We're here to help.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@solarverify.co.uk" class="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition duration-300 mobile-button">
                    Email Us
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center mb-4">
                        <div class="logo-icon">
                            <span class="text-white text-sm">🏠</span>
                        </div>
                        <span class="logo-text text-white">solar<span class="logo-verify">✓</span>erify</span>
                    </div>
                    <p class="text-gray-400">
                        Professional solar quote analysis to help you make informed decisions and avoid overpriced systems.
                    </p>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#analyzer" class="hover:text-white transition duration-300">Quote Analysis</a></li>
                        <li><a href="#pricing" class="hover:text-white transition duration-300">Pricing Plans</a></li>
                        <li><a href="#" class="hover:text-white transition duration-300">Component Review</a></li>
                        <li><a href="#" class="hover:text-white transition duration-300">ROI Calculator</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Resources</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition duration-300">Solar Guide</a></li>
                        <li><a href="#" class="hover:text-white transition duration-300">Common Scams</a></li>
                        <li><a href="#" class="hover:text-white transition duration-300">FAQ</a></li>
                        <li><a href="#" class="hover:text-white transition duration-300">Blog</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li>hello@solarverify.co.uk</li>
                        <li>Monday - Friday: 9AM - 6PM</li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Solar Verify. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </div>
    </footer>

    <script>
        // Check count and email tracking - FIXED LOGIC
        let checkCount = parseInt(localStorage.getItem('solarVerifyChecks') || '0');
        let hasEmail = localStorage.getItem('solarVerifyEmail') !== null;

        // API Configuration
        const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app';

        // Tab switching functionality
        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
        }

        // Form submission - FIXED EMAIL GATE LOGIC
        document.getElementById('quote-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // FIXED: Check if user needs to provide email AFTER first quote
            if (checkCount >= 1 && !hasEmail) {
                showEmailGate();
                return;
            }
            
            // Check if user has exceeded free limit (after email provided)
            if (checkCount >= 3) {
                showUpgradePrompt();
                return;
            }
            
            analyzeQuote();
        });

        // Email form submission
        document.getElementById('email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email-input').value;
            
            // Register email with backend
            registerEmail(email).then(() => {
                // Store email and hide gate
                localStorage.setItem('solarVerifyEmail', email);
                hasEmail = true;
                hideEmailGate();
                
                // Reset check count to give them more free checks
                checkCount = 0;
                localStorage.setItem('solarVerifyChecks', '0');
                
                // Proceed with analysis
                analyzeQuote();
            }).catch(error => {
                console.error('Email registration failed:', error);
                // Still proceed with analysis
                localStorage.setItem('solarVerifyEmail', email);
                hasEmail = true;
                hideEmailGate();
                analyzeQuote();
            });
        });

        // Register email with backend
        async function registerEmail(email) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/register-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                });
                
                if (!response.ok) {
                    throw new Error('Email registration failed');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Email registration error:', error);
                throw error;
            }
        }

        function showEmailGate() {
            document.getElementById('email-gate').classList.remove('hidden');
            document.getElementById('quote-form').style.opacity = '0.5';
            document.getElementById('quote-form').style.pointerEvents = 'none';
        }

        function hideEmailGate() {
            document.getElementById('email-gate').classList.add('hidden');
            document.getElementById('quote-form').style.opacity = '1';
            document.getElementById('quote-form').style.pointerEvents = 'auto';
        }

        function showUpgradePrompt() {
            alert('You\'ve used all your free checks! Choose a protection level to get unlimited checks plus detailed analysis.');
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        }

        // Main quote analysis function - uses live API
        async function analyzeQuote() {
            // Show loading state
            document.getElementById('analyze-text').classList.add('hidden');
            document.getElementById('analyze-loading').classList.remove('hidden');
            
            // Get form values
            const systemSize = parseFloat(document.getElementById('system-size').value);
            const batterySize = parseFloat(document.getElementById('battery-size').value) || 0;
            const totalPrice = parseFloat(document.getElementById('total-price').value);
            
            // Validate inputs
            if (!systemSize || !totalPrice) {
                alert('Please fill in System Size and Total Price');
                resetAnalyzeButton();
                return;
            }
            
            try {
                // Call live API
                const response = await fetch(`${API_BASE_URL}/api/analyze-quote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        system_size: systemSize,
                        battery_size: batterySize,
                        total_price: totalPrice,
                        installer_type: 'national'
                    })
                });
                
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                
                const result = await response.json();
                
                // Display results from API
                displayResults(result, systemSize, batterySize, totalPrice);
                
                // Track usage
                trackUsage();
                
            } catch (error) {
                console.error('API Error:', error);
                
                // Fallback to local analysis if API fails
                const pricePerKw = totalPrice / systemSize;
                const fallbackResult = calculateFallbackAnalysis(pricePerKw, systemSize, batterySize);
                displayResults(fallbackResult, systemSize, batterySize, totalPrice);
                trackUsage();
            } finally {
                resetAnalyzeButton();
            }
        }

        function resetAnalyzeButton() {
            document.getElementById('analyze-text').classList.remove('hidden');
            document.getElementById('analyze-loading').classList.add('hidden');
        }

        // Fallback analysis for when API is unavailable
        function calculateFallbackAnalysis(pricePerKw, systemSize, batterySize) {
            let grade, verdict;
            
            // Basic pricing analysis
            if (pricePerKw <= 1500) {
                grade = 'A';
                verdict = 'Excellent value - this is a competitive quote';
            } else if (pricePerKw <= 2000) {
                grade = 'B';
                verdict = 'Fair pricing - within acceptable market range';
            } else if (pricePerKw <= 2500) {
                grade = 'C';
                verdict = 'Above average pricing - consider getting more quotes';
            } else if (pricePerKw <= 3000) {
                grade = 'D';
                verdict = 'Overpriced - definitely get alternative quotes';
            } else {
                grade = 'F';
                verdict = 'Very overpriced - avoid this installer';
            }
            
            // Adjust for battery (batteries add value)
            if (batterySize > 0 && grade === 'B') {
                grade = 'A';
                verdict = 'Good value with battery storage included';
            }
            
            return {
                grade: grade,
                verdict: verdict,
                price_per_kw: Math.round(pricePerKw),
                score: grade === 'A' ? 90 : grade === 'B' ? 75 : grade === 'C' ? 60 : grade === 'D' ? 45 : 30
            };
        }

        function displayResults(data, systemSize, batterySize, totalPrice) {
            // Calculate price per kW
            const pricePerKw = data.price_per_kw || Math.round(totalPrice / systemSize);
            
            // Show results section
            document.getElementById('results').classList.remove('hidden');
            
            // Display grade badge
            const gradeBadge = document.getElementById('grade-badge');
            gradeBadge.textContent = `Grade ${data.grade}`;
            gradeBadge.className = `grade-badge grade-${data.grade.toLowerCase()}`;
            
            // Display price per kW
            document.getElementById('price-per-kw').textContent = `£${pricePerKw} per kW`;
            
            // Display verdict
            document.getElementById('verdict').textContent = data.verdict;
            
            // Show simplified analysis - only what we actually know
            document.getElementById('detailed-results').classList.remove('hidden');
            
            // Only show pricing analysis (what we actually calculated)
            document.getElementById('pricing-analysis').textContent = pricePerKw <= 1500 ? 'Competitive' : pricePerKw <= 2000 ? 'Fair' : pricePerKw <= 2500 ? 'High' : 'Overpriced';
            document.getElementById('market-comparison').textContent = pricePerKw <= 1600 ? 'Below Average' : pricePerKw <= 2200 ? 'Market Rate' : 'Above Market';
            document.getElementById('value-assessment').textContent = data.grade === 'A' || data.grade === 'B' ? 'Good Deal' : data.grade === 'C' ? 'Questionable' : 'Poor Value';
            
            // Scroll to results
            document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        }

        function trackUsage() {
            // Increment check count
            checkCount++;
            localStorage.setItem('solarVerifyChecks', checkCount.toString());
            
            // Track usage with backend if possible
            if (hasEmail) {
                trackUsageWithBackend();
            }
        }

        async function trackUsageWithBackend() {
            try {
                const email = localStorage.getItem('solarVerifyEmail');
                if (!email) return;
                
                await fetch(`${API_BASE_URL}/api/track-usage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                });
            } catch (error) {
                console.error('Usage tracking error:', error);
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>
