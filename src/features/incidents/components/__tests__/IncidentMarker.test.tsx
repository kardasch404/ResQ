import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import IncidentMarker from '../IncidentMarker';
import { IncidentPriority, IncidentStatus } from '../../../../shared/types';
import type { Incident } from '../../../../shared/types';

const mockIncident: Incident = {
  id: '1',
  type: 'Cardiac Arrest',
  priority: IncidentPriority.CRITICAL,
  status: IncidentStatus.PENDING,
  location: { lat: 48.8606, lng: 2.3376 },
  description: 'Male, 65 years old, chest pain',
  reportedAt: '2024-01-15T10:30:00Z',
};

describe('IncidentMarker', () => {
  it('renders with incident type', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <IncidentMarker incident={mockIncident} />
      </MapContainer>
    );
    expect(screen.getByText('Cardiac Arrest')).toBeInTheDocument();
  });

  it('displays CRITICAL priority', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <IncidentMarker incident={mockIncident} />
      </MapContainer>
    );
    expect(screen.getByText('CRITICAL')).toBeInTheDocument();
  });

  it('shows status', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <IncidentMarker incident={mockIncident} />
      </MapContainer>
    );
    expect(screen.getByText(/PENDING/)).toBeInTheDocument();
  });

  it('displays description', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <IncidentMarker incident={mockIncident} />
      </MapContainer>
    );
    expect(screen.getByText('Male, 65 years old, chest pain')).toBeInTheDocument();
  });
});
