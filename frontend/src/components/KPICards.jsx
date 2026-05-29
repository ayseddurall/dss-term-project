import { Building2, CircleDollarSign, Maximize, Trophy, Target } from 'lucide-react'

const KPICards = ({ kpis }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  }

  const formatNumber = (val) => {
    return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(val);
  }

  return (
    <div className="kpi-container">
      <div className="glass-card kpi-card">
        <div className="kpi-header">
          <span>Toplam İlan</span>
          <div className="kpi-icon"><Building2 size={24} /></div>
        </div>
        <div className="kpi-value">{formatNumber(kpis.totalListings)}</div>
      </div>
      
      <div className="glass-card kpi-card">
        <div className="kpi-header">
          <span>Ortalama Fiyat</span>
          <div className="kpi-icon" style={{color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)'}}><CircleDollarSign size={24} /></div>
        </div>
        <div className="kpi-value">{formatCurrency(kpis.avgPrice)}</div>
      </div>
      
      <div className="glass-card kpi-card">
        <div className="kpi-header">
          <span>Ortalama m²</span>
          <div className="kpi-icon" style={{color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.1)'}}><Maximize size={24} /></div>
        </div>
        <div className="kpi-value">{formatNumber(kpis.avgM2)} m²</div>
      </div>
      
      <div className="glass-card kpi-card">
        <div className="kpi-header">
          <span>En İyi Şehir</span>
          <div className="kpi-icon" style={{color: 'var(--accent-secondary)', background: 'rgba(139, 92, 246, 0.1)'}}><Trophy size={24} /></div>
        </div>
        <div className="kpi-value">{kpis.bestCity}</div>
      </div>

      <div className="glass-card kpi-card">
        <div className="kpi-header">
          <span>En Yüksek Skor</span>
          <div className="kpi-icon" style={{color: '#ec4899', background: 'rgba(236, 72, 153, 0.1)'}}><Target size={24} /></div>
        </div>
        <div className="kpi-value">{kpis.bestScore}</div>
      </div>
    </div>
  )
}

export default KPICards
