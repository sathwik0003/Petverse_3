import React, { useEffect, useState } from 'react';
import DashBoardButton from '../componants/UI/DashBoardButton';
import Details from '../componants/DashBoard/Details';
import BackGroundCard from '../componants/DashBoard/BackGroundCard';
import { AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserDashBoard = () => {
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  console.log(userid)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${userid}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userid]);
  

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

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

  const ordersButtonStyle = {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
  };

  return (
    <div style={dashboardStyle}>
      <BackGroundCard />
      <div style={backButtonStyle}>
        <button><Link to={`/user/main/${userid}`} style={{textDecoration:'none', color:'white'}}>Back</Link></button>
      </div>
      <div className="details" style={detailsStyle}>
        {user !== null ? (
          <Details user={user} />
        ) : (
          <p>Loading user details...</p>
        )}
        
      </div>
      <div style={ordersButtonStyle}>
        <button><Link to={`/user/orders/${userid}`} style={{textDecoration:'none', color:'white'}}>Orders</Link></button>
      </div>
    </div>
  );
};

export default UserDashBoard;