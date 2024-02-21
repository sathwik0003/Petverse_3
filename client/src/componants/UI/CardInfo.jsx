import React from 'react';
import './CardInfo.css';
import { Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const CardInfo = ({ complaints }) => {
  const handleSendMail = async (username, complaint) => {
    try {
      const response = await fetch('http://localhost:3002/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          complaint: complaint,
        }),
      });
      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  const handleMarkDone = async (id) => {
    try {
      await fetch(`http://localhost:3002/api/complaints/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error marking complaint as done:', error);
    }
  };

  return (
    <>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="ucard-container">
          <div className="uprofile-pic">
            <Image
              borderRadius="full"
              boxSize="135px"
              src={`https://ui-avatars.com/api/?name=${complaint.username}`}
              alt="User Name"
            />
          </div>
          <div className="uuser-content">
            <h2>{complaint.username}</h2>
            <p><b>complaints: </b>{complaint.complaint}</p>
            <p><b>suggestions: </b>{complaint.suggestions}</p>
          </div>
          <div className="ubgrp">
            <div>
              <Button className="ucm" onClick={() => handleSendMail(complaint.username, complaint.complaint)}>
                <FontAwesomeIcon icon={faEnvelope} /> Send Mail
              </Button>
            </div>
            <div>
              <Button className="ucd" onClick={() => handleMarkDone(complaint._id)}>
                <FontAwesomeIcon icon={faCheck} /> Mark Done
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardInfo;
