import React, { useEffect, useState } from 'react';

import SellerDetails from '../componants/DashBoard/SellerDetails';

import { useParams } from 'react-router-dom';
import Navbar from './NavBar';
import { Box } from '@chakra-ui/react';
import SellerOrders from './SellerOrders';

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
    fetch(`https://petverse-3.onrender.com/api/seller/${bc}`)
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
   
    <Box position="relative">
    <Navbar brand={bc}/>
      <Box>
        <Box>
          <h2 style={{display: 'flex',alignItems: 'center',justifyContent: 'center',marginTop: '49px',
    fontWeight: 'bold',
    fontSize: '48px'}}>Account Details</h2>
          <Box>
          <Box style={{display: 'flex',alignItems: 'center',justifyContent: 'center',background:'beige',margin: '5% 29%',
    height: '19rem'}}>
          {user !== null ? <SellerDetails user={user} style={{    width: '73%',
    height: '20rem'}}/> : <p>Loading user details...</p>}
          </Box>
          </Box>
        </Box>
      </Box>
    <SellerOrders bc={bc}/>
    </Box>
    </>
  );
};

export default BrandDashBoard;
