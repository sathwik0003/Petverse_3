import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Image } from '@chakra-ui/react';
import SidebarAdmin from '../componants/Admin/SideBarAdmin' // Corrected import path
import '../componants/UI/CardInfo2.css'
import { useParams } from 'react-router-dom';
const AdminBookings = () => { // Changed component name to start with uppercase
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const {title}=useParams()

  const fetchServices = async () => {
    try {
      const response = await fetch(`https://petverse-3.onrender.com/api/booking?title=${title}`);
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
      <SidebarAdmin />
      <h3 style={{marginLeft: '39vw',
    fontWeight: 'bold'}}>Services of {title}</h3>
      {services.map((service) => (
        <div key={uuid()} className="ascard-container">
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
            <p><b>Service Type: </b>{service.service}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminBookings; // Corrected component export
