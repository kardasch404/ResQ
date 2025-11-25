import { useMapControl } from '../hooks/useMapControl';
import { useAppSelector } from '../../../app/hooks';

export default function MapController({ ambulances, incidents }: { ambulances: any[]; incidents: any[] }) {
  const selectedAmbulanceId = useAppSelector(state => state.ambulances.selectedId);
  const selectedIncidentId = useAppSelector(state => state.incidents.selectedId);

  const allItems = [...ambulances, ...incidents];
  const selectedId = selectedAmbulanceId || selectedIncidentId;

  useMapControl(selectedId, allItems);

  return null;
}
