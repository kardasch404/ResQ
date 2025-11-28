import { useMemo } from 'react';
import { useAmbulances } from '../../ambulances/hooks/useAmbulances';
import { useIncidents } from '../../incidents/hooks/useIncidents';
import { AmbulanceStatus, IncidentStatus } from '../../../shared/types';

export const useKPIs = () => {
  const { data: ambulances = [] } = useAmbulances();
  const { data: incidents = [] } = useIncidents();

  return useMemo(() => {
    const availableAmbulances = ambulances.filter(a => a.status === AmbulanceStatus.AVAILABLE).length;
    const activeIncidents = incidents.filter(i => 
      i.status === IncidentStatus.PENDING || 
      i.status === IncidentStatus.ASSIGNED || 
      i.status === IncidentStatus.IN_PROGRESS
    ).length;

    const completedIncidents = incidents.filter(i => i.status === IncidentStatus.COMPLETED);
    const avgResponseTime = completedIncidents.length > 0
      ? Math.round(completedIncidents.reduce((acc, inc) => acc + 15, 0) / completedIncidents.length)
      : 0;

    return {
      availableAmbulances,
      activeIncidents,
      avgResponseTime,
      totalAmbulances: ambulances.length,
      totalIncidents: incidents.length,
    };
  }, [ambulances, incidents]);
};
