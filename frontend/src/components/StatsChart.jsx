import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function StatsChart({ pendingCount, completedCount }) {
  const data = [
    { name: 'Pending', value: pendingCount },
    { name: 'Completed', value: completedCount },
  ];

  const COLORS = ['#e65100', '#4caf50'];

  const hasData = pendingCount + completedCount > 0;

  if (!hasData) {
    return (
      <div className="chart-empty">
        <p>Add tasks to see your progress</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: COLORS[0] }}></span>
          Pending ({pendingCount})
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: COLORS[1] }}></span>
          Completed ({completedCount})
        </div>
      </div>
    </div>
  );
}

export default StatsChart;