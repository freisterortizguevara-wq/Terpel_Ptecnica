# Aplicación de Gestión de Estaciones Terpel

Panel administrativo para la visualización y gestión de estaciones de servicio, desarrollado como parte de la prueba técnica para el equipo de canales digitales de Terpel.

---

## ¿Qué hace esta aplicación?

Permite ver el listado de estaciones, consultar los servicios que ofrece cada una, activarlas o desactivarlas, y visualizar su ubicación en un mapa interactivo. Está pensada para ser clara, rápida y fácil de usar.

---

## Tecnologías utilizadas

- **React 18** para la interfaz de usuario
- **Vite** como herramienta de construcción
- **React Query** para el manejo de estado y caché
- **Supabase** como base de datos en la nube
- **Leaflet** para los mapas
- **React Icons** para los íconos de servicios
- **Vitest** para pruebas unitarias

---

## Requisitos previos

Antes de empezar, necesitas tener instalado:

- Node.js (versión 18 o superior)
- npm (viene con Node)
- Git
- Una cuenta en Supabase (gratuita)

---

## Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/freisterortizguevara-wq/Terpel_Ptecnica.git
cd Terpel_Ptecnica

Instalar Dependencias

npm install
npm install --legacy-peer-deps

Configurar Variables del entorno

VITE_SUPABASE_URL=https://xojutlzjuzxwcmhxtxvt.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_qp-yr6dNHXkmLQpP5N63HA_ZkiqY

Tablas en superbase
Se opta por esta opcion para no manejar json estatico y pensar en ele scalamiento de la app.

CREATE TABLE stations (
  id SERIAL PRIMARY KEY,
  station_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  city TEXT,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8)
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  service_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE station_services (
  id SERIAL PRIMARY KEY,
  station_id TEXT REFERENCES stations(station_id),
  service_id TEXT REFERENCES services(service_id)
);


Insertar Datos

INSERT INTO stations (station_id, name, status, city, address, latitude, longitude) VALUES
  ('001', 'Estación Prueba 1', 'published', 'Bogotá', 'Calle 100 # 15-20', 4.6097, -74.0817),
  ('002', 'Estación Prueba 2', 'draft', 'Medellín', 'Carrera 43 # 8-50', 6.2442, -75.5812),
  ('003', 'Estación Prueba 3', 'published', 'Cali', 'Avenida 5 # 10-30', 3.4516, -76.5320);

INSERT INTO services (service_id, name) VALUES
  ('s1', 'Baño'),
  ('s2', 'Cajeros'),
  ('s3', 'Soat'),
  ('s4', 'Tienda');

INSERT INTO station_services (station_id, service_id) VALUES
  ('001', 's1'), ('001', 's2'),
  ('002', 's1'), ('003', 's3'), ('003', 's1');

  Correr
  npm run dev
  npm run test
  npm run build
  npm run deploy



  https://freisterortizguevara-wq.github.io/Terpel_Ptecnica/




Autor
Desarrollado por Freister Ortiz Guevara como parte del proceso de selección para  deTerpel.