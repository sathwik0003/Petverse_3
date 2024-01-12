import React, { useEffect, useState } from 'react';
import DashBoardButton from './DashBoardButton';
import Details from './Details';
import BackGroundCard from './BackGroundCard';
import { AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Navbar from './NavBar';


const BrandDashBoard = () => {
  const { bc } = useParams();
 
  const [user, setUserDetails] = useState(null);
  

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  useEffect(() => {
    // Make a GET request to fetch seller details based on brandcode
    fetch(`http://localhost:3001/api/seller/${bc}`)
      .then(response => response.json())
      .then(data => setUserDetails(data))
      .catch(error => console.error(`Error fetching seller details for ${bc}:`, error));
  }, [bc]);

  const isMobile = screenWidth <= 500;

  const dashboardStyle = {
    position: 'relative',
  };

  const detailsStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: isMobile ? '0' : '4rem',
    borderRadius: '1rem',
    border: '0.8px solid black',
  };

  const buttondash = {
    paddingLeft: '7rem',
  };

  const backButtonStyle = {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
  };

 

  return (
    <>
    <Navbar brand={bc}/>
    <div style={dashboardStyle}>
      <BackGroundCard />
      <div style={backButtonStyle}>
        <button>Back</button>
      </div>
      <div className="details" style={detailsStyle}>
        {user !== null ? (
          <Details user={user} />
        ) : (
          <p>Loading user details...</p>
        )}
        
      </div>
      
    </div>
    </>
  );
};

export default BrandDashBoard;