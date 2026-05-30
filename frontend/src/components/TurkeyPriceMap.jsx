import { useState, useMemo } from 'react';
import TurkeyMap from 'turkey-map-react';
import { Map } from 'lucide-react';

const TurkeyPriceMap = ({ cityPrices }) => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: null });

  const formatCurrency = (val) => {
    if (val === undefined || val === null) return "Veri Yok";
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  }

  // Normalize Turkish characters for robust matching
  const normalizeCityName = (name) => {
    if (!name) return "";
    return name.replace(/İ/g, 'I').replace(/ı/g, 'i')
               .replace(/Ş/g, 'S').replace(/ş/g, 's')
               .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
               .replace(/Ü/g, 'U').replace(/ü/g, 'u')
               .replace(/Ö/g, 'O').replace(/ö/g, 'o')
               .replace(/Ç/g, 'C').replace(/ç/g, 'c')
               .toUpperCase();
  };

  const normalizedPrices = useMemo(() => {
    const map = {};
    if (cityPrices) {
      Object.keys(cityPrices).forEach(key => {
        map[normalizeCityName(key)] = cityPrices[key];
      });
    }
    return map;
  }, [cityPrices]);

  const renderTooltip = () => {
    if (!tooltip.show) return null;
    return (
      <div 
        style={{
          position: 'fixed',
          top: tooltip.y + 15,
          left: tooltip.x + 15,
          backgroundColor: 'rgba(10, 10, 15, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 15px',
          borderRadius: '8px',
          pointerEvents: 'none',
          zIndex: 1000,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          color: 'white',
          minWidth: '150px'
        }}
      >
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{tooltip.content.name}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: tooltip.content.price ? 'var(--success)' : 'var(--text-secondary)' }}>
          {tooltip.content.price ? formatCurrency(tooltip.content.price) : "Veri Yok"}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card chart-container" style={{ gridColumn: 'span 12', height: 'auto', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title">
        <Map size={24} color="var(--accent-secondary)" />
        <h2>Şehir Bazlı Fiyat Haritası</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Tüm iller için ortalama ilan fiyatları. Görmek istediğiniz şehrin üzerine gelin.
      </p>

      <div 
        style={{ flex: 1, position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onMouseMove={(e) => {
          if (tooltip.show) {
            setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
          }
        }}
        onMouseLeave={() => setTooltip(prev => ({ ...prev, show: false }))}
      >
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <TurkeyMap 
            hoverable={true}
            customStyle={{ 
              idleColor: "rgba(255,255,255,0.05)", 
              hoverColor: "var(--accent-primary)" 
            }}
            onHover={({ name }) => {
              const normalized = normalizeCityName(name);
              const price = normalizedPrices[normalized];
              setTooltip(prev => ({ ...prev, show: true, content: { name, price } }));
            }}
            onClick={() => {}} // dummy to prevent errors
          />
        </div>
      </div>
      
      {renderTooltip()}
    </div>
  );
}

export default TurkeyPriceMap;
