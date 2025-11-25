import { MapContainer, TileLayer } from 'react-leaflet';
import { useAmbulances } from '../features/ambulances/hooks/useAmbulances';
import AmbulanceMarker from '../features/ambulances/components/AmbulanceMarker';
import { useAppDispatch } from '../app/hooks';
import { selectAmbulance } from '../features/ambulances/ambulanceSlice';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const { data: ambulances, isLoading } = useAmbulances();
  const dispatch = useAppDispatch();

  const handleMarkerClick = (id: string) => {
    dispatch(selectAmbulance(id));
  };

  if (isLoading) return <div className="p-6">Loading map...</div>;

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {ambulances?.map((ambulance) => (
          <AmbulanceMarker
            key={ambulance.id}
            ambulance={ambulance}
            onClick={handleMarkerClick}
          />
        ))}
      </MapContainer>
    </div>
  );
}
