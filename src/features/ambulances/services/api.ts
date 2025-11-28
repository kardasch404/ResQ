import { api } from '../../../services/api';
import type { Ambulance } from '../../../shared/types';

export const ambulanceApi = {
  getAll: () => api.get<Ambulance[]>('/ambulances'),
  getById: (id: string) => api.get<Ambulance>(`/ambulances/${id}`),
  create: (data: Partial<Ambulance>) => api.post<Ambulance>('/ambulances', data),
  update: (id: string, data: Partial<Ambulance>) => api.put<Ambulance>(`/ambulances/${id}`, data),
};
