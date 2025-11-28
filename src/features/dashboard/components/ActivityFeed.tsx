import { useIncidents } from '../../incidents/hooks/useIncidents';

export default function ActivityFeed() {
  const { data: incidents = [] } = useIncidents();
  
  const recentActivities = incidents
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivities.map((incident) => (
          <div key={incident.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              incident.priority === 'CRITICAL' ? 'bg-red-500' :
              incident.priority === 'HIGH' ? 'bg-orange-500' :
              'bg-yellow-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm font-semibold">{incident.type}</p>
              <p className="text-xs text-gray-600">{incident.location?.address || 'Unknown location'}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(incident.reportedAt).toLocaleString()}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              incident.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
              incident.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {incident.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
