import React from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const SellerDetails = ({ user }) => {
  const tableStyle = {
    display: 'table',
    margin: '0 auto', // Center the table horizontally
    width: '63%',    // Set a specific width
  };

  const rowStyle = {
    display: 'table-row',
  };

  const cellStyle = {
    display: 'table-cell',
    padding: '0.8rem',
    fontWeight: 'bold',
  };

  const iconStyle = {
    marginRight: '0.5rem',
    verticalAlign: 'middle',
  };

  return (
    <div style={tableStyle}>
      <div style={rowStyle}>
        <div style={cellStyle}>
          <FaUser style={iconStyle} /> BRANDNAME
        </div>
        <div style={cellStyle}>{user.brandname}</div>
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>
          <FaUser style={iconStyle} /> BRANDCODE
        </div>
        <div style={cellStyle}>{user.brandcode}</div>
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>
          <FaEnvelope style={iconStyle} /> EMAIL
        </div>
        <div style={cellStyle}>{user.email}</div>
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>
          <FaPhone style={iconStyle} /> PHONE NUMBER
        </div>
        <div style={cellStyle}>{user.phoneNumber}</div>
      </div>
    </div>
  );
};

export default SellerDetails;
