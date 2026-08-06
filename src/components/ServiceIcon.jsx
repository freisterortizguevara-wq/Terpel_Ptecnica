import { FaToilet, FaMoneyBillWave, FaCar, FaStore } from 'react-icons/fa';

// Mapa de nombres de servicios a íconos
const iconMap = {
  'Baño': <FaToilet size={30} color="#FF0F00" />,
  'Cajeros': <FaMoneyBillWave size={30} color="#FF0F00" />,
  'Soat': <FaCar size={30} color="#FF0F00" />,
  'Tienda': <FaStore size={30} color="#FF0F00" />
};

export const ServiceIcon = ({ serviceName }) => {
  return (
    <div className="service-icon-container">
      {iconMap[serviceName] || <span>❓</span>}
      <span className="service-name">{serviceName}</span>
    </div>
  );
};