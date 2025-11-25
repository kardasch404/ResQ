import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import AmbulanceMarker from '../AmbulanceMarker';
import { AmbulanceStatus } from '../../../../shared/types';
import type { Ambulance } from '../../../../shared/types';

const mockAmbulance: Ambulance = {
  id: '1',
  callSign: 'AMB-001',
  status: AmbulanceStatus.AVAILABLE,
  location: { lat: 48.8566, lng: 2.3522 },
  crew: ['John Doe', 'Jane Smith'],
  equipment: ['Defibrillator', 'Oxygen'],
};

describe('AmbulanceMarker', () => {
  it('renders with ambulance callSign', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <AmbulanceMarker ambulance={mockAmbulance} />
      </MapContainer>
    );
    expect(screen.getByText('AMB-001')).toBeInTheDocument();
  });

  it('displays status', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <AmbulanceMarker ambulance={mockAmbulance} />
      </MapContainer>
    );
    expect(screen.getByText(/AVAILABLE/)).toBeInTheDocument();
  });

  it('shows crew members', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <AmbulanceMarker ambulance={mockAmbulance} />
      </MapContainer>
    );
    expect(screen.getByText(/John Doe, Jane Smith/)).toBeInTheDocument();
  });

  it('displays equipment count', () => {
    render(
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <AmbulanceMarker ambulance={mockAmbulance} />
      </MapContainer>
    );
    expect(screen.getByText(/2 items/)).toBeInTheDocument();
  });
});
