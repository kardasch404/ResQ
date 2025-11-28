import { useKPIs } from '../features/dashboard/hooks/useKPIs';
import KPICard from '../features/dashboard/components/KPICard';
import ActivityFeed from '../features/dashboard/components/ActivityFeed';
import IncidentsChart from '../features/dashboard/components/IncidentsChart';

export default function Dashboard() {
  const { availableAmbulances, activeIncidents, avgResponseTime } = useKPIs();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Available Ambulances"
          value={availableAmbulances}
          icon="🚑"
          color="text-green-500"
        />
        <KPICard
          title="Active Incidents"
          value={activeIncidents}
          icon="🚨"
          color="text-red-500"
        />
        <KPICard
          title="Avg Response Time"
          value={`${avgResponseTime} min`}
          icon="⏱️"
          color="text-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncidentsChart />
        <ActivityFeed />
      </div>
    </div>
  );
}
