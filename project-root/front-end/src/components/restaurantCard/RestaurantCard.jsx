import { useState } from 'react';
import RestaurantDetail from '../restaurantDetail/RestaurantDetail';
import './RestaurantCard.css';

function RestaurantCard({ restaurant }) {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleViewDetails = () => {
    setShowDetails(true);
  };
  
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div className="restaurant-card">
        <div className="restaurant-image" onClick={handleViewDetails}>
          <img src={restaurant.Image} alt={restaurant.RestaurantName} />
        </div>
        <div className="restaurant-info">
          <h2>{restaurant.RestaurantName}</h2>
          <div className="restaurant-meta">
            <span className="hours">{restaurant.OpeningTime} - {restaurant.ClosingTime}</span>
            <span className="rating">★ {restaurant.Rating}</span>
          </div>
          <p className="address">{restaurant.Address}</p>
          <button className="view-details" onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
      
      {showDetails && (
        <RestaurantDetail 
          restaurant={restaurant} 
          onClose={handleCloseDetails} 
        />
      )}
    </>
  );
}

export default RestaurantCard; 