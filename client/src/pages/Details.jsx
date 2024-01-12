import React from 'react';

const Details = ({user}) => {
  const tableStyle = {
    display: 'table',
    margin: '0 auto', // Center the table horizontally
    width: '50%',      // Set a specific width
  };

  const rowStyle = {
    display: 'table-row',
  };


  const cellStyle = {
    display: 'table-cell',
    padding: '0.4rem',
  };

  return (
    <div style={tableStyle}>
      <div style={rowStyle}>
        <div style={cellStyle}>FULLNAME</div>
        <div style={cellStyle}>{user.brandname}</div>
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>USERNAME</div>
        <div style={cellStyle}>{user.brandcode}</div>
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>EMAIL</div>
        <div style={cellStyle}>{user.email}</div>
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>PHONE NUMBER</div>
        <div style={cellStyle}>{user.phoneNumber}</div>
      </div>
    </div>
  );
}

export default Details;