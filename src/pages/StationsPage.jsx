import { useState } from 'react';
import { StationList } from '../components/StationList';
import { ServicesDisplay } from '../components/ServicesDisplay';
import { useStations } from '../hooks/useStations';
import './StationsPage.css';

export const StationsPage = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const { data: stations } = useStations();

  return (
    <div className="stations-page">
      <header className="page-header">
        <div className="header-left">
          <div className="logo-container">
            <svg
              className="logo-mark"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Terpel"
            >
              <defs>
                <linearGradient id="tpFlame" x1="8" y1="4" x2="40" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--terpel-gold)" />
                  <stop offset="45%" stopColor="var(--terpel-red)" />
                  <stop offset="100%" stopColor="var(--terpel-red-dark)" />
                </linearGradient>
              </defs>
              <path
                d="M24 2C24 2 12 15.5 12 27.5C12 35.5 17.5 42 24 42C30.5 42 36 35.5 36 27.5C36 21 31 15 27.5 11C28.3 15 26.5 17.5 24.5 18.5C24.9 13.5 22 8.5 24 2Z"
                fill="url(#tpFlame)"
              />
              <ellipse cx="24" cy="30" rx="6" ry="8" fill="rgba(255,255,255,0.18)" />
            </svg>
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
