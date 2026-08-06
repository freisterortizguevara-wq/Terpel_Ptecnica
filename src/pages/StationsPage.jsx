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
            <img 
              src="https://raw.githubusercontent.com/freisterortizguevara-wq/Terpel_Ptecnica/main/images/logo-terpel.jpg" 
              alt="Logo Terpel" 
              className="logo-terpel"
              onError={(e) => {
                // Si la imagen no carga, mostrar texto
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                const fallback = document.createElement('div');
                fallback.className = 'logo-text-fallback';
                fallback.style.cssText = 'display:flex; align-items:center; gap:10px;';
                fallback.innerHTML = `
                  <span style="font-size:28px; background:#E63946; color:white; width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:8px;">⛽</span>
                  <span style="font-size:24px; font-weight:700; color:#212529;">Ter<span style="color:#E63946;">pel</span></span>
                `;
                parent.appendChild(fallback);
              }}
            />
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