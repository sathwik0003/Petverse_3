import  { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import useInput from './use-input';

import { useDispatch } from 'react-redux';
import { Usersignup } from './authSlice';



const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => /^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+[.]+[a-z]+$/.test(value);
const isPhone = (value) => /^((\+91)|\+)?[6789]\d{9}$/.test(value);

const isPassword=(value)=>/^.{8,}$/.test(value);

const LoginSignup = () => {
  
  const [isLogin, setIsLogin] = useState(true);

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
    value: loginuserValue,
    isValid: loginuserIsValid,
    hasError: loginuserHasError,
    valueChangeHandler: loginuserChangeHandler,
    inputBlurHandler: loginuserBlurHandler,
    reset: resetloginuser,
  } = useInput(isNotEmpty);
  const {
    value: loginpasswordValue,
    isValid: loginpasswordIsValid,
    hasError: loginpasswordHasError,
    valueChangeHandler: loginpasswordChangeHandler,
    inputBlurHandler: loginpasswordBlurHandler,
    reset: resetloginpassword,
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

  
  
  // Call the function
  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: firstNameValue,
          username: usernameValue,
          phone: phoneValue,
          email: emailValue,
          password: passwordValue,
        }),
      });
  
      if (response.ok) {
        console.log('Registration successful');
       
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  
  };
  

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
  
  const onloginHandler=async(event)=>{
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginuserValue,
          password: loginpasswordValue,
        }),
      });
    
      if (response.ok) {
        console.log('Login successful');
        window.location.href = `/user/main/${loginuserValue}`;
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  resetloginpassword()
  resetloginuser()
   
  }

 

 
  return (
    <div className="loginmain">
      <input type="checkbox" id="chk" aria-hidden="true" className='logininput' />
      <div className={`signup ${isLogin ? 'hide' : 'show'}`}>
        <form id="signform" method="post" onSubmit={submitHandler}>
          <label htmlFor="chk" aria-hidden="true" className='loginlabel'>
            Sign up
          </label>
          <div className='input_group'>
            <div className='input_field'>
              {/* <i class="fa-solid fa-signature"></i> */}
              <input type="text" name="fullname" placeholder="Full Name" required id="fname" className='logininput'   value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}/>
            {firstNameHasError && <span style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a first name.</span>}
            </div>
            <div className='input_field'>
              {/* <i class="fa-solid fa-phone"></i> */}
              <input type="tel" name="phno" placeholder="Phone: 10 digits" required id="phonenumber" className='logininput' value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}/>
              {/* <span class="error-message" id="phone-error"></span> */}
              {phoneHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid phone number.</p>}
            </div>
            <div className='input_field'>
             
              <input type="text" name="email" placeholder="Email" required id="emailid" className='logininput' value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}/>
             
              {emailHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid email.</p>}
            </div>
            <div className='input_field'>
             
             <input type="text" name="username" placeholder="Username" required id="uname" className='logininput' value={usernameValue}
           onChange={usernameChangeHandler}
           onBlur={usernameBlurHandler}/>
             {usernameHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid username.</p>}
           </div>
            <div className='input_field'>
             
              <input type="password" name="password" placeholder="Password: min-len:8" required id="password1" className='logininput' value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}/>
              {passwordHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid strong password.</p>}
            </div>
            <div className='input_field'>
             
              <input type="password" name="cnfpassword" placeholder="Confirm Password" required id="password2" className='logininput' value={confirmPasswordValue}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}/>
              {confirmPasswordHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Password does not match.</p>}
            </div>
          </div>
          <button type="submit" className='loginbutton'>Sign up</button>
        </form>
      </div>
      <div className={`login ${isLogin ? 'show' : 'hide'}`}>
        <form id="loginform" method="post" onSubmit={onloginHandler}>
          <label htmlFor="chk" aria-hidden="true" className='loginlabel'>
            Login
          </label>
          <div className='total_input'>
          <div className='input_field'>
          <input type="text" name="username" placeholder="Username" required  className='logininput' value={loginuserValue}
           onChange={loginuserChangeHandler}
           onBlur={loginuserBlurHandler}/>
             
              {loginuserHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid username.</p>}
          
           
           </div>
           <div className='input_field'>
             
             <input type="password" name="password" placeholder="Password: min-len:8" required id="password1" className='logininput' value={loginpasswordValue}
              onChange={loginpasswordChangeHandler}
              onBlur={loginpasswordBlurHandler}
             />
             {loginpasswordHasError && <p style={{ color: '#b40e0e',fontSize:'10px', marginBottom:'0px'}}>Please enter a valid password.</p>}

           </div>
           <button type="submit" className='loginbutton'>Login</button>
           </div>
        </form>
      </div>
     
    </div>
  );
};

export default LoginSignup;
