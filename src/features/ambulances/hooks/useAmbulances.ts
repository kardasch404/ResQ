import { useQuery } from '@tanstack/react-query';
import { ambulanceApi } from '../services/api';

export const useAmbulances = () => {
  return useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceApi.getAll,
    refetchInterval: 5000,
  });
};
