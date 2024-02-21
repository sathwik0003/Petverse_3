import React from 'react';
import { Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Ticket = () => {
 
  return (
    <>
        <div  className="ucard-container">
          <div className="uprofile-pic">
            <Image
              borderRadius="full"
              boxSize="135px"
              src={`https://ui-avatars.com/api/?name=sathwik`}
              alt="User Name"
            />
          </div>
          <div className="uuser-content">
            <h2>hi</h2>
            <p><b>hi</b></p>
            <p><b>hi</b></p>
          </div>
        </div>
    </>
  );
};

export default Ticket;
