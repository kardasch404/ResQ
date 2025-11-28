import { Marker, Popup } from 'react-leaflet';
import type { Ambulance } from '../../../shared/types';
import { createAmbulanceIcon } from '../../../shared/utils/ambulanceIcons';

interface AmbulanceMarkerProps {
  ambulance: Ambulance;
  onClick?: (id: string) => void;
}


export default function AmbulanceMarker({ ambulance, onClick }: AmbulanceMarkerProps) {
  if (!ambulance?.location?.lat || !ambulance?.location?.lng) {
    return null;
  }

  const icon = createAmbulanceIcon(ambulance.status, 0);

  return (
    <Marker
      position={[ambulance.location.lat, ambulance.location.lng]}
      // @ts-expect-error - react-leaflet v5 icon prop type issue
      icon={icon}
      eventHandlers={{
        click: () => onClick?.(ambulance.id),
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-lg">{ambulance.callSign}</h3>
          <p className="text-sm text-gray-600">Status: {ambulance.status}</p>
          <p className="text-sm text-gray-600">Crew: {ambulance.crew.join(', ')}</p>
          <p className="text-sm text-gray-600">Equipment: {ambulance.equipment.length} items</p>
        </div>
      </Popup>
    </Marker>
  );
}

