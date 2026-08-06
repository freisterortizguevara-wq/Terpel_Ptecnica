import { useState } from 'react';
import { StationList } from '../components/StationList';
import { ServicesDisplay } from '../components/ServicesDisplay';
import { useStations } from '../hooks/useStations';

export const StationsPage = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const { data: stations } = useStations();

  return (
    <div className="tp-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .tp-page {
          --tp-red: #DA251D;
          --tp-red-dark: #8F0F0C;
          --tp-red-glow: rgba(218, 37, 29, 0.35);
          --tp-amber: #FFB81C;
          --tp-amber-soft: #FFD27A;
          --tp-ink: #101114;
          --tp-ink-soft: #1A1C21;
          --tp-ink-line: rgba(255, 255, 255, 0.08);
          --tp-paper: #F6F4F0;
          --tp-paper-card: #FFFFFF;
          --tp-steel: #757984;
          --tp-steel-dark: #3D4048;
          --tp-radius: 10px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--tp-paper);
          min-height: 100vh;
          color: var(--tp-steel-dark);
        }

        /* ---------- HEADER ---------- */
        .tp-header {
          position: relative;
          background: radial-gradient(120% 180% at 8% 0%, #1c1e24 0%, var(--tp-ink) 55%, #0b0b0d 100%);
          padding: 30px 40px 34px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          overflow: hidden;
        }
        .tp-header::before {
          content: '';
          position: absolute;
          inset: -40% -10% auto auto;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, var(--tp-red-glow) 0%, transparent 70%);
          pointer-events: none;
        }
        .tp-header-left {
          display: flex;
          align-items: center;
          gap: 24px;
          z-index: 1;
        }

        /* ---------- LOGO ---------- */
        .tp-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tp-logo-mark {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 10px var(--tp-red-glow));
        }
        .tp-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .tp-logo-text .tp-wordmark {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -0.4px;
          color: #FFFFFF;
        }
        .tp-logo-text .tp-wordmark span {
          color: var(--tp-amber);
        }
        .tp-logo-text .tp-tagline {
          margin-top: 5px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--tp-steel);
        }

        .tp-header-divider {
          width: 1px;
          align-self: stretch;
          background: var(--tp-ink-line);
          margin: 2px 4px;
        }

        .tp-header-heading h1 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 26px;
          letter-spacing: -0.3px;
          color: #FFFFFF;
        }
        .tp-header-heading p {
          margin: 6px 0 0;
          font-size: 13.5px;
          color: var(--tp-steel);
        }

        .tp-visit-btn {
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          margin-top: 2px;
          background: linear-gradient(135deg, var(--tp-red) 0%, var(--tp-red-dark) 100%);
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 8px 20px -6px var(--tp-red-glow);
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .tp-visit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px -6px var(--tp-red-glow);
          background: linear-gradient(135deg, #E8362E 0%, var(--tp-red) 100%);
        }
        .tp-visit-btn:focus-visible {
          outline: 2px solid var(--tp-amber);
          outline-offset: 3px;
        }
        .tp-visit-btn svg { width: 15px; height: 15px; }

        /* ---------- SIGNATURE FLOW GAUGE ---------- */
        .tp-flow-gauge {
          position: relative;
          height: 34px;
          background: var(--tp-ink);
          overflow: hidden;
          border-bottom: 1px solid var(--tp-ink-line);
        }
        .tp-flow-gauge .tp-ticks {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 40px;
        }
        .tp-flow-gauge .tp-ticks span {
          width: 2px;
          height: 10px;
          background: var(--tp-ink-line);
          border-radius: 1px;
          flex-shrink: 0;
        }
        .tp-flow-gauge .tp-sweep {
          position: absolute;
          top: 0;
          left: -35%;
          width: 35%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, var(--tp-red-glow) 35%, var(--tp-amber) 65%, transparent 100%);
          opacity: 0.85;
          animation: tp-sweep 5.5s ease-in-out infinite;
        }
        @keyframes tp-sweep {
          0%   { left: -35%; }
          50%  { left: 100%; }
          100% { left: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tp-flow-gauge .tp-sweep { animation: none; opacity: 0.4; left: 30%; }
        }

        /* ---------- CONTENT ---------- */
        .tp-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
          gap: 22px;
          padding: 30px 40px 40px;
          align-items: start;
        }
        @media (max-width: 880px) {
          .tp-content { grid-template-columns: 1fr; padding: 24px 20px 32px; }
          .tp-header { padding: 24px 20px 28px; }
        }

        .tp-panel {
          background: var(--tp-paper-card);
          border-radius: var(--tp-radius);
          border: 1px solid #E7E4DD;
          border-top: 3px solid var(--tp-red);
          box-shadow: 0 1px 2px rgba(16,17,20,0.04), 0 12px 28px -18px rgba(16,17,20,0.25);
          overflow: hidden;
        }

        .tp-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid #EEEBE5;
        }
        .tp-panel-head h2 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15.5px;
          letter-spacing: -0.1px;
          color: var(--tp-ink);
        }
        .tp-panel-head h2::before {
          content: '';
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--tp-red);
          margin-right: 9px;
          box-shadow: 0 0 0 3px var(--tp-red-glow);
        }

        .tp-count {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: var(--tp-red-dark);
          background: #FDECEA;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .tp-panel-body { padding: 8px; }

        /* ---------- FOOTER ---------- */
        .tp-footer {
          background: var(--tp-ink);
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          border-top: 1px solid var(--tp-ink-line);
        }
        .tp-footer p {
          margin: 0;
          font-size: 12px;
          color: var(--tp-steel);
        }
        .tp-footer-links {
          display: flex;
          gap: 22px;
        }
        .tp-footer-links a {
          font-size: 12.5px;
          font-weight: 500;
          color: #D8D9DD;
          text-decoration: none;
          position: relative;
          transition: color 0.15s ease;
        }
        .tp-footer-links a::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -3px;
          height: 1px;
          background: var(--tp-amber);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
        }
        .tp-footer-links a:hover { color: var(--tp-amber-soft); }
        .tp-footer-links a:hover::after { transform: scaleX(1); }
        .tp-footer-links a:focus-visible { outline: 2px solid var(--tp-amber); outline-offset: 3px; }
      `}</style>

      <header className="tp-header">
        <div className="tp-header-left">
          <div className="tp-logo">
            <svg className="tp-logo-mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Terpel">
              <defs>
                <linearGradient id="tpFlame" x1="8" y1="4" x2="40" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFB81C" />
                  <stop offset="45%" stopColor="#DA251D" />
                  <stop offset="100%" stopColor="#8F0F0C" />
                </linearGradient>
              </defs>
              <path
                d="M24 2C24 2 12 15.5 12 27.5C12 35.5 17.5 42 24 42C30.5 42 36 35.5 36 27.5C36 21 31 15 27.5 11C28.3 15 26.5 17.5 24.5 18.5C24.9 13.5 22 8.5 24 2Z"
                fill="url(#tpFlame)"
              />
              <ellipse cx="24" cy="30" rx="6" ry="8" fill="rgba(255,255,255,0.18)" />
            </svg>
            <div className="tp-logo-text">
              <span className="tp-wordmark">Ter<span>pel</span></span>
              <span className="tp-tagline">A tu servicio</span>
            </div>
          </div>

          <div className="tp-header-divider" />

          <div className="tp-header-heading">
            <h1>Contenido por Estación</h1>
            <p>Gestiona los servicios de cada estación</p>
          </div>
        </div>

        <a
          href="https://www.terpel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tp-visit-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Visitar Terpel
        </a>
      </header>

      <div className="tp-flow-gauge" aria-hidden="true">
        <div className="tp-ticks">
          {Array.from({ length: 48 }).map((_, i) => <span key={i} />)}
        </div>
        <div className="tp-sweep" />
      </div>

      <div className="tp-content">
        <section className="tp-panel">
          <div className="tp-panel-head">
            <h2>Estaciones</h2>
            <span className="tp-count">{stations?.length || 0} estaciones</span>
          </div>
          <div className="tp-panel-body">
            <StationList
              selectedStationId={selectedStationId}
              onSelectStation={setSelectedStationId}
            />
          </div>
        </section>

        <section className="tp-panel">
          <div className="tp-panel-head">
            <h2>Servicios</h2>
          </div>
          <div className="tp-panel-body">
            <ServicesDisplay stationId={selectedStationId} />
          </div>
        </section>
      </div>

      <footer className="tp-footer">
        <p>© 2026 Terpel — Todos los derechos reservados</p>
        <div className="tp-footer-links">
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
