import { useStations } from '../hooks/useStations';
import { StationCard } from './StationCard';

export const StationList = ({ selectedStationId, onSelectStation }) => {
  const { data: stations, isLoading, error } = useStations();

  if (isLoading) return <div>Cargando estaciones...</div>;
  if (error) return <div>Error al cargar estaciones</div>;

  return (
    <div className="station-list">
      {stations?.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onSelect={onSelectStation}
          isSelected={selectedStationId === station.station_id}
        />
      ))}
    </div>
  );
};