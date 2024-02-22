import React,{useState} from 'react';
// import { logout,signInUser } from './authSlice';
// import { useParams } from 'react-router-dom';
import Navbar from './NavBar';
import './Logout.css';

  const Logout = () => {
    const [showConfirmation, setShowConfirmation] = useState(true);
  
    const handleLogout = () => {
      window.location.href='/'
      console.log('Logging out...');
      setShowConfirmation(false);
    };
  
    const handleCancel = () => {
      setShowConfirmation(false);
    };
  
    return (
      <div>
       
  <Navbar/>
        {showConfirmation && (
          <div className="border-box">
            <div className="box-content">
              <p>Are you sure you want to logout ?</p>
              <button onClick={handleLogout} >Yes</button>
              <button onClick={handleCancel} >Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Logout;