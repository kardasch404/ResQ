import { AmbulanceStatus } from '../../../shared/types';

interface MapFiltersProps {
  selectedStatuses: AmbulanceStatus[];
  onToggleStatus: (status: AmbulanceStatus) => void;
}

const statusConfig = [
  { status: AmbulanceStatus.AVAILABLE, label: 'Available', color: 'bg-green-500' },
  { status: AmbulanceStatus.EN_ROUTE, label: 'En Route', color: 'bg-blue-500' },
  { status: AmbulanceStatus.ON_SCENE, label: 'On Scene', color: 'bg-yellow-500' },
  { status: AmbulanceStatus.TRANSPORTING, label: 'Transporting', color: 'bg-purple-500' },
  { status: AmbulanceStatus.AT_HOSPITAL, label: 'At Hospital', color: 'bg-pink-500' },
  { status: AmbulanceStatus.OUT_OF_SERVICE, label: 'Out of Service', color: 'bg-gray-500' },
];

export default function MapFilters({ selectedStatuses, onToggleStatus }: MapFiltersProps) {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-bold text-sm mb-3">Filter Ambulances</h3>
      <div className="space-y-2">
        {statusConfig.map(({ status, label, color }) => (
          <label key={status} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={() => onToggleStatus(status)}
              className="w-4 h-4"
            />
            <span className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
