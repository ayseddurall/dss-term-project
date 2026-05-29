import { useState, useEffect } from 'react'
import { LayoutDashboard, TrendingUp, MapPin } from 'lucide-react'
import KPICards from './components/KPICards'
import CityRankings from './components/CityRankings'
import DataCharts from './components/DataCharts'
import appData from './app_data.json'
import './index.css'

function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Process raw JSON data into clean usable structures
    
    // 1. Process KPI from dashboard_raw
    // In our excel dashboard_raw:
    // row 2: [Toplam İlan, "", Ortalama Fiyat, "", Ortalama m², "", En İyi Şehir, "", En Yüksek Skor]
    // row x (we don't have the values directly here if they were calculated, wait we extracted head(10)). 
    // Actually, dashboard_raw might not have the values because they were formulas that pandas didn't evaluate. 
    // Let's just calculate them from sample_listings and decision_raw!
    
    // decision_raw starts real data at index 3
    const decisionRows = appData.decision_raw.slice(3)
    const validCities = decisionRows.filter(row => {
      const isCityValid = row["3"] && row["3"] !== "Not" && row["0"] !== "Toplam" && row["3"] !== ""
      const hasValidScore = !isNaN(parseFloat(row["11"]))
      return isCityValid && hasValidScore
    })
    
    // Sort by Total Score (col 11) descending
    const rankedCities = [...validCities].sort((a, b) => {
      const scoreA = parseFloat(a["11"]) || 0;
      const scoreB = parseFloat(b["11"]) || 0;
      return scoreB - scoreA;
    });
    
    const bestCityName = rankedCities.length > 0 ? rankedCities[0]["3"] : "N/A"
    const bestScore = rankedCities.length > 0 ? parseFloat(rankedCities[0]["11"]).toFixed(2) : "0"
    
    // calculate total listings from decision data (col 4)
    const totalListings = validCities.reduce((acc, row) => acc + (parseInt(row["4"]) || 0), 0)
    
    // calculate average price from decision data
    let sumPrices = 0;
    let sumM2 = 0;
    validCities.forEach(row => {
      sumPrices += parseFloat(row["5"]) || 0;
      sumM2 += parseFloat(row["6"]) || 0;
    });
    const avgPrice = validCities.length > 0 ? sumPrices / validCities.length : 0;
    const avgM2 = validCities.length > 0 ? sumM2 / validCities.length : 0;

    const kpiData = {
      totalListings,
      avgPrice,
      avgM2,
      bestCity: bestCityName,
      bestScore
    }

    setData({
      kpis: kpiData,
      cities: rankedCities,
      segments: appData.segment_counts,
      listings: appData.sample_listings
    })
  }, [])

  if (!data) return <div className="app-container">Loading...</div>

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <h1><span className="gradient-text">Real Estate</span> DSS</h1>
          <p>Karar Destek Sistemi Gösterge Paneli</p>
        </div>
        <div className="header-actions">
          <button className="glass-card" style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--accent-primary)', background: 'rgba(99,102,241,0.1)', color: 'white' }}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        <KPICards kpis={data.kpis} />
        <DataCharts segments={data.segments} />
        <CityRankings cities={data.cities} />
      </main>
    </div>
  )
}

export default App
