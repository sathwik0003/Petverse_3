import React, { useEffect, useState } from 'react';
import { Box, Button, Divider } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import Details from '../componants/DashBoard/Details'
import Details2 from '../componants/DashBoard/Details2';
import Header from '../componants/Header';
import UserOrders from './UserOrders';

const UserDashboard = () => {
  const { userid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://petverse-3.onrender.com/api/users/${userid}`);
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
          <h2 style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '49px',
            fontWeight: 'bold',
            fontSize: '48px'
          }}>Account Details</h2>
          <Box>
            <Box style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'beige', margin: '5% 29%',
              height: '19rem'
            }}>
              {user !== null ? <Details2 user={user} style={{
                width: '73%',
                height: '20rem'
              }} /> : <p>Loading user details...</p>}
            </Box>
          </Box>
        </Box>
      </Box>
      <UserOrders userid={userid} />
    </Box>
  );
};

export default UserDashboard;
