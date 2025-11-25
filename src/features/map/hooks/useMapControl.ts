import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export const useMapControl = (selectedId: string | null, items: Array<{ id: string; location: { lat: number; lng: number } }>) => {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const item = items.find(i => i.id === selectedId);
      if (item) {
        map.flyTo([item.location.lat, item.location.lng], 15, { duration: 1 });
      }
    }
  }, [selectedId, items, map]);

  return map;
};
