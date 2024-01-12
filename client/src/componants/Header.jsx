
import { useState } from 'react';
import './Header.css';
import logoo from '../assets/Petverse_logo.jpeg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faHeart, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../pages/authSlice';
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch=useDispatch()

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  };
  const handleOutsideClick = (event) => {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  const sendData = (e) => {
    // Assuming fetch is replaced by your actual fetch function
    fetch(`http://localhost:3001/search1/${e}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: e.value })
    })
      .then(res => res.json())
      .then(data => {
        let payload = data.payload;
        // Display the modal when results are available
        const modal = document.getElementById("myModal");
        modal.style.display = "block";

        // Assuming searchResults is a div element
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';

        if (payload.length < 1) {
          searchResults.innerHTML = '<p>Nothing found</p>';
          return;
        }

        payload.forEach((item, index) => {
          if (index > 0) searchResults.innerHTML += '<hr>';
          searchResults.innerHTML += (
            <form action="/search1" method="POST">
              <input type="hidden" name="hellomoto" value={item.name} />
              <button type="submit" id='btnn' className='custom-button'>
                <p>{item.name}</p>
              </button>
            </form>
          );
        });
      })
      .catch(error => {
        console.error("Error:", error.message);
        // Handle the error gracefully, e.g., display an error message
      });
  };




  const { userid } = useParams();


  return (
    <>
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="logo">
        <Link to={`/user/main/${userid}`}>
        <img src={logoo} alt="Logo" />
        </Link>
        </div>
        <div className="user-actions">
          <div className="user-action-group">

          <button className="user-button">
              <Link to={`/user/products/${userid}/CAT`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Cat</span>
              </Link>
            </button>
          </div>

          <div className="user-action-group">

          <button className="user-button">
              <Link to={`/user/products/${userid}/DOG`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Dog</span>
              </Link>
            </button>
          </div>

          <div className="user-action-group">

          <button className="user-button">
    <Link to={`/user/salon/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
      <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Salon</span>
    </Link>
         </button>
        </div>
          
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..."  onChange={(e) => sendData(e.target.value)}/>
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
        <div id="myModal" className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <section id="searchResults">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {results.length > 0 ? (
                <ul>
                  {results.map((item, index) => (
                    <li key={index}>
                      <form action="/search1" method="POST">
                        <input type="hidden" name="hellomoto" value={item.name} />
                        <button type="submit" id="btnn" className='custom-button'>
                          <p>{item.name}</p>
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{!loading && !error && 'No results found'}</p>
              )}
            </section>

             
            </div>
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
              <Link to={`/user/products/${userid}/DOG`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white',padding: '2rem' }}>Dog</span>
              </Link>
            </button>

           
          </div>

          <button className="user-button">
            <span className="label">
            <Link to={`/user/salon/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Salon
              </Link>
            </span>
          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faUser} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>
              <Link to={`/User/DashBoard/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Account
              </Link>
            </span>

          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>
            <Link to={`/user/cart/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                cart
              </Link>
            </span>
          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faHeart} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Wishlist</span>
          </button>
          <button className="user-button">Logout</button>
        </>}
        
        <div className="user-actions">
          <button className="user-button">
            <FontAwesomeIcon icon={faUser} />
            <span className="label">
              <Link to={`/User/DashBoard/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Account
              </Link>
            </span>

          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="label">
            <Link to={`/user/cart/${userid}`} className='custom-link' style={{ textDecoration: 'none', color: 'white' }}>
                Cart
              </Link>
            </span>
          </button>
          <button className="user-button" >
            <FontAwesomeIcon icon={faHeart} />
            <Link to={`/user/wishlist/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Wishlist</span >
              </Link>
            
          </button>
          <button className="user-button" onClick={() => {
  dispatch(logout);
  window.location.href = '/';
}}>
  Logout
</button>

        </div>
      </header>
    </>
  );
};

export default Header;