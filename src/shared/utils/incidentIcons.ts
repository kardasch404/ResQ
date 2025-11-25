import { divIcon } from 'leaflet';
import { IncidentPriority } from '../types';

const getColorByPriority = (priority: IncidentPriority): string => {
  switch (priority) {
    case IncidentPriority.LOW:
      return '#10b981';
    case IncidentPriority.MEDIUM:
      return '#f59e0b';
    case IncidentPriority.HIGH:
      return '#ef4444';
    case IncidentPriority.CRITICAL:
      return '#dc2626';
    default:
      return '#6b7280';
  }
};

export const createIncidentIcon = (priority: IncidentPriority) => {
  const color = getColorByPriority(priority);
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" fill="${color}" stroke="white" stroke-width="2" opacity="0.9">
        <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="20" cy="20" r="8" fill="${color}" stroke="white" stroke-width="2"/>
    </svg>
  `;
  
  return divIcon({
    html: svg,
    className: 'incident-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};
