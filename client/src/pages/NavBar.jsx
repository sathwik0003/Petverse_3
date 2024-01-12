import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logoo.png'
//import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import  './navbar.css'

const Navbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const bc=props.brand;

  return (

    <div className='navDiv'>
    <nav className='navbar'>
      <div className='navcontainer'>
        <div className='logo'>
          <img src={Logo} className='navLogo'/>
        </div>
        <div className='icon' onClick={handleShowNavbar}>
        <FontAwesomeIcon icon={faBars} />
        </div>
       

        
        <div className={`navElements  ${showNavbar ? 'active':''}`}>
          <ul>
          <li>
              <NavLink to={`/sell/products/${bc}`}>Products</NavLink>
          </li>
            <li>
              <NavLink to={`/add/${bc}`}>Add Product</NavLink>
            </li>
            
            <li>
              <NavLink to={`/sell/account/${bc}`}>Account</NavLink>
            </li>
            <li>
              <NavLink to={`/logout/${bc}`}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar