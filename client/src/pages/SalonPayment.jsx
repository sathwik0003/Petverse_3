import  { useState, useEffect } from 'react';
import './payment.css'; // Import the CSS file
import useInput from './use-input.js'
import { useParams } from 'react-router-dom';

  import Header from '../componants/Header.jsx';
  const isAccount = (value) => /^[0-9]{4} [0-9]{4} [0-9]{4}$/.test(value);
  const isCvv = (value) => /^[0-9]{3}$/.test(value);
  const isNotEmpty = (value) => value.trim() !== '';


const SalonPayment = () => {
  const { userid } = useParams();
  
  



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

 

  
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    console.log('ok')
window.location.href=`/ticket/${userid}`
 
   

    resetCvv();
    resetAccount();
    resetName();
    resetAddress();
    resetDate();
  };
  
  
  return (
    <>
    <Header/>
    <div style={{marginLeft:'23rem'}}>
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

            <button type="submit" className='paymentbutton'>Book Now</button>
          </form>
        </div>
      </div>
    </div>
    
</div>
</>
  );
};

export default SalonPayment;