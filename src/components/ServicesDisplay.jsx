import { useServicesByStation } from '../hooks/useServicesByStation';
import { ServiceIcon } from './ServiceIcon';
import { StationMap } from './StationMap';
import { useStations } from '../hooks/useStations';

export const ServicesDisplay = ({ stationId }) => {
  const { data: services, isLoading, error } = useServicesByStation(stationId);
  const { data: stations } = useStations();
  
  const selectedStation = stations?.find(s => s.station_id === stationId);

  if (!stationId) {
    return (
      <div className="services-card">
        <div className="services-card-empty">
          <span className="empty-icon">👆</span>
          <p>Selecciona una estación</p>
          <span className="empty-sub">para ver sus servicios y ubicación</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="services-card">
        <div className="services-card-loading">
          <div className="loading-spinner"></div>
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-card">
        <div className="services-card-error">
          <span className="error-icon">⚠️</span>
          <p>Error al cargar los datos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="services-card">
      {/* Servicios */}
      <div className="services-section">
        <div className="services-header">
          <h3>Servicios disponibles</h3>
          <span className="services-count">{services?.length || 0}</span>
        </div>
        <div className="services-grid">
          {services?.map((service) => (
            <ServiceIcon 
              key={service.idServicio} 
              serviceName={service.nombreServ} 
            />
          ))}
          {services?.length === 0 && (
            <div className="no-services">
              <span>🔍</span>
              <p>Sin servicios disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Mapa - Ocupa el resto de la tarjeta */}
      <div className="map-section">
        <StationMap station={selectedStation} />
      </div>
    </div>
  );
};