import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'

const DataCharts = ({ segments }) => {
  // Convert segments object to array for Recharts
  const data = Object.keys(segments).map(key => ({
    name: key,
    value: segments[key]
  })).sort((a, b) => b.value - a.value);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card" style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontWeight: 600 }}>{payload[0].name}</p>
          <p style={{ color: 'var(--text-secondary)' }}>{payload[0].value} İlan</p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '12px', fontWeight: 'bold' }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="glass-card chart-container" style={{ gridColumn: 'span 12' }}>
      <div className="section-title">
        <PieChartIcon size={24} color="var(--accent-secondary)" />
        <h2>Fiyat Segmenti Dağılımı</h2>
      </div>
      <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DataCharts
