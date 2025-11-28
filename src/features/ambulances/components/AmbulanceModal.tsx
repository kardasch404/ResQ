import { useForm } from 'react-hook-form';
import { useAddAmbulance } from '../hooks/useAddAmbulance';
import { AmbulanceStatus } from '../../../shared/types';

interface AmbulanceFormData {
  callSign: string;
  status: AmbulanceStatus;
  latitude: number;
  longitude: number;
  address: string;
  crew: string;
  equipment: string;
}

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AmbulanceModal({ isOpen, onClose }: AmbulanceModalProps) {
  const { register, handleSubmit, reset } = useForm<AmbulanceFormData>();
  const addAmbulance = useAddAmbulance();

  if (!isOpen) return null;

  const onSubmit = (data: AmbulanceFormData) => {
    addAmbulance.mutate({
      callSign: data.callSign,
      status: data.status,
      location: {
        lat: data.latitude,
        lng: data.longitude,
        address: data.address,
      },
      crew: data.crew.split(',').map(c => c.trim()),
      equipment: data.equipment.split(',').map(e => e.trim()),
    }, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[3000]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Ambulance</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Call Sign</label>
            <input {...register('callSign', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select {...register('status')} className="w-full border rounded px-3 py-2">
              <option value={AmbulanceStatus.AVAILABLE}>Available</option>
              <option value={AmbulanceStatus.OUT_OF_SERVICE}>Out of Service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input {...register('address', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input {...register('latitude', { valueAsNumber: true, required: true })} type="number" step="any" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input {...register('longitude', { valueAsNumber: true, required: true })} type="number" step="any" className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Crew (comma separated)</label>
            <input {...register('crew', { required: true })} placeholder="John Doe, Jane Smith" className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Equipment (comma separated)</label>
            <input {...register('equipment', { required: true })} placeholder="Defibrillator, Oxygen" className="w-full border rounded px-3 py-2" />
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={addAmbulance.isPending} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {addAmbulance.isPending ? 'Adding...' : 'Add Ambulance'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
