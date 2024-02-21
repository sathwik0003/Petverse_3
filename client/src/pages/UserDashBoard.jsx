import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Details from '../componants/Dashboard/Details';
import Header from '../componants/Header'
import UserOrders from './UserOrders';
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
      <Header/>
      <Box position="relative">
      <Box
        
      >
        {user !== null ? <Details user={user} /> : <p>Loading user details...</p>}
      </Box>
      </Box>
      <UserOrders userid={userid}/>
     
    </Box>
  );
};

export default UserDashboard;
