import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import buynowcat from '../assets/buynowcat.gif';
import './AddtoCart.css';
import './Productpag.css';
import Header from '../componants/Header';
import {  FaRegTrashAlt } from 'react-icons/fa';
import PaymentForm from './Payment';
import { Link } from 'react-router-dom';
import Footer from '../componants/mainpage/Footer';
const AddtoCart = () => {
  const { userid } = useParams();
  const [cart, setCart] = useState({ userId: '', products: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cart/${userid}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching caty:', error);
      }
    };

    fetchCart();
  }, [userid]);

  const updateQuantity = async (producttitle, newQuantity) => {
    try {
      // Check if the new quantity is greater than 0
      if (newQuantity > 0) {
        // You should implement a server endpoint to update the quantity in the database
        const response = await fetch(`http://localhost:3001/api/cart/${userid}/${producttitle}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Update the local state with the new quantity
        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.map((item) =>
            item.title === producttitle ? { ...item, quantity: newQuantity } : item
          ),
        }));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleQuantityChange = (producttitle, newQuantity) => {
    // Assuming you have the available quantity information in the product object
    const product = cart.products.find((item) => item.title === producttitle);
    console.log(product.available)
    // Check if the new quantity is less than or equal to the available quantity
    if (newQuantity <= product.available) {
      // Update the quantity and calculate the new total
      updateQuantity(producttitle, newQuantity);
    } else {
      // Display an error message or handle the case where the quantity exceeds the available quantity
      console.error('Error: Quantity exceeds available quantity');
    }
  };

  // Calculate the total price for all items in the cart
  const calculateTotalPrice = () => {
    return cart.products.reduce((total, item) => total + item.price * item.quantity, 0);
  };
 
  const removeFromCart = async (title) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/${userid}/${title}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Update the local state after successfully removing from wishlist
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter((product) => product.title !== title),
      }));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  
  

  return (
    <>
    <Header></Header>
    <div className="addtocartwrapper">
      <div className="addtocartheader">
        <div style={{ fontSize: "6vw" }}>Buy Now For Me</div>
        <Image src={buynowcat} boxSize="10vw" />
      </div>

      <div className="mainproduct1">
        {cart.products.map((item) => (
          <div key={item.id} className="ppcard">
            <Image src={item.image} alt={item.title} objectFit="cover" boxSize="20vw" />
            <div style={{ backgroundColor: "white" }}>
              <div style={{ color: "#212529b5", fontSize: "1vw", marginLeft: "2vw" }}>
                {item.brandName}
              </div>
              <div style={{ marginLeft: "2vw",    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' }}>{item.title}</div>
              <div style={{ marginLeft: "2vw",    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' }}>
                <b>₹{item.price}</b>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '4vw', marginRight: '6vw' }}>
              <div style={{ fontSize: '1.5vw' }}>Quantity:</div>
              <div>
                <Input
                  style={{ width: '3vw', height: '1.8vw' }}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.title, parseInt(e.target.value))}
                />
              </div>
            </div>
            <div style={{   display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'}}>
            Total: ₹{item.price*item.quantity}
            <Button
            className='wishbutton'
            leftIcon={<FaRegTrashAlt />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(item.title)}
          >
            Remove
          </Button>
          </div>
          </div>
         
        ))}
      </div>
      <div style={{display:"flex", justifyContent:"center", fontSize:"4vw"}}>
        <strong>Total Price:</strong> ₹{calculateTotalPrice()}
      </div>
     <div style={{display:'flex', justifyContent:'center'}}>
     <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        colorScheme="teal"
        marginTop="2"
        width="10vw"
       >
       <Link to={`/user/payment/${userid}`}>
        Buy Now
        </Link>
      </Button>
    </div>
     </div>

    
    </div>
    <Footer />
    </>
  );
};

export default AddtoCart;
