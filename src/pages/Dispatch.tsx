import { useState } from 'react';
import { useIncidents } from '../features/incidents/hooks/useIncidents';
import { useAmbulances } from '../features/ambulances/hooks/useAmbulances';
import DispatchPanel from '../features/dispatch/components/DispatchPanel';
import type { Incident } from '../shared/types';
import { AmbulanceStatus, IncidentStatus } from '../shared/types';

export default function Dispatch() {
  const { data: incidents = [] } = useIncidents();
  const { data: ambulances = [] } = useAmbulances();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const pendingIncidents = incidents.filter(i => i.status === IncidentStatus.PENDING);
  const activeIncidents = incidents.filter(i => 
    i.status === IncidentStatus.ASSIGNED || i.status === IncidentStatus.IN_PROGRESS
  );
  const availableAmbulances = ambulances.filter(a => a.status === AmbulanceStatus.AVAILABLE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dispatch Center</h1>
        <div className="flex gap-4 text-sm">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded">
            {pendingIncidents.length} Pending
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
            {activeIncidents.length} Active
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded">
            {availableAmbulances.length} Available
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Pending Incidents</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {pendingIncidents.map(incident => (
              <div key={incident.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedIncident(incident)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{incident.type}</h3>
                    <p className="text-sm text-gray-600">{incident.location?.address || 'Unknown'}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(incident.reportedAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${
                    incident.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                    incident.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {incident.priority}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIncident(incident);
                  }}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Assign Ambulance →
                </button>
              </div>
            ))}
            {pendingIncidents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No pending incidents
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Active Operations</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {activeIncidents.map(incident => (
              <div key={incident.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{incident.type}</h3>
                    <p className="text-sm text-gray-600">{incident.location?.address || 'Unknown'}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                    {incident.status}
                  </span>
                </div>
                {incident.assignedAmbulanceId && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>🚑</span>
                    <span>Ambulance: {incident.assignedAmbulanceId}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Started: {new Date(incident.reportedAt).toLocaleString()}
                </p>
              </div>
            ))}
            {activeIncidents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No active operations
              </div>
            )}
          </div>
        </div>
      </div>

      <DispatchPanel incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
    </div>
  );
}
