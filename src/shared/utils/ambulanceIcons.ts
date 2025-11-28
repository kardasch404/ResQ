  import { divIcon } from 'leaflet';
import { AmbulanceStatus } from '../types';

const getColorByStatus = (status: AmbulanceStatus): string => {
  switch (status) {
    case AmbulanceStatus.AVAILABLE:
      return '#10b981';
    case AmbulanceStatus.EN_ROUTE:
      return '#3b82f6';
    case AmbulanceStatus.ON_SCENE:
      return '#f59e0b';
    case AmbulanceStatus.TRANSPORTING:
      return '#8b5cf6';
    case AmbulanceStatus.AT_HOSPITAL:
      return '#ec4899';
    case AmbulanceStatus.OUT_OF_SERVICE:
      return '#6b7280';
    default:
      return '#6b7280';
  }
};

export const createAmbulanceIcon = (status: AmbulanceStatus, rotation: number = 0) => {
  const color = getColorByStatus(status);
  const svg = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(${rotation} 16 16)">
        <path d="M16 4 L24 28 L16 24 L8 28 Z" fill="${color}" stroke="white" stroke-width="2"/>
      </g>
    </svg>
  `;
  
  return divIcon({
    html: svg,
    className: 'ambulance-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};
