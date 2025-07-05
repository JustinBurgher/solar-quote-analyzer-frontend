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
      const response = await fetch("http://localhost:5000/api/analyze/quote", { // IMPORTANT: Update this URL for deployment!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData ),
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
