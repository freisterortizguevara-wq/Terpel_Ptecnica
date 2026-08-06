import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configurar íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const StationMap = ({ station }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Limpiar mapa anterior
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (!station || !mapContainerRef.current) return;

    const { latitude, longitude, name, city, address } = station;

    // Si no hay coordenadas, mostrar mapa de Colombia
    if (!latitude || !longitude) {
      const map = L.map(mapContainerRef.current, {
        center: [4.5709, -74.2973],
        zoom: 5.5,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 4,
      }).addTo(map);

      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 300);
      
      return () => { 
        if (mapRef.current) { 
          mapRef.current.remove(); 
          mapRef.current = null; 
        } 
      };
    }

    // ========== MAPA CON UBICACIÓN REAL ==========
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    });

    // Mapa político de Colombia con estilo limpio
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19,
      minZoom: 4,
    }).addTo(map);

    // Círculo de enfoque
    L.circle([latitude, longitude], {
      color: '#E63946',
      fillColor: '#E63946',
      fillOpacity: 0.08,
      radius: 80,
      weight: 2,
      opacity: 0.4,
    }).addTo(map);

    // Marcador personalizado de Terpel
    const terpelIcon = L.divIcon({
      className: 'terpel-marker',
      html: `
        <div style="
          background: #E63946;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 3px 16px rgba(230, 57, 70, 0.5);
          animation: markerBounce 2s ease-in-out infinite;
        ">
          <span style="transform: rotate(45deg);">⛽</span>
        </div>
        <style>
          @keyframes markerBounce {
            0%, 100% { transform: rotate(-45deg) translateY(0); }
            50% { transform: rotate(-45deg) translateY(-6px); }
          }
        </style>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });

    // ========== POPUP CON CIUDAD Y DIRECCIÓN ==========
    const popupContent = `
      <div style="padding: 8px 12px; min-width: 160px; max-width: 240px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <span style="font-size: 22px;">⛽</span>
          <div>
            <strong style="font-size: 15px; color: #212529; display: block;">${name}</strong>
            <span style="font-size: 11px; background: #E8F5E9; color: #2E7D32; padding: 1px 10px; border-radius: 20px; display: inline-block; margin-top: 2px;">
              ● Activa
            </span>
          </div>
        </div>
        <div style="border-top: 1px solid #e9ecef; padding-top: 8px; margin-top: 4px;">
          ${city ? `
            <div style="display: flex; align-items: center; gap: 6px; color: #495057; font-size: 13px; margin-bottom: 2px;">
              <span style="font-size: 14px;">📍</span>
              <span><strong>${city}</strong></span>
            </div>
          ` : ''}
          ${address ? `
            <div style="display: flex; align-items: center; gap: 6px; color: #6C757D; font-size: 12px; padding-left: 2px;">
              <span style="font-size: 12px;">🏠</span>
              <span>${address}</span>
            </div>
          ` : ''}
          <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #f1f3f5; font-size: 10px; color: #adb5bd; text-align: center;">
            🗺️ Haz clic para ver en Google Maps
          </div>
        </div>
      </div>
    `;

    const marker = L.marker([latitude, longitude], { icon: terpelIcon })
      .addTo(map)
      .bindPopup(popupContent, {
        maxWidth: 280,
        className: 'terpel-popup-custom',
      });

    // ========== ABRIR POPUP AUTOMÁTICAMENTE ==========
    setTimeout(() => {
      marker.openPopup();
    }, 500);

    // Cerrar popup después de 6 segundos
    setTimeout(() => {
      map.closePopup();
    }, 6000);

    // ========== EVENTO: ABRIR GOOGLE MAPS AL HACER CLIC ==========
    marker.on('popupopen', () => {
      const popupElement = document.querySelector('.terpel-popup-custom .leaflet-popup-content');
      if (popupElement) {
        popupElement.style.cursor = 'pointer';
        popupElement.addEventListener('click', () => {
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          window.open(googleMapsUrl, '_blank');
        });
      }
    });

    mapRef.current = map;

    // Redimensionar mapa después de renderizar
    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [station]);

  // ========== RENDER ==========
  if (!station) {
    return (
      <div className="map-placeholder">
        <span className="icon">🗺️</span>
        <p>Selecciona una estación</p>
        <span className="subtext">para ver su ubicación</span>
      </div>
    );
  }

  if (!station.latitude || !station.longitude) {
    return (
      <div className="map-placeholder">
        <span className="icon">📍</span>
        <p>Ubicación no disponible</p>
        <span className="subtext">Esta estación no tiene coordenadas</span>
      </div>
    );
  }

  return (
    <div className="station-map-wrapper">
      <div ref={mapContainerRef} className="station-map-leaflet" />
      <div className="map-overlay-info">
        <span className="map-overlay-icon">⛽</span>
        <span className="map-overlay-name">{station.name}</span>
        {station.city && <span className="map-overlay-city">• {station.city}</span>}
      </div>
    </div>
  );
};