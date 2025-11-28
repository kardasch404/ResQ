import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ambulanceApi } from '../services/api';

export const useAddAmbulance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ambulanceApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ambulances'] });
      toast.success('Ambulance added successfully');
    },
    onError: () => {
      toast.error('Failed to add ambulance');
    },
  });
};
