import React, { useState } from 'react';
import Grooming from './grooming';
import './services.css';
import { Link } from 'react-router-dom';
import { Box, Text, Flex, Heading, Image, Card } from '@chakra-ui/react';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
const SaloonDetails = ({ title, image, description, address, phone, userid }) => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Accessing the selected values from state
    console.log('hi')
    console.log(title)
    console.log(selectedService)
    console.log(selectedTimeSlot)
    console.log('Selected Service:', selectedService);
    console.log('Selected Time Slot:', selectedTimeSlot);
    // Redirecting to payment page
    window.location.href = `/salon/payment/${userid}/${title}/${selectedService}/${selectedTimeSlot}`;
  };

  return (
    <>
      <div className="saloon">
        <div className="sald">
          <div className="saloondetails">
            <h1 id="h1">
              <br />
              {title}
            </h1>
          </div>
          <div className="saloondetails">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="salp">
          <div className="saloondetails" style={{fontSize: '1.25rem',
    marginTop: '3rem'}}>
            
            {description}
          </div>
          <Flex justifyContent="space-between" mt="1vw" className='saloondetails'>
                                <Box style={{background: 'rgb(120, 154, 212)',borderRadius: '1rem',padding: '1rem 8rem',display:"flex", alignItems:"center", color:'white', fontWeight:'bold'} }  >
                                    <FaMapMarkerAlt size={20} color="green" style={{ marginRight: '0.5rem' }} />
                                    <Text fontSize="1vw" m="1vw" style={{width: '6rem'}}>{address}</Text>
                                </Box>
                                <Box style={{background: 'rgb(120, 154, 212)',borderRadius: '1rem',padding: '1rem 8rem',display:"flex", alignItems:"center", marginLeft:'1rem'} } >
                                    <FaPhone size={20} color="red" style={{ marginRight: '0.5rem' }} />
                                    <Text fontSize="1vw" m="1vw" style={{width: '6rem'}}>{phone}</Text>
                                </Box>
                            </Flex>
        </div>
      </div>
      <Grooming />
      <form onSubmit={handleSubmit}>
        <div className="saloon1">
          <div className="services">
            <div className="serv" id="serv1">
              <p style={{marginTop: '2rem',
    
    fontWeight: 'bold'}}>Services</p>
              <br />
              <select id="service" name="service" onChange={(e) => setSelectedService(e.target.value)}>
                <option value="Spa Bath">Spa Bath</option>
                <option value="Full Service">Full Service</option>
                <option value="Transfurmation">Transfurmation</option>
              </select>
            </div>
          </div>
          <div className="service">
            <p style={{
    
    fontWeight: 'bold'}}>Book a slot </p>
            <br />
            <select id="timeslot" name="timeslot" onChange={(e) => setSelectedTimeSlot(e.target.value)}>
              <option value="10am - 11am">10am - 11am</option>
              <option value="11am - 12pm">11am - 12pm</option>
              <option value="2pm - 3pm">2pm - 3pm</option>
              <option value="3pm - 4pm">3pm - 4pm</option>
              <option value="4pm - 5pm">4pm - 5pm</option>
            </select>
          </div>
        </div>
        <div className="saloon2">
          <div id="paysal1">
            <h3>
              <b>EXCLUSIVELY PAY LATER FOR SERVICES</b>
            </h3>
            pay 100/- now
          </div>
          <div id="paysal2">
            <button type="submit">
              
                BOOK NOW
              
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SaloonDetails;
