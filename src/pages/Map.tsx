import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAmbulances } from '../features/ambulances/hooks/useAmbulances';
import { useIncidents } from '../features/incidents/hooks/useIncidents';
import AmbulanceMarker from '../features/ambulances/components/AmbulanceMarker';
import IncidentMarker from '../features/incidents/components/IncidentMarker';
import MapFilters from '../features/map/components/MapFilters';
import MapController from '../features/map/components/MapController';
import { useAppDispatch } from '../app/hooks';
import { selectAmbulance } from '../features/ambulances/ambulanceSlice';
import { AmbulanceStatus } from '../shared/types';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const { data: ambulances = [], isLoading: loadingAmbulances } = useAmbulances();
  const { data: incidents = [], isLoading: loadingIncidents } = useIncidents();
  const dispatch = useAppDispatch();
  const [selectedStatuses, setSelectedStatuses] = useState<AmbulanceStatus[]>(Object.values(AmbulanceStatus));

  const handleMarkerClick = (id: string) => {
    dispatch(selectAmbulance(id));
  };

  const handleToggleStatus = (status: AmbulanceStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredAmbulances = ambulances.filter(a => selectedStatuses.includes(a.status));

  if (loadingAmbulances || loadingIncidents) return <div className="p-6">Loading map...</div>;

  return (
    <div className="h-screen w-full relative">
      <MapFilters selectedStatuses={selectedStatuses} onToggleStatus={handleToggleStatus} />
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapController ambulances={ambulances} incidents={incidents} />
        {filteredAmbulances.map((ambulance) => (
          <AmbulanceMarker
            key={ambulance.id}
            ambulance={ambulance}
            onClick={handleMarkerClick}
          />
        ))}
        {incidents.map((incident) => (
          <IncidentMarker key={incident.id} incident={incident} />
        ))}
      </MapContainer>
    </div>
  );
}
