import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Image } from '@chakra-ui/react';
import Header from '../componants/Header';
import '../componants/UI/CardInfo2.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UserServices = () => { // Changed component name to start with uppercase
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
const {userid}=useParams();
  const fetchServices = async () => {
    try {
        console.log('hi')
      const response = await fetch(`http://localhost:3002/api/service?username=${userid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Handle error state or display an error message to the user
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      <Header />
      <h3 style={{fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem'}}>Your Services</h3>
      {services.map((service) => (
        <div key={uuid()} className="ascard-container" style={{marginLeft: '17vw',
    marginRight: '14rem'}}>
          <div className="asprofile-pic">
            <Image
              borderRadius="full"
              boxSize="135px"
              src={`https://ui-avatars.com/api/?name=${service.userid}`} // Corrected template string syntax
              alt="User Name"
            />
          </div>
          <div className="asuser-content">
            <h2>{service.userid}</h2>
            <p><b>Salon: </b>{service.title}</p>
            <p><b>Slot: </b>{service.slot}</p>
            <p><b>Date: </b>{service.dateCreated}</p>
            <p><b>Service Type: </b>{service.service}</p>
          </div>
        </div>
      ))}
      <Link to={`/User/Dashboard/${userid}`}>Back to Dashboard</Link>
    </>
  );
};

export default UserServices; 