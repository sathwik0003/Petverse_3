import  { useState, useEffect } from 'react';
import './payment.css'; // Import the CSS file
import useInput from './use-input.js'
import { useParams } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
  import Header from '../componants/Header.jsx';
  const isAccount = (value) => /^[0-9]{4} [0-9]{4} [0-9]{4}$/.test(value);
  const isCvv = (value) => /^[0-9]{3}$/.test(value);
  const isNotEmpty = (value) => value.trim() !== '';


const PaymentForm = () => {
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
  



  const {
    value: accountValue,
    isValid: accountIsValid,
    hasError: accountHasError,
    valueChangeHandler: accountChangeHandler,
    inputBlurHandler: accountBlurHandler,
    reset: resetAccount,
  } = useInput(isAccount);
  const {
    value: cvvValue,
    isValid: cvvIsValid,
    hasError: cvvHasError,
    valueChangeHandler: cvvChangeHandler,
    inputBlurHandler:cvvBlurHandler,
    reset: resetCvv,
  } = useInput(isCvv);
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler:nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler:addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);
  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler:dateBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);


  let formIsValid = false;

  if (accountIsValid&& cvvIsValid && nameIsValid && addressIsValid && dateIsValid) {
    formIsValid = true;
  }

 

  const calculateTotalPrice = () => {
    return cart.products.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // Create an object with payment details, cart products, and total amount
    const orderData = {
      userId: userid,
      paymentDetails: {
        name: nameValue,
        address:addressValue,
        accountNumber: accountValue,
        cvv: cvvValue,
        expiryDate: dateValue,
      },
      products: cart.products.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        image:item.image
      })),
      totalAmount: calculateTotalPrice(),
    };

    try {
      // Make a POST request to the backend to store the order
      const response = await fetch(`http://localhost:3001/api/orders/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

     
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle the error, e.g., show an error message to the user
    }
    window.location.href=`/final/${userid}`

    resetCvv();
    resetAccount();
    resetName();
    resetAddress();
    resetDate();
  };
  
  
  return (
    <>
    <Header/>
    <div style={{display:'flex'}}>
    <div className='paymentcontainer'>
      <p style={{    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5rem',
    fontSize: '4rem'}}>
        <b>PAYMENT</b>
      </p>
      <div style={{    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}}>
        <div className="form">
          <legend>PAYMENT DETAILS</legend>
          <form id="my-form" action="/saloonticket" onSubmit={submitHandler} className='paymentform'>
          
          <label htmlFor="name" className='paymentlabel'>Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Sathwik"
              required
              className='paymentinput'
              value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            />
            {nameHasError && <span style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid name.</span>}
           

            <label htmlFor="address" className='paymentlabel'>Address:</label>
            <input
              type="text"
              id="address"
              placeholder="FlatNo:XXXXXX   CityPin:XXXXXX"
              required
              className='paymentinput'
              value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            />
            {addressHasError && <span style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid address.</span>}

            <label htmlFor="account-number" className='paymentlabel'>Account Number:</label>
            <input
              type="text"
              id="account-number"
              placeholder="XXXX XXXX XXXX"
              required
              className='paymentinput'
              value={accountValue}
            onChange={accountChangeHandler}
            onBlur={accountBlurHandler}
            />
            {accountHasError && <span style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid account number.</span>}

            <label htmlFor="cvv" className='paymentlabel'>CVV:</label>
            <input type="password" id="cvv" placeholder="XXX" required className='paymentinput'value={cvvValue}
            onChange={cvvChangeHandler}
            onBlur={cvvBlurHandler}/>
            {cvvHasError && <span style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid cvv.</span>}
            <label htmlFor="exp-date" className='paymentlabel'>Expiry Date:</label>
            <input type="date" id="exp-date" placeholder="MM/YYYY" required className='paymentinput'
              value={dateValue}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
            />
            {dateHasError && <span style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid date.</span>}

            <button type="submit" className='paymentbutton'>Place Order</button>
          </form>
        </div>
      </div>
    </div>
    <div className="paymentform2">
        <legend className="paymentlegand">YOUR ORDER</legend>
        <div className="paymentagain">
          {cart.products.map((item) => (
            <div className="paymentone" key={item.id}>
              <div className="paymentok">
                <Image src={item.image} alt={item.title} boxSize="8vw"/>
              </div>
              <div className="paymentok">{item.title}</div>
              <div className="paymentok">{item.quantity}</div>
              <div className="paymentok">Rs. {item.price}</div>
            </div>
          ))}
          <h4>Total Price:  ₹{calculateTotalPrice()}</h4>
        </div>
      </div>
</div>
</>
  );
};

export default PaymentForm;
