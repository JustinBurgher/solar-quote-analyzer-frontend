import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Navigation from './components/ui/Navigation';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';

// Your existing Home component (quote analyzer)
function Home() {
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

  // Enhanced UK market panel brands
  const panelBrands = [
    'Aiko', 'Trina Solar', 'Longi', 'Jinko Solar', 'Eurener', 'Perlight',
    'SolFiT BIPV', 'InstaGen', 'Canadian Solar', 'SunPower', 'REC',
    'JA Solar', 'Risen Energy', 'Astronergy', 'Hanwha Q Cells',
    'Sharp', 'Panasonic', 'Other (specify)'
  ]

  // Enhanced UK market battery brands
  const batteryBrands = [
    'Tesla Powerwall', 'GivEnergy', 'Fox ESS', 'SolarEdge', 'SolaX',
    'Growatt', 'Huawei', 'EcoFlow', 'Myenergi (Libbi)', 'Enphase',
    'Sungrow', 'Atmoce', 'Eleven Energy', 'LG Chem', 'Pylontech',
    'BYD', 'Other (specify)'
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

  const getActualPanelName = () => {
    if (formData.solarPanelName === 'Other (specify)') {
      return formData.solarPanelNameCustom
    }
    return formData.solarPanelName
  }

  const getActualBatteryName = () => {
    if (formData.batteryBrandName === 'Other (specify)') {
      return formData.batteryBrandNameCustom
    }
    return formData.batteryBrandName
  }

  const analyzeQuote = async () => {
    setLoading(true)
    
    try {
      const response = await fetch("/api/analyze/quote", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          solarPanelName: getActualPanelName(),
          batteryBrandName: getActualBatteryName()
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setAnalysis(result)
      } else {
        console.error('Analysis failed:', result.error)
        // Fallback to mock data if API fails
        const mockResult = {
          overall: 'good',
          score: 75,
          breakdown: {
            price: 'good',
            panelOutput: 'good',
            panelBrand: 'okay',
            batteryBrand: 'good',
            systemSize: 'good'
          },
          recommendations: [
            'Analysis completed with mock data',
            'Please check API connection for live analysis'
          ]
        }
        setAnalysis(mockResult)
      }
    } catch (err) {
      console.error('Network error:', err)
      // Fallback to mock data if network fails
      const mockResult = {
        overall: 'good',
        score: 75,
        breakdown: {
          price: 'good',
          panelOutput: 'good',
          panelBrand: 'okay',
          batteryBrand: 'good',
          systemSize: 'good'
        },
        recommendations: [
          'Analysis completed with mock data',
          'Please check network connection for live analysis'
        ]
      }
      setAnalysis(mockResult)
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
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23059669" width="1200" height="800"/><path fill="%23047857" d="M0 400l50-16.7C100 367 200 333 300 350s200 67 300 50 200-67 300-50 200 67 300 50 200-67 250-83.3L1200 300v500H0z"/></svg>' )`
           }}>
        
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
              <span>Enhanced with AI Analysis</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
          <div className="w-full max-w-6xl">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-teal-600 text-white">
                <CardTitle className="text-3xl font-bold">Enhanced Solar Quote Analysis</CardTitle>
                <CardDescription className="text-teal-100">Get detailed analysis with real panel specifications</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
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
                        <Select value={formData.solarPanelName} onValueChange={(value) => handleSelectChange(value, 'solarPanelName')}>
                          <SelectTrigger>
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
                            className="mt-2"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasBattery">Battery Included?</Label>
                        <Select value={formData.hasBattery} onValueChange={(value) => handleSelectChange(value, 'hasBattery')}>
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
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="batteryBrandName">Battery Brand Name</Label>
                            <Select value={formData.batteryBrandName} onValueChange={(value) => handleSelectChange(value, 'batteryBrandName')}>
                              <SelectTrigger>
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
                                className="mt-2"
                              />
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="batterySize">Battery Size (kWh)</Label>
                            <Input id="batterySize" type="number" placeholder="e.g., 10" value={formData.batterySize} onChange={handleChange} />
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="totalPrice">Total Price (£)</Label>
                        <Input id="totalPrice" type="number" placeholder="e.g., 6000" value={formData.totalPrice} onChange={handleChange} />
                      </div>

                      <div className="flex gap-4 mt-6">
                        <Button onClick={analyzeQuote} disabled={loading} className="flex-1 py-3 text-lg bg-gray-900 hover:bg-gray-800">
                          {loading ? 'Analyzing...' : 'Analyze Quote'}
                        </Button>
                        <Button onClick={resetForm} variant="outline" className="flex-1 py-3 text-lg">
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>

                  {analysis && (
                    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h3 className="text-xl font-semibold text-gray-700">Analysis Results</h3>
                      <div className="text-center">
                        <p className="text-lg font-medium">Overall Assessment:</p>
                        <p className={`text-5xl font-bold ${getOverallColor(analysis.overall)}`}>
                          {analysis.overall.charAt(0).toUpperCase() + analysis.overall.slice(1)}
                        </p>
                        <p className="text-sm text-gray-500">Score: {analysis.score}%</p>
                        {analysis.price_per_kw && (
                          <p className="text-sm text-gray-500">Price: £{analysis.price_per_kw}/kW</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-md font-semibold text-gray-700">Breakdown:</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Price: <span className={getBreakdownColor(analysis.breakdown.price)}>{analysis.breakdown.price}</span></li>
                          <li>Panel Output: <span className={getBreakdownColor(analysis.breakdown.panelOutput)}>{analysis.breakdown.panelOutput}</span></li>
                          <li>Panel Brand: <span className={getBreakdownColor(analysis.breakdown.panelBrand)}>{analysis.breakdown.panelBrand}</span></li>
                          {formData.hasBattery === 'yes' && analysis.breakdown.batteryBrand && (
                            <li>Battery Brand: <span className={getBreakdownColor(analysis.breakdown.batteryBrand)}>{analysis.breakdown.batteryBrand}</span></li>
                          )}
                          <li>System Size: <span className={getBreakdownColor(analysis.breakdown.systemSize)}>{analysis.breakdown.systemSize}</span></li>
                        </ul>
                      </div>

                      {/* Enhanced Analysis Display */}
                      {analysis.enhanced_analysis && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-blue-800 mb-3">Enhanced Analysis</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Panel Model:</span>
                              <p className="text-blue-700">{analysis.enhanced_analysis.panel_model}</p>
                            </div>
                            <div>
                              <span className="font-medium">Efficiency:</span>
                              <p className="text-blue-700">{analysis.enhanced_analysis.efficiency}%</p>
                            </div>
                            <div>
                              <span className="font-medium">Technology:</span>
                              <p className="text-blue-700">{analysis.enhanced_analysis.technology}</p>
                            </div>
                            <div>
                              <span className="font-medium">Degradation:</span>
                              <p className="text-blue-700">{analysis.enhanced_analysis.degradation_annual}%/year</p>
                            </div>
                          </div>
                        </div>
                      )}

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
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

