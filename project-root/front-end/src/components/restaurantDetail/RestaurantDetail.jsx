import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './RestaurantDetail.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Mock function to get coordinates from address
// In a real app, you would use a geocoding service
const getCoordinates = (address) => {
  // Return mock coordinates based on restaurant ID for demo purposes
  // In a real app, you would use a geocoding API to get actual coordinates
  const mockCoordinates = {
    '001': [13.7563, 100.5018], // Bangkok
    '002': [13.7563, 100.5018], // Bangkok
    '003': [13.8416, 100.5177], // Nonthaburi
    '004': [13.8416, 100.5177], // Nonthaburi
    '005': [13.8000, 100.2500], // Nakhon Pathom
    '006': [13.7563, 100.5018], // Bangkok
    '007': [13.7563, 100.5018], // Bangkok
    '008': [13.7563, 100.5018], // Bangkok
    '009': [13.7563, 100.5018], // Bangkok
    '010': [13.7563, 100.5018], // Bangkok
    '011': [13.8622, 100.4158], // Bang Yai
    '012': [13.7563, 100.5018], // Bangkok
  };
  
  return mockCoordinates[address] || [13.7563, 100.5018]; // Default to Bangkok
};

function RestaurantDetail({ restaurant, onClose }) {
  const coordinates = getCoordinates(restaurant.RestaurantID);
  
  // Close modal when Escape key is pressed
  //make details state
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <img 
            src={restaurant.Image} 
            alt={restaurant.RestaurantName} 
            className="restaurant-detail-image" 
          />
          <div className="restaurant-detail-info">
            <h2>{restaurant.RestaurantName}</h2>
            <div className="restaurant-detail-meta">
              <span className="hours">{restaurant.OpeningTime} - {restaurant.ClosingTime}</span>
              <span className="rating">★ {restaurant.Rating}</span>
            </div>
            <p className="address">{restaurant.Address}</p>
          </div>
        </div>
        
        <div className="map-container">
          <MapContainer 
            center={coordinates} 
            zoom={15} 
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates}>
              <Popup>
                {restaurant.RestaurantName} <br />
                {restaurant.Address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        <div className="restaurant-detail-description">
          <h3>About {restaurant.RestaurantName}</h3>
          <p> 
            {restaurant.RestaurantName} is a popular restaurant located in {restaurant.Address}. 
            It is open from {restaurant.OpeningTime} to {restaurant.ClosingTime} and has a rating of {restaurant.Rating} stars.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail; 