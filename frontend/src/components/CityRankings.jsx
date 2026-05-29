import { MapPin } from 'lucide-react'

const CityRankings = ({ cities }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  }

  const formatNumber = (val) => {
    return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(val);
  }

  return (
    <div className="glass-card table-container" style={{ gridColumn: 'span 12' }}>
      <div className="section-title">
        <MapPin size={24} color="var(--accent-primary)" />
        <h2>Karar Destek Modeli: Şehir Sıralamaları</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Çok Kriterli Karar Verme Yöntemine göre analiz edilen şehirlerin sıralaması
      </p>
      
      <table className="modern-table">
        <thead>
          <tr>
            <th>Sıra</th>
            <th>Şehir</th>
            <th>İlan Sayısı</th>
            <th>Ortalama Fiyat</th>
            <th>Ort. m²</th>
            <th>Ort. m² Fiyatı</th>
            <th>Toplam Skor</th>
            <th>Karar</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={index}>
              <td>
                <span className="rank-badge" style={index < 3 ? {} : {background: 'var(--glass-bg)', color: 'var(--text-secondary)'}}>
                  #{index + 1}
                </span>
              </td>
              <td style={{ fontWeight: 600 }}>{city["3"]}</td>
              <td>{formatNumber(city["4"])}</td>
              <td>{formatCurrency(city["5"])}</td>
              <td>{formatNumber(city["6"])}</td>
              <td>{formatCurrency(city["7"])}</td>
              <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
                {parseFloat(city["11"]).toFixed(2)}
              </td>
              <td>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: city["13"] === 'Yatırım Yapılabilir' || index < 10 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: city["13"] === 'Yatırım Yapılabilir' || index < 10 ? 'var(--success)' : 'var(--text-secondary)'
                }}>
                  {city["13"] || (index < 10 ? 'Yatırım İçin Uygun' : 'Değerlendirilebilir')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CityRankings
