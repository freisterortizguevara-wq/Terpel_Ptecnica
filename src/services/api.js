import { supabase } from './supabase';

// Obtener todas las estaciones
export const fetchStations = async () => {
  const { data, error } = await supabase
    .from('stations')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

// Obtener servicios por estación
export const fetchServicesByStation = async (stationId) => {
  const { data, error } = await supabase
    .from('station_services')
    .select(`
      services (
        service_id,
        name
      )
    `)
    .eq('station_id', stationId);
  
  if (error) throw error;
  
  // Transformar los datos para que coincidan con el formato esperado
  return data.map(item => ({
    idServicio: item.services.service_id,
    nombreServ: item.services.name
  }));
};

// Cambiar estado activo/inactivo
export const toggleStationActive = async (stationId, currentActive) => {
  const { data, error } = await supabase
    .from('stations')
    .update({ 
      is_active: !currentActive,
      updated_at: new Date().toISOString()
    })
    .eq('station_id', stationId)
    .select();
  
  if (error) throw error;
  return data[0];
};