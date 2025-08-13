import { Lock, TrendingUp, AlertTriangle, Calculator, Target, Crown, ArrowRight } from 'lucide-react';

const EnhancedResults = ({ result, onUpgrade }) => {
  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'text-green-600 bg-green-50',
      'A': 'text-green-600 bg-green-50',
      'B': 'text-blue-600 bg-blue-50',
      'C': 'text-yellow-600 bg-yellow-50',
      'D': 'text-orange-600 bg-orange-50',
      'F': 'text-red-600 bg-red-50'
    };
    return colors[grade] || 'text-gray-600 bg-gray-50';
  };

  // Calculate premium insights (these would come from backend in real implementation)
  const pricePerKw = result.price_per_kw;
  const fairPricePerKw = 1200; // Market average
  const overpricePercentage = Math.round(((pricePerKw - fairPricePerKw) / fairPricePerKw) * 100);
  const potentialSavings = Math.round((pricePerKw - fairPricePerKw) * result.system_details.size);
  const fairTotalPrice = Math.round(fairPricePerKw * result.system_details.size);

  const PremiumSection = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`relative bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-gray-100/90 backdrop-blur-sm rounded-lg"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon className="w-5 h-5 text-gray-400 mr-2" />
            <h4 className="font-semibold text-gray-500">{title}</h4>
          </div>
          <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
            <Crown className="w-4 h-4 text-amber-600 mr-1" />
            <span className="text-xs font-medium text-amber-700">Premium</span>
          </div>
        </div>
        <div className="filter blur-sm select-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center"
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock Full Analysis
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8 space-y-6">
      {/* Main Grade Display */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold ${getGradeColor(result.grade)}`}>
          {result.grade}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
          Your Solar Quote Grade
        </h3>
        <p className="text-lg text-gray-700">{result.verdict}</p>
      </div>

      {/* Basic Analysis (Free) */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">FREE</span>
          Basic Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">System Size:</span>
            <span className="font-medium ml-2">{result.system_details.size} kW</span>
          </div>
          <div>
            <span className="text-gray-600">Total Price:</span>
            <span className="font-medium ml-2">£{result.system_details.total_price.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-600">Price per kW:</span>
            <span className="font-medium ml-2">£{result.price_per_kw.toLocaleString()}</span>
          </div>
          {result.battery_details && (
            <div>
              <span className="text-gray-600">Battery:</span>
              <span className="font-medium ml-2">
                {result.battery_details.quantity}× {result.battery_details.brand} 
                ({result.battery_details.total_capacity} kWh)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Premium Sections */}
      <div className="space-y-6">
        {/* Detailed Price Breakdown */}
        <PremiumSection title="Detailed Price Breakdown" icon={Calculator}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Solar Panels (4kW):</span>
              <span className="font-medium">£4,800</span>
            </div>
            <div className="flex justify-between">
              <span>Battery System:</span>
              <span className="font-medium">£8,500</span>
            </div>
            <div className="flex justify-between">
              <span>Inverter & Equipment:</span>
              <span className="font-medium">£1,200</span>
            </div>
            <div className="flex justify-between">
              <span>Installation & Labor:</span>
              <span className="font-medium">£2,500</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Fair Market Price:</span>
              <span className="text-green-600">£{fairTotalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600 font-semibold">
              <span>Your Quote Overprice:</span>
              <span>£{potentialSavings.toLocaleString()} ({overpricePercentage}%)</span>
            </div>
          </div>
        </PremiumSection>

        {/* Red Flags & Warnings */}
        <PremiumSection title="Red Flags & Warning Signs" icon={AlertTriangle} className="border-red-300">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-red-700">Extreme Overpricing Detected</p>
                <p className="text-sm text-gray-600">Quote is {overpricePercentage}% above market rate - indicates aggressive sales tactics</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-red-700">Battery Price Inflation</p>
                <p className="text-sm text-gray-600">Battery costs £850/kWh vs market rate £500/kWh</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-amber-700">High-Pressure Sales Indicator</p>
                <p className="text-sm text-gray-600">Pricing suggests limited-time offer or door-to-door sales</p>
              </div>
            </div>
          </div>
        </PremiumSection>

        {/* ROI & Financial Analysis */}
        <PremiumSection title="ROI & Financial Analysis" icon={TrendingUp}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-2">Your Quote</h5>
              <div className="space-y-1 text-sm">
                <div>Payback Period: <span className="font-medium text-red-600">18.2 years</span></div>
                <div>20-Year Savings: <span className="font-medium">£8,400</span></div>
                <div>Monthly Payment: <span className="font-medium">£185</span></div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2">Fair Market Price</h5>
              <div className="space-y-1 text-sm">
                <div>Payback Period: <span className="font-medium text-green-600">8.5 years</span></div>
                <div>20-Year Savings: <span className="font-medium">£18,900</span></div>
                <div>Monthly Payment: <span className="font-medium">£95</span></div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Potential Lifetime Savings:</strong> £{(potentialSavings + 10500).toLocaleString()} by getting fair market pricing
            </p>
          </div>
        </PremiumSection>

        {/* Actionable Recommendations */}
        <PremiumSection title="Actionable Recommendations" icon={Target}>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Immediate Actions</h5>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Get 3 additional quotes from MCS-certified installers</li>
                <li>• Use this analysis to negotiate 30-40% discount</li>
                <li>• Avoid signing today - legitimate installers allow time to decide</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-900 mb-2">Recommended Installers</h5>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Solar Solutions UK (4.8★) - £1,100/kW average</li>
                <li>• Green Energy Systems (4.9★) - £1,150/kW average</li>
                <li>• EcoSolar Pro (4.7★) - £1,200/kW average</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h5 className="font-medium text-amber-900 mb-2">Negotiation Script</h5>
              <p className="text-sm text-amber-800">
                "I've had this quote analyzed and it's {overpricePercentage}% above market rate. 
                Can you match the fair market price of £{fairTotalPrice.toLocaleString()}?"
              </p>
            </div>
          </div>
        </PremiumSection>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 text-center">
        <Crown className="w-12 h-12 text-amber-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Unlock Your Complete Solar Analysis
        </h3>
        <p className="text-gray-600 mb-4">
          Get the full breakdown, red flag warnings, ROI analysis, and actionable recommendations 
          to save thousands on your solar installation.
        </p>
        <div className="flex items-center justify-center space-x-6 mb-6 text-sm">
          <div className="flex items-center text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Save up to £{potentialSavings.toLocaleString()}
          </div>
          <div className="flex items-center text-blue-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Avoid costly mistakes
          </div>
          <div className="flex items-center text-purple-600">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Expert recommendations
          </div>
        </div>
        <button
          onClick={onUpgrade}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg flex items-center mx-auto"
        >
          Unlock Full Analysis - £24.99
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <p className="text-xs text-gray-500 mt-3">
          One-time payment • Instant access • 30-day money-back guarantee
        </p>
      </div>

      {/* Basic CTA */}
      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Analyze Another Quote
        </button>
      </div>
    </div>
  );
};

export default EnhancedResults;

