import { useState } from 'react';
import { useToggleStationActive } from '../hooks/useStations';

export const StationCard = ({ station, isSelected, onSelect }) => {
  const [isActive, setIsActive] = useState(station.is_active);
  const toggleMutation = useToggleStationActive();

  const handleToggle = (e) => {
    e.stopPropagation();
    
    toggleMutation.mutate(
      { 
        stationId: station.station_id, 
        currentActive: isActive 
      },
      {
        onSuccess: () => {
          setIsActive(!isActive);
        },
      }
    );
  };

  return (
    <div 
      className={`station-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(station.station_id)}
    >
      <div className="station-card-content">
        <div className="station-main">
          <h3 className="station-name">{station.name}</h3>
          <span className="check-mark">✓</span>
        </div>
        
        <p className="station-id">
          <strong>ID:</strong> {station.station_id}
        </p>
        
        <div className="station-meta">
          <span className={`status-badge ${station.status}`}>
            <span className="dot"></span>
            {station.status}
          </span>
          <span className="updated-date">
            📅 {new Date(station.updated_at).toLocaleDateString('es-CO')}
          </span>
        </div>

        {/* 📍 Ciudad y Dirección */}
        {(station.city || station.address) && (
          <div className="station-location">
            <span className="location-icon">📍</span>
            {station.city && (
              <span className="location-city">{station.city}</span>
            )}
            {station.address && (
              <span className="location-address">{station.address}</span>
            )}
          </div>
        )}
        
        <button 
          onClick={handleToggle}
          className={`btn-toggle ${isActive ? 'active' : 'inactive'}`}
          aria-label={`Alternar estado de ${station.name}`}
        >
          <span className="icon">{isActive ? '●' : '○'}</span>
          {isActive ? 'Activa' : 'Inactiva'}
        </button>
      </div>
    </div>
  );
};


export default StationCard;