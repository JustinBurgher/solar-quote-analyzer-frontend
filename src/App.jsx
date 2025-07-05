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
    batteryBrandName: '',
    batterySize: '',
    totalPrice: '',
    hasBattery: 'no' // Default to no battery
  })
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

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
      
      // Panel brand analysis
      const goodBrands = ['sunpower', 'longi', 'rec', 'jinko', 'canadian solar', 'trina', 'ja solar']
      const okayBrands = ['risen', 'astronergy', 'hanwha', 'sharp', 'panasonic']
      
      let brandScore = 50
      let brandRating = 'okay'
      
      const panelBrand = formData.solarPanelName.toLowerCase()
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
      
      // Battery analysis (if applicable)
      let batteryScore = 0
      let batteryRating = 'good'
      
      if (formData.hasBattery === 'yes') {
        const goodBatteryBrands = ['tesla', 'lg chem', 'givenergy', 'pylontech', 'byd']
        const batteryBrand = formData.batteryBrandName.toLowerCase()
        
        if (goodBatteryBrands.some(brand => batteryBrand.includes(brand))) {
          batteryScore = 100
          batteryRating = 'good'
        } else {
          batteryScore = 60
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
      batteryBrandName: '',
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
        return 'text-yellow-600'
      case 'poor':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getBreakdownColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-green-500'
      case 'okay':
        return 'text-yellow-500'
      case 'bad':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Solar Truth AI</CardTitle>
          <CardDescription className="text-center text-gray-600">Analyze your solar quote instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Solar Quote Details</h3>
              <p className="text-gray-500 text-sm">Enter your solar installation quote details to get an instant analysis</p>

              <div className="space-y-2">
                <Label htmlFor="systemSize">System Size (kW)</Label>
                <Input id="systemSize" type="number" placeholder="e.g., 4.0" value={formData.systemSize} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solarPanelOutput">Solar Panel Output (W per panel)</Label>
                <Input id="solarPanelOutput" type="number" placeholder="e.g., 400" value={formData.solarPanelOutput} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solarPanelName">Solar Panel Brand/Name</Label>
                <Input id="solarPanelName" placeholder="e.g., SunPower Maxeon 3" value={formData.solarPanelName} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hasBattery">Battery Included?</Label>
                <Select id="hasBattery" value={formData.hasBattery} onValueChange={(value) => handleSelectChange(value, 'hasBattery')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, Battery Included</SelectItem>
                    <SelectItem value="no">No Battery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.hasBattery === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="batteryBrandName">Battery Brand Name</Label>
                  <Input id="batteryBrandName" placeholder="e.g., Tesla Powerwall" value={formData.batteryBrandName} onChange={handleChange} />
                </div>
              )}

              {formData.hasBattery === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="batterySize">Battery Size (kWh)</Label>
                  <Input id="batterySize" type="number" placeholder="e.g., 10" value={formData.batterySize} onChange={handleChange} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="totalPrice">Total Price (£)</Label>
                <Input id="totalPrice" type="number" placeholder="e.g., 6000" value={formData.totalPrice} onChange={handleChange} />
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={analyzeQuote} disabled={loading} className="flex-1 py-3 text-lg">
                  {loading ? 'Analyzing...' : 'Analyze Quote'}
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1 py-3 text-lg">
                  Reset
                </Button>
              </div>
            </div>

            {analysis && (
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-gray-700">Analysis Results</h3>
                <div className="text-center">
                  <p className="text-lg font-medium">Overall Assessment:</p>
                  <p className={`text-5xl font-bold ${getOverallColor(analysis.overall)}`}>
                    {analysis.overall.charAt(0).toUpperCase() + analysis.overall.slice(1)}
                  </p>
                  <p className="text-sm text-gray-500">Score: {analysis.score}%</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-md font-semibold text-gray-700">Breakdown:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Price: <span className={getBreakdownColor(analysis.breakdown.price)}>{analysis.breakdown.price}</span></li>
                    <li>Panel Output: <span className={getBreakdownColor(analysis.breakdown.panelOutput)}>{analysis.breakdown.panelOutput}</span></li>
                    <li>Panel Brand: <span className={getBreakdownColor(analysis.breakdown.panelBrand)}>{analysis.breakdown.panelBrand}</span></li>
                    {formData.hasBattery === 'yes' && (
                      <li>Battery Brand: <span className={getBreakdownColor(analysis.breakdown.batteryBrand)}>{analysis.breakdown.batteryBrand}</span></li>
                    )}
                    <li>System Size: <span className={getBreakdownColor(analysis.breakdown.systemSize)}>{analysis.breakdown.systemSize}</span></li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-md font-semibold text-gray-700">Recommendations:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
