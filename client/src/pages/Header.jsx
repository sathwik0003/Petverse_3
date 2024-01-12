// Header.jsx
import { useState } from 'react';
import './Header.css';
import logoo from '../assets/logoo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faHeart, faBars} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="logo">
        <img src={logoo} alt="Logo" />
      </div>
      <div className="user-actions">
  <div className="user-action-group">

    <select id="dogsDropdown" className="user-dropdown">
    <option value="Dogs">Dogs</option>
      <option value="Food">Food</option>
      <option value="Grooming">Grooming</option>
      <option value="Beds">Beds</option>
      <option value="Toys">Toys</option>
      <option value="Accessories">Accessories</option>
      <option value="Clothing">Clothing</option>
     
    </select>
  </div>

  <div className="user-action-group">
   
    <select id="catsDropdown" className="user-dropdown">
    <option value="Cats">Cat</option>
    <option value="Food">Food</option>
      <option value="Grooming">Grooming</option>
      <option value="Beds">Beds</option>
      <option value="Toys">Toys</option>
      <option value="Accessories">Accessories</option>
      <option value="Clothing">Clothing</option>
    </select>
  </div>

  <div className="user-action-group">
   
  <button className="user-button">
          
        <Link to='/salon' style={{textDecoration:'none',color:'white'}}><span className="label" style={{textDecoration:'none',color:'white'}}>Saloon</span></Link>  
        </button> 
  </div>
</div>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
      </div>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {isMenuOpen &&  <>
        <div className="user-action-group">

<select id="dogsDropdown" className="user-dropdown">
<option value="Dogs">Dogs</option>
      <option value="Food">Food</option>
      <option value="Grooming">Grooming</option>
      <option value="Beds">Beds</option>
      <option value="Toys">Toys</option>
      <option value="Accessories">Accessories</option>
      <option value="Clothing">Clothing</option>
</select>
</div>

<div className="user-action-group">

<select id="catsDropdown" className="user-dropdown">
<option value="Cats">Cat</option>
    <option value="Food">Food</option>
      <option value="Grooming">Grooming</option>
      <option value="Beds">Beds</option>
      <option value="Toys">Toys</option>
      <option value="Accessories">Accessories</option>
      <option value="Clothing">Clothing</option>
</select>
</div>

<button className="user-button">
          
          <span className="label">Saloon</span>
        </button> 
      <button className="user-button">
          <FontAwesomeIcon icon={faUser} />
          <span className="label">Account</span>
        </button> 
        <button className="user-button">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="label">Cart</span>
        </button>
        <button className="user-button">
          <FontAwesomeIcon icon={faHeart} />
          <span className="label">Wishlist</span>
        </button>
        <button className="user-button">Logout</button>
        </>}
      {/* <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-item">Home</div>
        <div className="menu-item">Categories</div>
        <div className="menu-item">About Us</div>
        <div className="menu-item">Contact</div>
        <div className="dropdown">
          <button className="dropbtn">
            Cats <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="dropdown-content">
            <a href="#">Food</a>
            <a href="#">Clothing</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Dogs <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="dropdown-content">
            <a href="#">Food</a>
            <a href="#">Clothing</a>
          </div>
        </div>
      </div> */}
      <div className="user-actions">
        <button className="user-button">
          <FontAwesomeIcon icon={faUser} />
          <span className="label">Account</span>
        </button>
        <button className="user-button">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="label">Cart</span>
        </button>
        <button className="user-button">
          <FontAwesomeIcon icon={faHeart} />
          <span className="label">Wishlist</span>
        </button>
        <button className="user-button">Logout</button>
      </div>
    </header>
    </>
  );
};

export default Header;