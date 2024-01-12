import React from 'react'

const Blurrycard = (props) => {
    const cardStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backdropFilter: 'blur(2px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '5px',
        textAlign: 'center',
      };
    
      const buttonStyle = {
        background: 'green',
        border: '2px solid white',
        padding: '10px 20px',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
      };
    
      return (
        <div style={cardStyle}>
          <h3>{props.slidecontent.h3}</h3>
          <p>{props.slidecontent.desc}</p>
          <button style={buttonStyle}>{props.slidecontent.button}</button>
        </div>
      );
}

export default Blurrycard