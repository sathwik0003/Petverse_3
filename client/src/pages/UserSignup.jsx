import  { useState } from 'react';
import CardLoginAdmin from '../componants/UI/CardLoginAdmin';
import SignupImage from '../assets/SignupImg.jpg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import useInput from './use-input';

const isNotEmpty = (value) => value.trim() !== '';



const AdminLogin = () => {
    const [isFocused1, setFocused1] = useState(false);
    const [isFocused2, setFocused2] = useState(false);
   


    
   
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
      } = useInput(isNotEmpty);
     

      let formIsValid = false;
      

  if ( passwordIsValid && usernameIsValid ) {
    formIsValid = true;
  }

 
  

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (usernameValue === 'admin123' && passwordValue === '1234567') {
      
      window.location.href = '/admin/dashboard';
    } else {
      alert('Invalid username or password');
    }

    resetPassword();
    resetUsername();
  };


  const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  
 

    const div1 = {
        height: '75vh',
       
    };

    const div2 = {
        display: 'flex',
        flexWrap: 'wrap',
   
    justifyContent: 'center',
    };

    const imgs = {
        height: '62vh',
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
   
  
   
    const h1style = {
        fontFamily: 'sans-serif',
        lineHeight: '1.2',
        textAlign: 'center',
        color: 'rgb(15, 95, 175)',
        fontSize:'2rem',
        marginRight:'3rem'
    };

    const StyledButton = styled.button`
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 200px;
        border-radius: 5px;
        background-color: #f2ecec;
        color: black;
        margin-left:1rem;
        &:hover {
            background-color: rgb(15, 95, 175);
            color: white;
        }
        
    `;

    


    const mediaQuery = `@media (max-width: 1120px) {
        div1 {
            height: 60vh;
        }
        div2{
            background:'white',
            
        }

        
    }`
    
    


    return (
        <CardLoginAdmin>
        
        <style>{mediaQuery}</style>
            <div style={div1}>
                <div style={div2}>
                    <div style={{ flexBasis: '50%' }}>
                        <img src={SignupImage} style={imgs} alt="Login" />
                    </div>
                    <div style={{ flexBasis: '45%', marginTop: '5rem' }}>
                        <div>
                            <h1 style={h1style}>
                                <b>Admin Login</b>
                            </h1>
                        </div>
                        <form onSubmit={submitHandler}>
                        <div style={inputContainer}>
             
                        
                            <FloatingLabel controlId="floatingInput" style={{border:'0px'}} className={usernameClasses} >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    style={inputStyle}
                                    onFocus={() => setFocused1(true)}
                                    value={usernameValue}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
                                />
                                <Form.Label style={labelStyle1}>Admin Username</Form.Label>
                                {usernameHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid username.</p>}
                            </FloatingLabel>
                           
                            <FloatingLabel controlId="floatingInput" className={passwordClasses} style={{border:'0px'}}>
    <Form.Control
    className={passwordClasses}
      type="password"
      placeholder=""
      style={inputStyle}
      value={passwordValue}
      onFocus={() => setFocused2(true)}
      onChange={passwordChangeHandler}
      onBlur={passwordBlurHandler}

    />
    <Form.Label style={labelStyle2}>Password</Form.Label>
    {passwordHasError && (
      <p style={{ color: '#b40e0e', fontSize: '10px' }}>
        Please enter a valid password.
      </p>
    )}
  </FloatingLabel>
                            
                            <StyledButton type="submit">Login</StyledButton>
                          
                        </div>
                        </form>
                    
                    </div>
                </div>
            </div>
        </CardLoginAdmin>
    );
};

export default AdminLogin;