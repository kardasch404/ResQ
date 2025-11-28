import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { incidentSchema, type IncidentFormData } from '../../../shared/schemas/incidentSchema';
import { useCreateIncident } from '../hooks/useCreateIncident';

export default function IncidentForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
  });
  const createIncident = useCreateIncident();

  const onSubmit = (data: IncidentFormData) => {
    createIncident.mutate({
      type: 'Emergency',
      priority: data.severity,
      status: 'PENDING',
      location: { lat: data.latitude, lng: data.longitude, address: data.address },
      description: data.patientInfo,
      reportedAt: new Date().toISOString(),
    }, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input {...register('address')} className="w-full border rounded px-3 py-2" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Patient Info</label>
        <textarea {...register('patientInfo')} className="w-full border rounded px-3 py-2" rows={3} />
        {errors.patientInfo && <p className="text-red-500 text-sm">{errors.patientInfo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Severity</label>
        <select {...register('severity')} className="w-full border rounded px-3 py-2">
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        {errors.severity && <p className="text-red-500 text-sm">{errors.severity.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input {...register('latitude', { valueAsNumber: true })} type="number" step="any" className="w-full border rounded px-3 py-2" />
          {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input {...register('longitude', { valueAsNumber: true })} type="number" step="any" className="w-full border rounded px-3 py-2" />
          {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={createIncident.isPending} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {createIncident.isPending ? 'Creating...' : 'Create Incident'}
      </button>
    </form>
  );
}
