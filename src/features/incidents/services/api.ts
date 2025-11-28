import { api } from '../../../services/api';
import type { Incident } from '../../../shared/types';

export const incidentApi = {
  getAll: () => api.get<Incident[]>('/incidents'),
  getById: (id: string) => api.get<Incident>(`/incidents/${id}`),
  create: (data: Partial<Incident>) => api.post<Incident>('/incidents', data),
  update: (id: string, data: Partial<Incident>) => api.put<Incident>(`/incidents/${id}`, data),
  delete: (id: string) => api.delete<void>(`/incidents/${id}`),
};
