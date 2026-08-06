import { useQuery } from '@tanstack/react-query';
import { fetchServicesByStation } from '../services/api';

// Hook para obtener servicios de una estación específica
export const useServicesByStation = (stationId) => {
  return useQuery({
    queryKey: ['services', stationId],
    queryFn: () => fetchServicesByStation(stationId),
    enabled: !!stationId, // Solo se ejecuta si hay stationId
  });
};