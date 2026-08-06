import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStations, toggleStationActive } from '../services/api';

// Hook para obtener todas las estaciones
export const useStations = () => {
  return useQuery({
    queryKey: ['stations'],
    queryFn: fetchStations,
  });
};

// Hook para cambiar estado activo/inactivo
export const useToggleStationActive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ stationId, currentActive }) =>
      toggleStationActive(stationId, currentActive),
    onSuccess: () => {
      // Invalidar la caché para que se actualice automáticamente
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });
};