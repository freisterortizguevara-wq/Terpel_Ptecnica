import { useState } from 'react';
import { StationList } from '../components/StationList';
import { ServicesDisplay } from '../components/ServicesDisplay';
import { useStations } from '../hooks/useStations';

export const StationsPage = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const { data: stations } = useStations();

  return (
    <div className="stations-page">
      <header className="page-header">
        <div className="header-left">
          <div className="logo-container">
            {/* ⭐ LOGO DEFINITIVO - CON TEXTO, SIN IMAGEN */}
            <div className="logo-definitivo" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '4px 16px 4px 8px',
              background: 'white',
              borderRadius: '12px',
              border: '2px solid #E63946',
              boxShadow: '0 2px 8px rgba(230, 57, 70, 0.15)'
            }}>
              <span style={{
                fontSize: '30px',
                background: '#E63946',
                color: 'white',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}>⛽</span>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '1.1'
              }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#212529',
                  letterSpacing: '-0.5px'
                }}>Ter<span style={{color: '#E63946'}}>pel</span></span>
                <span style={{
                  fontSize: '9px',
                  color: '#6C757D',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase'
                }}>A tu servicio</span>
              </div>
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
            <span>🌐</span> Visitar Terpel
          </a>
        </div>
      </header>
      
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
          <a href="https://www.terpel.com/estaciones-de-servicio/encuentra-estaciones-terpel-cerca-de-ti-y-programa-tus-paradas" target="_blank" rel="noopener noreferrer">
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