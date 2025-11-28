import { z } from 'zod';

export const incidentSchema = z.object({
  address: z.string().min(5),
  patientInfo: z.string(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  latitude: z.number(),
  longitude: z.number(),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;
