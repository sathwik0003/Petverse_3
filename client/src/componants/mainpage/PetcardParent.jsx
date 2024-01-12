import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import petparent1 from '../../assets/petparent1.jpeg.jpg';
import petparent2 from '../../assets/petparent2.jpeg.jpg';
import petparent3 from '../../assets/petparent3.jpeg.jpg';

const PetcardParent = ({userid}) => {
  const carddetails = [
    { image: petparent1, title: 'Winter Pet Safety: Keeping Warm & Healthy', description: 'Winter is magical. The snow falling from the sky and forming a soft blanket on the ground is beautiful.', id: 'f1' },
    { image: petparent2, title: 'Prep Your Dog for Parties: Train Them', description: 'Celebrations any time of year can be fun, safe and stress-free when you include your dog. Just teach your dog a few basic', id: 'f2' },
    { image: petparent3, title: 'Toxic Holiday Plants & Symptoms to Look for', description: 'Make your home beautiful for the holidays – and safe for your cat – by avoiding these seasonal plants', id: 'f3' },
  ];

  const titleStyle = {
    fontSize: '1.7vw',
    fontWeight: 'bold',
    margin: '10px 0',
    width:'25vw'
  };

  const descriptionStyle = {
    fontSize: '1.2vw',
    margin: '10px 0',
    width:'25vw',
  };

  return (
    <div className='petparent'>
      {carddetails.map((card) => (
        <div key={card.id}>
          <Image src={card.image} alt="hi" borderRadius='lg' height='14vw' width='25vw' />
          <div style={titleStyle}>{card.title}</div>
          <div style={descriptionStyle}>{card.description}</div>
          <Link to={`/user/parenting/${card.id}/${userid}`}><div style={{fontSize:'1.5vw'}}>Learn more....</div></Link>
        </div>
      ))}
    </div>
  );
};

export default PetcardParent;
