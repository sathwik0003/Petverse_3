import React from 'react';
import './CardInfo.css';
import { Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const CardInfo = ({ complaints }) => {
  return (
    <>
      {complaints.map((complaint) => (
        <div key={complaint.id} className="ucard-container">
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
            <p><b>Products: </b>{complaint.products}</p>

          </div>
          <div className="ubgrp">
            <div>
              <Button className="ucm">
                <FontAwesomeIcon icon={faEnvelope} /> Send Mail
              </Button>
            </div>
            <div>
              <Button className="ucd">
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
