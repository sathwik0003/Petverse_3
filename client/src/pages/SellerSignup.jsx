import  { useState } from 'react';
import CardLogin from '../componants/UI/CardLogin';
import SignupImage from '../assets/SignupImg.jpg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import useInput from './use-input';
import { Link } from 'react-router-dom';
const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => /^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+[.]+[a-z]+$/.test(value);
const isPhone = (value) => /^((\+91)|\+)?[6789]\d{9}$/.test(value);


const isPassword=(value)=>/^.{8,}$/.test(value);

import { useDispatch } from 'react-redux';
import { signUpUser } from './authSlice';

const SellerSignup = () => {
    const [isFocused1, setFocused1] = useState(false);
    const [isFocused2, setFocused2] = useState(false);
    const [isFocused3, setFocused3] = useState(false);
    const [isFocused4, setFocused4] = useState(false);
    const [isFocused5, setFocused5] = useState(false);
    const [isFocused6, setFocused6] = useState(false);
   


    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName,
      } = useInput(isNotEmpty);
      const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetphone,
      } = useInput(isPhone);
      const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
      } = useInput(isEmail);
      const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername,
      } = useInput(isNotEmpty);
      const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
      } = useInput(isPassword);
      const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPassword,
      } = useInput((value) => value === passwordValue);
    

      let formIsValid = false;
      

  if (firstNameIsValid && phoneIsValid && emailIsValid && passwordIsValid && usernameIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }
  const dispatch = useDispatch();

  const registerUser = async () => {
  
    dispatch(signUpUser({
      firstNameValue,
      usernameValue,
      phoneValue,
      emailValue,
      passwordValue
    }));
    
     
  
  };
  
  // Call the function
  
  

  const submitHandler = async(event )=> {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
  
    console.log(firstNameValue)
    registerUser();
    resetFirstName();
    resetphone();
    resetEmail();
    resetPassword();
    resetUsername();
    resetConfirmPassword();
   
  };

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const phoneClasses = phoneHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';
  const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  const confirmpasswordClasses = confirmPasswordHasError ? 'form-control invalid' : 'form-control';
 

    const div1 = {
        height: '90vh',
       
    };

    const div2 = {
        display: 'flex',
        flexWrap: 'wrap',
   
    justifyContent: 'center',
    };

    const imgs = {
        height: '85vh',
        maxWidth: '95%',
    };

    const inputContainer = {
        position: 'relative',
        width: '100%',
        margin: '10px',
    };

    const inputStyle = {
        
        width: '80%',
       
        borderWidth: '0px 0px 1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'rgb(204, 204, 204)',
        fontSize: '16px',
        outline: 'none',
        borderRadius: '0',
    };

    const labelStyle1 = {
        
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused1 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused1 ? '12px' : '16px',
        color: isFocused1 ? '#007BFF' : 'inherit',
    };
    const labelStyle2 = {
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused2 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused2 ? '12px' : '16px',
        color: isFocused2 ? '#007BFF' : 'inherit',
    };
    const labelStyle3 = {
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused3 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused3 ? '12px' : '16px',
        color: isFocused3 ? '#007BFF' : 'inherit',
    };
    const labelStyle4 = {
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused4 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused4 ? '12px' : '16px',
        color: isFocused4 ? '#007BFF' : 'inherit',
    };
    const labelStyle5 = {
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused5 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused5 ? '12px' : '16px',
        color: isFocused5 ? '#007BFF' : 'inherit',
    };
    const labelStyle6 = {
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused6 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused6 ? '12px' : '16px',
        color: isFocused6 ? '#007BFF' : 'inherit',
    };
   
    const h1style = {
        fontFamily: 'sans-serif',
        lineHeight: '1.2',
        textAlign: 'center',
        color: 'rgb(15, 95, 175)',
    };

    const StyledButton = styled.button`
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 293px;
        border-radius: 5px;
        background-color: #f2ecec;
        color: black;
        &:hover {
            background-color: rgb(15, 95, 175);
            color: white;
        }
    `;

    const paragraphStyle = {
        textAlign: 'center',
        marginTop: '0px',
        fontSize: 'small',
    };


    const mediaQuery = `@media (max-width: 1120px) {
        div1 {
            height: 60vh;
        }
        div2{
            background:'white',
            
        }

        
    }`
    
    


    return (
        <CardLogin>
        <style>{mediaQuery}</style>
            <div style={div1}>
                <div style={div2}>
                    <div style={{ flexBasis: '50%' }}>
                        <img src={SignupImage} style={imgs} alt="Login" />
                    </div>
                    <div style={{ flexBasis: '45%', marginTop: '15px' }}>
                        <div>
                            <h1 style={h1style}>
                                <b>Signup</b>
                            </h1>
                        </div>
                        <form onSubmit={submitHandler}>
                        <div style={inputContainer}>
             
                        <FloatingLabel controlId="floatingInput" style={{border:'0px',height:'10%'}} className={firstNameClasses} >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    style={inputStyle}
                                    onFocus={() => setFocused1(true)}
                                    controlId='name'
                                    value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
                                />
                                <Form.Label style={labelStyle1}>Brand Name</Form.Label>
                                {firstNameHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a first name.</p>}
                        </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" style={{border:'0px'}} className={usernameClasses} >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    style={inputStyle}
                                    onFocus={() => setFocused2(true)}
                                    value={usernameValue}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
                                />
                                <Form.Label style={labelStyle2}>Brand Code</Form.Label>
                                {usernameHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid username.</p>}
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" style={{border:'0px'}} className={emailClasses}>
                                <Form.Control
                                    type="email"
                                    placeholder=""
                                    onFocus={() => setFocused3(true)}
                                    style={inputStyle}
                                    value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
                                />
                                <Form.Label style={labelStyle3}>Email</Form.Label>
                                {emailHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid email.</p>}
                            </FloatingLabel>
                            
                            <FloatingLabel controlId="floatingInput" style={{border:'0px'}} className={phoneClasses}>
                                <Form.Control
                                    type="tel"
                                    placeholder=""
                                    style={inputStyle}
                                    value={phoneValue}
                                    onFocus={() => setFocused4(true)}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
                                />
                                <Form.Label style={labelStyle4}>Phone Number</Form.Label>
                                {phoneHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid phone number.</p>}
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" className={passwordClasses} style={{border:'0px'}}>
    <Form.Control
    className={passwordClasses}
      type="password"
      placeholder=""
      style={inputStyle}
      value={passwordValue}
      onFocus={() => setFocused5(true)}
      onChange={passwordChangeHandler}
      onBlur={passwordBlurHandler}

    />
    <Form.Label style={labelStyle5}>Password</Form.Label>
    {passwordHasError && (
      <p style={{ color: '#b40e0e', fontSize: '10px' }}>
        Please enter a valid password.
      </p>
    )}
  </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" style={{border:'0px'}}  className={confirmpasswordClasses}>
    <Form.Control
   
      type="password"
      placeholder=""
      style={inputStyle}
      value={confirmPasswordValue}
      onFocus={() => setFocused6(true)}
      onChange={confirmPasswordChangeHandler}
      onBlur={confirmPasswordBlurHandler}
     
    />
    <Form.Label style={labelStyle6}>Confirm Password</Form.Label>
    {confirmPasswordHasError && (
      <p style={{ color: '#b40e0e', fontSize: '10px' }}>
        Please enter a valid password.
      </p>
    )}
  </FloatingLabel>
                            <StyledButton type="submit">Signup</StyledButton>
                           , <p style={paragraphStyle}>Already have an account?<Link to='/Sell/Login'>Login Here</Link></p>
                        </div>
                        </form>
                    
                    </div>
                </div>
            </div>
        </CardLogin>
    );
};

export default SellerSignup;
