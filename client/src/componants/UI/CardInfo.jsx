import React from 'react';
import './CardInfo.css';  // Import a CSS file for styling
import bulldog from '../../assets/bulldog.jpg'
import { Image } from '@chakra-ui/react'

const CardInfo = () => {
    return (
        <div className="ucard-container">
            <div className="uprofile-pic">
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src={bulldog}
                    alt='Dan Abramov'
                />
            </div>
            <div className="uuser-content">
                {/* Add your user content here */}
                <h2>User Name</h2>
                <p>User Bio or other content</p>
            </div>
        </div>
    );
}

export default CardInfo;
