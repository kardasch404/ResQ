export enum AmbulanceStatus {
  AVAILABLE = 'AVAILABLE',
  EN_ROUTE = 'EN_ROUTE',
  ON_SCENE = 'ON_SCENE',
  TRANSPORTING = 'TRANSPORTING',
  AT_HOSPITAL = 'AT_HOSPITAL',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

export enum IncidentStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum IncidentPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Ambulance {
  id: string;
  callSign: string;
  status: AmbulanceStatus;
  location: Location;
  crew: string[];
  equipment: string[];
}

export interface Incident {
  id: string;
  type: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  location: Location;
  description: string;
  reportedAt: string;
  assignedAmbulanceId?: string;
}
