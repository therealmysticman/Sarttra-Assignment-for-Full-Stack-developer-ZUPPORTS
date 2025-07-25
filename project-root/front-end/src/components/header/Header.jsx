import './Header.css';
import FoodIcon from '../../assets/image/food_okosama_lunch.png';

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-logo">
          <img src={FoodIcon} alt="Restaurant icon" className="header-icon" />
          <div className="header-text">
            <h1>Restaurant Search Project</h1>
            <p>Find the best restaurants near you</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 