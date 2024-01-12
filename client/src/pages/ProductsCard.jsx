import {useState} from 'react';
import { Button, Card, } from 'react-bootstrap';
import { Image } from '@chakra-ui/react'
import Header from '../componants/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';


const ProductsCard = ({ image, title, description, price }) => {
    const [reviewText, setReviewText] = useState('');
    const [star, setStar] = useState('');
    const {userid}=useParams();
    console.log(userid)
    const addReview = async (userName, productTitle) => {
        try {
          const response = await fetch('http://localhost:3001/api/add-review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, productTitle, reviewText,star }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log(data.message); // Log the success message
          setReviewText('');
          setStar('');
        } catch (error) {
          console.error('Error adding review:', error);
        }
      };
    return (
        <div>
            <Header />
            <Card style={{ margin: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', border:'0', width: '100rem',
    height: '40rem'}}>
            <div style={{border:'0.1px solid black'}}>
                <Image src={image} alt={title}  boxSize='35vw'/>
                </div>
                <div style={{ margin: '2rem', width: '40vw',border:'0' }}>
                    <Card.Title style={{ fontSize: '2vw', marginTop: '3vw', display: 'flex', justifyContent: 'center' }}>{title}</Card.Title>
                    <Card.Title style={{ fontSize: '3vw', marginTop: '1vw', display: 'flex', justifyContent: 'center' }}>Rs.{price}</Card.Title>
                    <div style={{ margin: '0.5vw', border:'0' }}>
                        <Card.Text style={{ fontSize: '1vw', margin: '1vw' }}> {description}</Card.Text>
                        <div style={{    display: 'flex',alignItems: 'center',justifyContent: 'center',margin: '1rem',height: '3rem'}}>
                        <Button style={{    margin: '1rem',height: '3rem',backgroundColor: '#ff0076'}}>
                        <FontAwesomeIcon icon={faHeart} style={{}}/>Add to WishList
                        </Button>
                        <Button  style={{    margin: '1rem',height: '3rem',backgroundColor: '#ff0076'}}>
                        <FontAwesomeIcon icon={faShoppingCart} style={{}}/>Add to Cart
                        </Button>
                        </div>
                    </div>
                </div>
            </Card>
            <Card.Title style={{ fontSize: '3vw', marginTop: '1vw', display: 'flex', justifyContent: 'center' }}>Reviews</Card.Title>
            <div className='review'>
            <Card.Text style={{ fontSize: '1.5vw', marginTop: '1vw', display: 'flex', justifyContent: 'center' }}>Add your Review and Rating Here...</Card.Text>
            <input
        type="text"
        style={{ padding: '1rem' }}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
            <input
        type="number"
        style={{ padding: '1rem' }}
        value={star}
        onChange={(e) => setStar(e.target.value)}
      />
              <Button
        className="btn"
        style={{ margin: '1rem', height: '3rem', backgroundColor: '#ff0076' }}
        onClick={() => addReview(userid, title)}
      >
        Add a Review
      </Button>
            </div>
        </div>
    );
};

export default ProductsCard;


{/* <Card.Body>
<Card.Title>{title}</Card.Title>
<Card.Text>{description}</Card.Text>
<Card.Text>${price}</Card.Text>
<Button variant="primary">View Details</Button>
</Card.Body> */}