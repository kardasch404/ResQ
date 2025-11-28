import { useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentApi } from '../services/api';

export const useDeleteIncident = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: incidentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
};
