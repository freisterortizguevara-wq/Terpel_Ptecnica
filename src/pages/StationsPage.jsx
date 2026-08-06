import { useState } from 'react';
import { StationList } from '../components/StationList';
import { ServicesDisplay } from '../components/ServicesDisplay';
import { useStations } from '../hooks/useStations';
// import './StationsPage.css';  // ← Eliminado

export const StationsPage = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const { data: stations } = useStations();

  return (
    <div className="stations-page">
      <header className="page-header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-badge">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Terpel">
                <path
                  d="M12 1C12 1 6 7.8 6 13.8C6 17.8 8.7 21 12 21C15.3 21 18 17.8 18 13.8C18 10.5 15.5 7.5 13.7 5.5C14.1 7.5 13.3 8.7 12.3 9.2C12.5 6.7 11 4.2 12 1Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
            <div className="logo-text">
              <span className="wordmark">Ter<span className="accent">pel</span></span>
              <span className="tagline">A tu servicio</span>
            </div>
          </div>

          <div className="header-text">
            <h1>Contenido por Estación</h1>
            <p className="subtitle">Gestiona los servicios de cada estación</p>
          </div>
        </div>

        <div className="header-right">
          <a
            href="https://www.terpel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terpel"
          >
            <span className="icon">🌐</span> Visitar Terpel
          </a>
        </div>
      </header>

      <div className="flow-gauge" aria-hidden="true">
        <div className="flow-gauge-ticks">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="flow-gauge-sweep" />
      </div>

      <div className="content-grid">
        <div className="stations-section">
          <div className="section-header">
            <h2>Estaciones</h2>
            <span className="station-count">
              {stations?.length || 0} estaciones
            </span>
          </div>
          <StationList
            selectedStationId={selectedStationId}
            onSelectStation={setSelectedStationId}
          />
        </div>

        <div className="services-section">
          <div className="section-header">
            <h2>Servicios</h2>
          </div>
          <ServicesDisplay stationId={selectedStationId} />
        </div>
      </div>

      <footer className="page-footer">
        <p>© 2026 Terpel - Todos los derechos reservados</p>
        <div className="footer-links">
          <a
            href="https://www.terpel.com/estaciones-de-servicio/encuentra-estaciones-terpel-cerca-de-ti-y-programa-tus-paradas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terpel
          </a>
          <a href="https://www.terpel.com/empresas/aviacion/contacto" target="_blank" rel="noopener noreferrer">
            Contacto
          </a>
        </div>
      </footer>
    </div>
  );
};
