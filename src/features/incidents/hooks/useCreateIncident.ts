import { useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentApi } from '../services/api';

export const useCreateIncident = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: incidentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
};
