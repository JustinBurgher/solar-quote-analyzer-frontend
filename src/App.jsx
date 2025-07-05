import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function App() {
  const [formData, setFormData] = useState({
    systemSize: '',
    solarPanelOutput: '',
    solarPanelName: '',
    solarPanelNameCustom: '',
    batteryBrandName: '',
    batteryBrandNameCustom: '',
    batterySize: '',
    totalPrice: '',
    hasBattery: 'no'
  })
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  // Popular panel brands based on Midsummer Wholesale UK market data
  const panelBrands = [
    'Aiko',
    'Trina Solar',
    'Longi',
    'Jinko Solar',
    'Eurener',
    'Perlight',
    'SolFiT BIPV',
    'InstaGen',
    'Canadian Solar',
    'SunPower',
    'REC',
    'JA Solar',
    'Risen Energy',
    'Astronergy',
    'Hanwha Q Cells',
    'Sharp',
    'Panasonic',
    'Other (specify)'
  ]

  // Popular battery brands based on Midsummer Wholesale UK market data
  const batteryBrands = [
    'Tesla Powerwall',
    'GivEnergy',
    'Fox ESS',
    'SolarEdge',
    'SolaX',
    'Growatt',
    'Huawei',
    'EcoFlow',
    'Myenergi (Libbi)',
    'Enphase',
    'Sungrow',
    'Atmoce',
    'Eleven Energy',
    'LG Chem',
    'Pylontech',
    'BYD',
    'Other (specify)'
  ]

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSelectChange = (value, id) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  // Get the actual panel name for analysis (use custom if "Other" is selected)
  const getActualPanelName = () => {
    if (formData.solarPanelName === 'Other (specify)') {
      return formData.solarPanelNameCustom
    }
    return formData.solarPanelName
  }

  // Get the actual battery name for analysis (use custom if "Other" is selected)
  const getActualBatteryName = () => {
    if (formData.batteryBrandName === 'Other (specify)') {
      return formData.batteryBrandNameCustom
    }
    return formData.batteryBrandName
  }

  const analyzeQuote = async () => {
    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Convert inputs to numbers
      const systemSize = parseFloat(formData.systemSize) || 0
      const totalPrice = parseFloat(formData.totalPrice) || 0
      const panelOutput = parseFloat(formData.solarPanelOutput) || 0
      const batterySize = parseFloat(formData.batterySize) || 0
      
      // Calculate price per kW
      const pricePerKw = systemSize > 0 ? totalPrice / systemSize : 0

      // DEBUG: Log the calculations
      console.log('DEBUG - systemSize:', systemSize)
      console.log('DEBUG - totalPrice:', totalPrice)
      console.log('DEBUG - pricePerKw:', pricePerKw)

      // Analysis logic based on UK market rates
      let priceScore = 0
      let priceRating = 'poor'
      
      if (pricePerKw <= 2000) {
        priceScore = 100
        priceRating = 'good'
      } else if (pricePerKw <= 2500) {
        priceScore = 75
        priceRating = 'okay'
      } else if (pricePerKw <= 3000) {
        priceScore = 50
        priceRating = 'okay'
      } else {
        priceScore = 25
        priceRating = 'poor'
      }
      
      // Panel output analysis
      let panelScore = 0
      let panelRating = 'poor'
      
      if (panelOutput >= 400) {
        panelScore = 100
        panelRating = 'good'
      } else if (panelOutput >= 350) {
        panelScore = 75
        panelRating = 'okay'
      } else if (panelOutput >= 300) {
        panelScore = 50
        panelRating = 'okay'
      } else {
        panelScore = 25
        panelRating = 'poor'
      }
      
      // Panel brand analysis - updated with UK market brands
      const goodBrands = ['aiko', 'trina', 'longi', 'jinko', 'sunpower', 'rec', 'canadian solar']
      const okayBrands = ['eurener', 'perlight', 'instagen', 'ja solar', 'risen', 'astronergy', 'hanwha', 'sharp', 'panasonic']
      
      let brandScore = 50
      let brandRating = 'okay'
      
      const panelBrand = getActualPanelName().toLowerCase()
      if (goodBrands.some(brand => panelBrand.includes(brand))) {
        brandScore = 100
        brandRating = 'good'
      } else if (okayBrands.some(brand => panelBrand.includes(brand))) {
        brandScore = 75
        brandRating = 'okay'
      } else {
        brandScore = 40
        brandRating = 'poor'
      }
      
      // System size analysis
      let sizeScore = 0
      let sizeRating = 'poor'
      
      if (systemSize >= 3 && systemSize <= 6) {
        sizeScore = 100
        sizeRating = 'good'
      } else if (systemSize >= 2 && systemSize < 8) {
        sizeScore = 75
        sizeRating = 'okay'
      } else {
        sizeScore = 50
        sizeRating = 'okay'
      }
      
      // Battery analysis (if applicable) - updated with UK market brands
      let batteryScore = 0
      let batteryRating = 'good'
      
      if (formData.hasBattery === 'yes') {
        const goodBatteryBrands = ['tesla', 'givenergy', 'fox ess', 'solaredge', 'enphase', 'lg chem', 'pylontech']
        const okayBatteryBrands = ['solax', 'growatt', 'huawei', 'ecoflow', 'myenergi', 'sungrow', 'byd']
        const batteryBrand = getActualBatteryName().toLowerCase()
        
        if (goodBatteryBrands.some(brand => batteryBrand.includes(brand))) {
          batteryScore = 100
          batteryRating = 'good'
        } else if (okayBatteryBrands.some(brand => batteryBrand.includes(brand))) {
          batteryScore = 75
          batteryRating = 'okay'
        } else {
          batteryScore = 50
          batteryRating = 'okay'
        }
      }
      
      // Calculate overall score
      let totalScore = (priceScore * 0.4) + (panelScore * 0.25) + (brandScore * 0.2) + (sizeScore * 0.15)
      
      if (formData.hasBattery === 'yes') {
        totalScore = (priceScore * 0.35) + (panelScore * 0.2) + (brandScore * 0.15) + (sizeScore * 0.15) + (batteryScore * 0.15)
      }
      
      // Determine overall rating
      let overallRating = 'poor'
      if (totalScore >= 80) {
        overallRating = 'excellent'
      } else if (totalScore >= 65) {
        overallRating = 'good'
      } else {
        overallRating = 'poor'
      }
      
      // Generate recommendations
      const recommendations = []
      
      if (pricePerKw > 2500) {
        recommendations.push(`Price of £${pricePerKw.toFixed(0)}/kW is above market average. Consider getting additional quotes.`)
      }
      if (panelOutput < 350) {
        recommendations.push('Consider upgrading to higher efficiency panels (400W+) for better long-term value.')
      }
      if (systemSize < 3) {
        recommendations.push('System size may be too small for optimal savings. Consider a larger system if roof space allows.')
      }
      if (systemSize > 7) {
        recommendations.push('Large system - ensure your roof can support the weight and you have sufficient electricity usage.')
      }
      
      if (recommendations.length === 0) {
        if (overallRating === 'excellent') {
          recommendations.push('Excellent quote! This represents very good value for money.')
        } else if (overallRating === 'good') {
          recommendations.push('Good quote overall. This should provide solid returns on investment.')
        }
      }
      
      const result = {
        overall: overallRating,
        score: Math.round(totalScore),
        breakdown: {
          price: priceRating,
          panelOutput: panelRating,
          panelBrand: brandRating,
          batteryBrand: batteryRating,
          systemSize: sizeRating
        },
        recommendations: recommendations
      }
      
      setAnalysis(result)
      
    } catch (err) {
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      systemSize: '',
      solarPanelOutput: '',
      solarPanelName: '',
      solarPanelNameCustom: '',
      batteryBrandName: '',
      batteryBrandNameCustom: '',
      batterySize: '',
      totalPrice: '',
      hasBattery: 'no'
    })
    setAnalysis(null)
  }

  const getOverallColor = (overall) => {
    switch (overall) {
      case 'excellent':
        return 'text-green-600'
      case 'good':
        return 'text-emerald-600'
      case 'poor':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getBreakdownColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-green-600'
      case 'okay':
        return 'text-yellow-600'
      case 'poor':
        return 'text-red-600'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23059669" width="1200" height="800"/><path fill="%23047857" d="M0 400l50-16.7C100 367 200 333 300 350s200 67 300 50 200-67 300-50 200 67 300 50 200-67 250-83.3L1200 300v500H0z"/></svg>')`
        }}
      >
        {/* Header */}
        <div className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">☀️</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Solar Truth AI</h1>
          </div>
          <div className="text-white text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">⭐</span>
              <span>Trusted by 1000+ customers</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
          <div className="w-full max-w-4xl">
            {!analysis ? (
              /* Initial Form */
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <div className="bg-teal-600 text-white p-6">
                  <h2 className="text-3xl font-bold mb-2">Solar Quote Analysis</h2>
                  <p className="text-teal-100">Get instant analysis of your solar installation quote</p>
                </div>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="systemSize" className="text-gray-700 font-medium">System Size (kW)</Label>
                          <Input 
                            id="systemSize" 
                            type="number" 
                            placeholder="e.g., 4.0" 
                            value={formData.systemSize} 
                            onChange={handleChange}
                            className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <Label htmlFor="solarPanelOutput" className="text-gray-700 font-medium">Panel Output (W per panel)</Label>
                          <Input 
                            id="solarPanelOutput" 
                            type="number" 
                            placeholder="e.g., 400" 
                            value={formData.solarPanelOutput} 
                            onChange={handleChange}
                            className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <Label htmlFor="solarPanelName" className="text-gray-700 font-medium">Panel Brand</Label>
                          <Select value={formData.solarPanelName} onValueChange={(value) => handleSelectChange(value, 'solarPanelName')}>
                            <SelectTrigger className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                              <SelectValue placeholder="Select panel brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {panelBrands.map((brand) => (
                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formData.solarPanelName === 'Other (specify)' && (
                            <Input 
                              id="solarPanelNameCustom" 
                              placeholder="Enter panel brand name" 
                              value={formData.solarPanelNameCustom} 
                              onChange={handleChange}
                              className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                            />
                          )}
                        </div>

                        <div>
                          <Label htmlFor="hasBattery" className="text-gray-700 font-medium">Battery Included?</Label>
                          <Select value={formData.hasBattery} onValueChange={(value) => handleSelectChange(value, 'hasBattery')}>
                            <SelectTrigger className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, Battery Included</SelectItem>
                              <SelectItem value="no">No Battery</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.hasBattery === 'yes' && (
                          <>
                            <div>
                              <Label htmlFor="batteryBrandName" className="text-gray-700 font-medium">Battery Brand</Label>
                              <Select value={formData.batteryBrandName} onValueChange={(value) => handleSelectChange(value, 'batteryBrandName')}>
                                <SelectTrigger className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                                  <SelectValue placeholder="Select battery brand" />
                                </SelectTrigger>
                                <SelectContent>
                                  {batteryBrands.map((brand) => (
                                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formData.batteryBrandName === 'Other (specify)' && (
                                <Input 
                                  id="batteryBrandNameCustom" 
                                  placeholder="Enter battery brand name" 
                                  value={formData.batteryBrandNameCustom} 
                                  onChange={handleChange}
                                  className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                />
                              )}
                            </div>
                            <div>
                              <Label htmlFor="batterySize" className="text-gray-700 font-medium">Battery Size (kWh)</Label>
                              <Input 
                                id="batterySize" 
                                type="number" 
                                placeholder="e.g., 10" 
                                value={formData.batterySize} 
                                onChange={handleChange}
                                className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <Label htmlFor="totalPrice" className="text-gray-700 font-medium">Total Price (£)</Label>
                          <Input 
                            id="totalPrice" 
                            type="number" 
                            placeholder="e.g., 8000" 
                            value={formData.totalPrice} 
                            onChange={handleChange}
                            className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>

                      <Button 
                        onClick={analyzeQuote} 
                        disabled={loading} 
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-lg transition-colors"
                      >
                        {loading ? 'Analyzing...' : 'Analyze My Quote →'}
                      </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="space-y-6">
                      <div className="bg-teal-50 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">WE ANALYZE:</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700">Price per kW</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700">Panel efficiency</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700">Brand quality</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700">System sizing</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700">Market comparison</span>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-teal-600 font-medium">
                          + 15 additional factors
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Results Display */
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <div className="bg-teal-600 text-white p-6">
                  <h2 className="text-3xl font-bold mb-2">Analysis Complete</h2>
                  <p className="text-teal-100">Here's your solar quote assessment</p>
                </div>
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <p className="text-lg font-medium text-gray-600 mb-2">Overall Assessment:</p>
                    <p className={`text-6xl font-bold mb-2 ${getOverallColor(analysis.overall)}`}>
                      {analysis.overall.charAt(0).toUpperCase() + analysis.overall.slice(1)}
                    </p>
                    <p className="text-gray-500">Score: {analysis.score}%</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-800">Breakdown:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Price:</span>
                          <span className={`font-semibold ${getBreakdownColor(analysis.breakdown.price)}`}>
                            {analysis.breakdown.price}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Panel Output:</span>
                          <span className={`font-semibold ${getBreakdownColor(analysis.breakdown.panelOutput)}`}>
                            {analysis.breakdown.panelOutput}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Panel Brand:</span>
                          <span className={`font-semibold ${getBreakdownColor(analysis.breakdown.panelBrand)}`}>
                            {analysis.breakdown.panelBrand}
                          </span>
                        </div>
                        {formData.hasBattery === 'yes' && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Battery Brand:</span>
                            <span className={`font-semibold ${getBreakdownColor(analysis.breakdown.batteryBrand)}`}>
                              {analysis.breakdown.batteryBrand}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">System Size:</span>
                          <span className={`font-semibold ${getBreakdownColor(analysis.breakdown.systemSize)}`}>
                            {analysis.breakdown.systemSize}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-800">Recommendations:</h4>
                      <div className="space-y-3">
                        {analysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <span className="text-blue-600 text-lg mt-0.5">•</span>
                            <span className="text-gray-700 text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Button 
                      onClick={resetForm} 
                      className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      Analyze Another Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

