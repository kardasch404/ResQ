import { Marker, Popup } from 'react-leaflet';
import type { Incident } from '../../../shared/types';
import { createIncidentIcon } from '../../../shared/utils/incidentIcons';

interface IncidentMarkerProps {
  incident: Incident;
}

export default function IncidentMarker({ incident }: IncidentMarkerProps) {
  const icon = createIncidentIcon(incident.priority);

  return (
    <Marker
      position={[incident.location.lat, incident.location.lng]}
      // @ts-expect-error - react-leaflet v5 icon prop type issue
      icon={icon}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <h3 className="font-bold text-lg mb-2">{incident.type}</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold">Priority:</span>{' '}
              <span className={`font-bold ${
                incident.priority === 'CRITICAL' ? 'text-red-600' :
                incident.priority === 'HIGH' ? 'text-orange-600' :
                incident.priority === 'MEDIUM' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {incident.priority}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Status:</span> {incident.status}
            </p>
            <p className="text-sm text-gray-600">{incident.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              Reported: {new Date(incident.reportedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
