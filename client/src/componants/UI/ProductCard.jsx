import React from 'react';
import { Button, Card, } from 'react-bootstrap';
import { Image } from '@chakra-ui/react'
import Header from '../Header';
import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const ProductCard = ({ imageUrl, title, description, price }) => {
    return (
        <div>
            <Header />
            <Card style={{ margin: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Image src={imageUrl} alt={title} borderRadius='lg' boxSize='40vw' />
                <Card style={{ margin: '3rem', width: '40vw', backgroundColor: '#00ff781c' }}>
                    <Card.Title style={{ fontSize: '3vw', marginTop: '3vw', display: 'flex', justifyContent: 'center' }}>{title}</Card.Title>
                    <Card style={{ margin: '0.5vw', backgroundColor: '#0016ff1a' }}>
                        <Card.Text style={{ fontSize: '1.6vw', margin: '1vw' }}>{description}</Card.Text>
                        <Card.Title style={{ fontSize: '3vw', marginTop: '1vw', display: 'flex', justifyContent: 'center' }}>Rs.{price}</Card.Title>
                        <Button variant="primary" size="lg" active className='pricebuttonsingle'>
                        <FontAwesomeIcon icon={faShoppingCart} />AddtoCart
                        </Button>
                    </Card>
                </Card>
            </Card>
        </div>
    );
};

export default ProductCard;


{/* <Card.Body>
<Card.Title>{title}</Card.Title>
<Card.Text>{description}</Card.Text>
<Card.Text>${price}</Card.Text>
<Button variant="primary">View Details</Button>
</Card.Body> */}

