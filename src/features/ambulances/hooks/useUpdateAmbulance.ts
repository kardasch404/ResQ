import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ambulanceApi } from '../services/api';

export const useUpdateAmbulance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => ambulanceApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ambulances'] });
      toast.success('Ambulance updated successfully');
    },
    onError: () => {
      toast.error('Failed to update ambulance');
    },
  });
};
