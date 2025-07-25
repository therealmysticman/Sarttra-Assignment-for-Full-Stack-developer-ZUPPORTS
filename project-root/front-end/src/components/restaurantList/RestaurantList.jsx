import RestaurantCard from '../restaurantCard/RestaurantCard';
import './RestaurantList.css';

function RestaurantList({ restaurants, isLoading, error, searchTerm }) {
  if (isLoading) {
    return <div className="loading">Searching for restaurants...</div>;
  }

  if (restaurants && restaurants.length > 0) {
    return (
      <div className="restaurant-list-grid">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.RestaurantID} restaurant={restaurant} />
        ))}
      </div>
    );
  }

  if (searchTerm && searchTerm !== '') {
    return <div className="no-results">No restaurants found matching "{searchTerm}"</div>;
  }

  return (
    <div className="default-state">
      <p>To start searching, enter a restaurant name or location</p>
    </div>
  );
}

export default RestaurantList; 