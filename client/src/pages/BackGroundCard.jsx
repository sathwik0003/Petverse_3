import React from 'react'

import UserDashBack from '../assets/account-background.jpeg'

const BackGroundCard = () => {
    const carouselStyle = {
        height: '100vh',
        width: '100%',
        margintop: '20px',
      };
    

  return (
    <img src={UserDashBack} style={carouselStyle}/>
  )
}

export default BackGroundCard