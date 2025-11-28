import { useState } from 'react';
import { useAmbulances } from '../../ambulances/hooks/useAmbulances';
import { useAssignAmbulance } from '../hooks/useAssignAmbulance';
import { calculateDistance, calculateETA } from '../../../shared/utils/distance';
import type { Incident } from '../../../shared/types';
import { AmbulanceStatus } from '../../../shared/types';

interface DispatchPanelProps {
  incident: Incident | null;
  onClose: () => void;
}

export default function DispatchPanel({ incident, onClose }: DispatchPanelProps) {
  const { data: ambulances = [] } = useAmbulances();
  const assignAmbulance = useAssignAmbulance();
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(null);

  if (!incident) return null;

  const availableAmbulances = ambulances
    .filter(a => a.status === AmbulanceStatus.AVAILABLE)
    .map(a => ({
      ...a,
      distance: calculateDistance(
        incident.location.lat,
        incident.location.lng,
        a.location.lat,
        a.location.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  const handleAssign = () => {
    if (selectedAmbulanceId) {
      assignAmbulance.mutate(
        { incidentId: incident.id, ambulanceId: selectedAmbulanceId },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-[2000] overflow-y-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Assign Ambulance</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Incident Details</h3>
          <p className="text-sm text-gray-600">{incident.type}</p>
          <p className="text-sm">
            <span className="font-semibold">Priority:</span>{' '}
            <span className={`font-bold ${
              incident.priority === 'CRITICAL' ? 'text-red-600' :
              incident.priority === 'HIGH' ? 'text-orange-600' :
              'text-yellow-600'
            }`}>
              {incident.priority}
            </span>
          </p>
          <p className="text-sm text-gray-600">{incident.location.address}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Available Ambulances ({availableAmbulances.length})</h3>
          <div className="space-y-2">
            {availableAmbulances.map((ambulance) => {
              const eta = calculateETA(ambulance.distance);
              return (
                <div
                  key={ambulance.id}
                  onClick={() => setSelectedAmbulanceId(ambulance.id)}
                  className={`p-3 border rounded cursor-pointer ${
                    selectedAmbulanceId === ambulance.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{ambulance.callSign}</p>
                      <p className="text-sm text-gray-600">Crew: {ambulance.crew.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{ambulance.distance.toFixed(1)} km</p>
                      <p className="text-xs text-gray-600">ETA: {eta} min</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {availableAmbulances.length === 0 && (
          <p className="text-center text-gray-500 py-4">No available ambulances</p>
        )}

        <button
          onClick={handleAssign}
          disabled={!selectedAmbulanceId || assignAmbulance.isPending}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {assignAmbulance.isPending ? 'Assigning...' : 'Assign Ambulance'}
        </button>
      </div>
    </div>
  );
}
