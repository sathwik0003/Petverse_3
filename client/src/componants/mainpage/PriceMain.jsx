import { Image, Box, Text } from '@chakra-ui/react';
import pricemain from '../../assets/pricemain.jpeg.jpg';
import { Link } from 'react-router-dom';
import classes from './PriceMain.module.css';

const PriceMain = ({userid}) => {
    console.log(userid)
  const PricesList = [
    { id: 'pm1', priceup: 699 },
    { id: 'pm2', priceup: 999 },
    { id: 'pm3', priceup: 1999 },
    { id: 'pm4', priceup: 2499 },
    { id: 'pm5', priceup: 2999 },
  ];

  const pricepage = (priceup) => {
    window.location.href = `/user/products/${userid}/${priceup}`;
  };

  return (
    <div className={classes.priceall}>
      {PricesList.map((price) => (
        <div className={classes.pricemainwrapper} key={price.id}>
          <Link className='custom-link' to={`/user/products/priceup/${price.priceup}`}>
            <Image src={pricemain} height='60px' width='180px' borderRadius='0.8vw' position='relative' />
            <div className={classes.textprice} onClick={() => pricepage(price.priceup)}>
              Below Price ₹{price.priceup}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PriceMain;
