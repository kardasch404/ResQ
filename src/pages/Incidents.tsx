import { useState } from 'react';
import { useIncidents } from '../features/incidents/hooks/useIncidents';
import { useDeleteIncident } from '../features/incidents/hooks/useDeleteIncident';
import IncidentForm from '../features/incidents/components/IncidentForm';
import DispatchPanel from '../features/dispatch/components/DispatchPanel';
import type { Incident } from '../shared/types';

export default function Incidents() {
  const { data: incidents = [], isLoading } = useIncidents();
  const deleteIncident = useDeleteIncident();
  const [showForm, setShowForm] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this incident?')) {
      deleteIncident.mutate(id);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Incident Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {showForm ? 'Hide Form' : 'New Incident'}
        </button>
      </div>

      {showForm && <div className="mb-6"><IncidentForm /></div>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-6 py-4 whitespace-nowrap">{incident.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded ${
                    incident.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                    incident.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                    incident.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {incident.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{incident.status}</td>
                <td className="px-6 py-4">{incident.location?.address || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(incident.reportedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {incident.assignedAmbulanceId || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {incident.status === 'PENDING' && (
                    <button
                      onClick={() => setSelectedIncident(incident)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Assign
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(incident.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DispatchPanel incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
    </div>
  );
}
