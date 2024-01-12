import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Slider1 from '../assets/Slider1.jpg';
import Slider2 from '../assets/Slider2.jpg';
import Slider3 from '../assets/Slider3.jpg';
import Blurrycard from './Blurrycard';


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSellerButtonClick = () => {
    window.location.href = '/Sell/Signup';
  };
  const handleUserButtonClick = () => {
    window.location.href = '/user/main';
  };
  const handleAdminButtonClick = () => {
    window.location.href = '/admin/login';
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselStyle = {
    height: '100vh',
    width: '100%',
    margintop: '20px',
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          src={Slider1}
          style={carouselStyle}
          alt="First slide"
        />
        <Blurrycard slidecontent={{ 
        h3:'ARE YOU HERE TO BUY',
        desc:'HELLO CUSTOMER CLICK THIS TO PROCEED.',
        button:(
          <button onClick={handleUserButtonClick} style={{margin:'0px',background:'green'}}>
                USER
              </button>
        )}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={Slider2}
          style={carouselStyle}
          alt="Second slide"
        />
       <Blurrycard slidecontent={{ 
        h3:'ARE YOU HERE TO SELL',
        desc:'HELLO SELLER CLICK HERE TO SELL',
        button: (
              <button onClick={handleSellerButtonClick} style={{margin:'0px',background:'green'}}>
                SELLER
              </button>
            ),
        }}/>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={Slider3}
          style={carouselStyle}
          alt="Third slide"
        />
        <Blurrycard slidecontent={{ 
        h3:'HEY ADMIN',
        desc:' MANAGE EVERTHING',
        button: (
              <button onClick={handleAdminButtonClick} style={{margin:'0px',background:'green'}}>
                ADMIN
              </button>
            )}}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
