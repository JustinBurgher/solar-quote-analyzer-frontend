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
