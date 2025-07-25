import { useState, useEffect } from 'react'
import './components/mainstyles/default.css'
import { SearchBar, RestaurantList, Header } from './components'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = 'http://localhost:4000/api'

  // Fetch all restaurants on initial load
  useEffect(() => {
    fetchRestaurants();
  }, [])

  // Mock restaurant data as fallback (using the structure from SQL file)
  const mockRestaurants = [
    {
      RestaurantID: '001',
      RestaurantName: 'Test Restaurant 01',
      Rating: 4.5,
      OpeningTime: '09:00',
      ClosingTime: '18:00',
      Address: '654 Test Street, Test City, Test Country',
      Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/1200px-Restaurant_N%C3%A4sinneula.jpg'
    },
    {
      RestaurantID: '002',
      RestaurantName: 'Test Restaurant 02',
      Rating: 3.8,
      OpeningTime: '10:00',
      ClosingTime: '22:00',
      Address: '444 Test Street, Test City, Test Country',
      Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/1200px-Restaurant_N%C3%A4sinneula.jpg'
    },
    {
      RestaurantID: '003',
      RestaurantName: 'Test Restaurant 03',
      Rating: 4.2,
      OpeningTime: '11:00',
      ClosingTime: '20:00',
      Address: '888 Test Street, Test City, Test Country',
      Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/1200px-Restaurant_N%C3%A4sinneula.jpg'
    }
  ]

  const fetchRestaurants = async (term = '') => {
    setIsLoading(true);
    
    try {
      let url = `${API_URL}/restaurants`;
      if (term.trim()) {
        url = `${API_URL}/restaurants/search?query=${encodeURIComponent(term)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      
      const data = await response.json();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to fetch restaurants. Using mock data instead.');
      
      // Use mock data as fallback
      if (term.trim()) {
        // Filter mock data if there's a search term
        const filteredResults = mockRestaurants.filter(restaurant => 
          restaurant.RestaurantName.toLowerCase().includes(term.toLowerCase()) || 
          restaurant.Address.toLowerCase().includes(term.toLowerCase())
        );
        setRestaurants(filteredResults);
      } else {
        setRestaurants(mockRestaurants);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchRestaurants(term);
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="content-container">
        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="results-container">
          <RestaurantList 
            restaurants={restaurants} 
            isLoading={isLoading} 
            error={error}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  )
}

export default App
