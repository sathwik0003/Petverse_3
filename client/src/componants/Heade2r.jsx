import { useState } from 'react';
import './Header.css';
import logoo from '../assets/Petverse_logo.jpeg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser,  faBars } from '@fortawesome/free-solid-svg-icons';
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
        <Link to='/user/main'>
        <img src={logoo} alt="Logo" />
        </Link>
          
        </div>
        <div className="user-actions">
        <div className="user-action-group">
            <button className="user-button">
              <Link to='/user/products/undefined/CAT' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Cat</span>
              </Link>
            </button>
          </div>
          <div className="user-action-group">
            <button className="user-button">
              <Link to='/user/products/undefined/DOG' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Dog</span>
              </Link>
            </button>
          </div>
         
          <div className="user-action-group">
            <button className="user-button">
              <Link to='/user/login' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Salon</span>
              </Link>
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
        {isMenuOpen && <>
          <div className="user-action-group">
          <button className="user-button">
              <Link to='/user/products/CAT' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Cat</span>
              </Link>
            </button>
          </div>
          <div className="user-action-group">
          <button className="user-button">
              <Link to='/user/products/DOG' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Dog</span>
              </Link>
            </button>
            
          </div>
          <div className="user-action-group">
          <button className="user-button">
              <Link to='/user/salon' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Salon</span>
              </Link>
            </button>
            
          </div>
        
         
        </>}
        <div className="user-actions">
          <button className="user-button">
            <FontAwesomeIcon icon={faUser} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>
              <Link to='/user/login' style={{ textDecoration: 'none', color: 'white' }}>
                Login/Signup
              </Link>
            </span>
          </button>
         
          
        </div>
      </header>
     
    </>
  );
};

export default Header;
