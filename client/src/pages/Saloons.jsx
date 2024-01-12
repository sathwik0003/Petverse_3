import React, { useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import { Card } from 'react-bootstrap';
import Header from './Header';
import gro from '../assets/grooming.jpg';



const Saloons = (props) => {

  
  // useEffect(() => {
  //   document.addEventListener("mousemove", parallax);
    
  //   return () => {
  //     document.removeEventListener("mousemove", parallax);
  //   };
  // }, []);

  // function parallax(e) {
  //   console.log("Mouse move event");
  //   document.querySelectorAll('.img').forEach(function (move) {
  //     var moving_value = move.getAttribute("data-value");
  //     console.log("Moving value:", moving_value);
  //     var x = e.clientX * moving_value;
  //     var y = e.clientY * moving_value;
  //     console.log("X:", x, "Y:", y);
  
  //     move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
  //   });
  // }

  const openHandler=()=>{
    const opensalon={
       id:props.id,
       name:props.name,
       address:props.address,
       phone:props.phone,
       description:props.description
    }
  }

 

  return (
    <>
     
      <div style={{
        display: 'flex',
        margin: '2rem',
        padding: '2rem',
        border: '0.1rem solid black'
      }}>
        <div style={{
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          willChange: 'transform'
        }}>
       
        <Image src={gro} width="20vw" height="20vw" style={{ position: 'relative',transition:'transform 0.1s' }} className='img' data-value="0.05" />

        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '1rem',
          justifyContent: 'center'
        }}>
          <Card.Title style={{ fontSize: '2vw', marginTop: '3vw' }}>{props.name}</Card.Title>
          <Card.Text style={{ fontSize: '1vw', marginTop: '1vw' }}><b>Address:</b>
            {props.address}
          </Card.Text>
          <Card.Text style={{ fontSize: '1vw', marginTop: '0.5vw' }}>
            <b>Phone:</b> {props.phone}
          </Card.Text>
          <p>{props.description}</p>
         <SalonForm id={props.id} ></SalonForm>
        </div>
      
      </div>
    </>
  )
}

export default Saloons;

