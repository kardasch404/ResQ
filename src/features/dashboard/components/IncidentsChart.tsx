import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIncidents } from '../../incidents/hooks/useIncidents';

export default function IncidentsChart() {
  const { data: incidents = [] } = useIncidents();

  const chartData = useMemo(() => {
    const hourCounts: Record<number, number> = {};
    
    incidents.forEach(incident => {
      const hour = new Date(incident.reportedAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      incidents: hourCounts[i] || 0,
    }));
  }, [incidents]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Incidents per Hour</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="incidents" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
