import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { incidentApi } from '../services/api';

export const useCreateIncident = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: incidentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast.success('Incident created successfully');
    },
    onError: () => {
      toast.error('Failed to create incident');
    },
  });
};
