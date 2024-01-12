import React from 'react';
import { useDispatch } from 'react-redux';
import BackGroundCard from './BackGroundCard';
import { useSelector } from 'react-redux';
import { logout,signInUser } from './authSlice';
import { useParams } from 'react-router-dom';
import Navbar from './NavBar';

const Logout = () => {
  const dispatch=useDispatch()
  const {bc}=useParams();

  

  const logoutHandle=()=>{
    dispatch(logout)
    window.location.href='/'

  }
  const insideHandle=()=>{
    window.location.href=`/add/${bc}`
  }

  return (
    <>
    <Navbar bc={bc}/>
   
    <div style={{margin: '16rem 37rem',
    border: '1px solid black',
    padding: '2rem 2rem',
    }}>
    <div style={{padding:'1rem'}}>
      Are you sure you want to logout?
    </div>
    <div style={{display:'flex',alignItems:'center',margin: '1rem 4rem'}}>
    <button onClick={insideHandle}>Cancel</button>
      <button onClick={logoutHandle}>Logout</button>
      </div>

      </div>
    
    </>
  );
};

export default Logout;
