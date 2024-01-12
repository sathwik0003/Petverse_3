import React from 'react';
import './CardLogin.css'; // Import the CSS file

const CardLoginAdmin = (props) => {
  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '105vh',
    backgroundColor: '#0000001a'
  };

  const cardStyle = {
    height: '74vh',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    paddingLeft: '1rem',
    paddingRight: '3rem',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    width: '47%'
  };

  return (
    <div style={cardContainerStyle}>
      <div id="cardStyle" style={cardStyle}>
        {props.children}
      </div>
    </div>
  );
}

export default CardLoginAdmin;
