import { useQuery } from '@tanstack/react-query';
import { incidentApi } from '../services/api';

export const useIncidents = () => {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: incidentApi.getAll,
    refetchInterval: 5000,
  });
};
