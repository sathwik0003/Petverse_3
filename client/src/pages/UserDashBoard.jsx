import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Details from '../componants/Dashboard/Details';
import Header from '../componants/Header';
import { useParams } from 'react-router-dom';
const UserDashboard = () => {
  const { userid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/users/${userid}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userid]);

  return (
    <Box position="relative">
      <Header />
      <Box>
        <Box>
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '49px', fontWeight: 'bold', fontSize: '48px' }}>Account Details</h2>
          <Box>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'beige', margin: '5% 29%', height: '19rem' }}>
              {user !== null ? <Details user={user} style={{ width: '73%', height: '20rem' }} /> : <p>Loading user details...</p>}
            </Box>
          </Box>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Link to={`/user/orders/${userid}`}>
            <Button colorScheme="blue" mr="4" style={buttonStyle}>
              View Orders
            </Button>
          </Link>
          <Link to={`/user/services/${userid}`}>
            <Button colorScheme="green" style={buttonStyle}>
              View Services
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const buttonStyle = {
  background:'orange',
  transition: 'transform 0.3s', // Transition the transform property over 0.3 seconds
  '&:hover': {
    transform: 'scale(1.1)', // Scale the button by 10% on hover
  },
};

export default UserDashboard;

