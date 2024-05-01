// MainComponent.js
import { useState, useEffect } from 'react';
import Header from '../componants/Header';
import Sheader from './Sheader';
import SaloonDetails from './SaloonDetails';
import { useParams } from 'react-router-dom';

const SaloonSingle = () => {
  const [salon, setSalon] = useState(null);
  const { title,userid } = useParams();
 

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        console.log('hi')
        const response = await fetch(`https://petverse-3.onrender.com/salons/${title}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setSalon(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchSalonDetails();
  }, [title]);

  return (
    <>
      <Header/>
     
      {salon && (
        <SaloonDetails
          title={title}
          src={`https://petverse-3.onrender.com/uploads/${salon.image}`}
          description={salon.description}
          address={salon.address}
          phone={salon.phoneNumber}
          userid={userid}
        />
      )}
    </>
  );
};

export default SaloonSingle;
