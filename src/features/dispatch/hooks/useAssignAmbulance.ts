import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { incidentApi } from '../../incidents/services/api';

export const useAssignAmbulance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ incidentId, ambulanceId }: { incidentId: string; ambulanceId: string }) =>
      incidentApi.update(incidentId, { assignedAmbulanceId: ambulanceId, status: 'ASSIGNED' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['ambulances'] });
      toast.success('Ambulance assigned successfully');
    },
    onError: () => {
      toast.error('Failed to assign ambulance');
    },
  });
};
