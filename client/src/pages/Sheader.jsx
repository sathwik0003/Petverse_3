// Header.js
import React from 'react';

import grooming from '../assets/grooming.png'


const Sheader = () => {
  return (
    <div className="header2" style={{ marginTop: '45px' }}>
      <div className="text-box2">
        <div className="img-wrap img-logo">
          <img src={grooming} style={{ marginTop: '-45px' }} />
        </div>
      </div>
     
    </div>
  );
};

export default Sheader;
