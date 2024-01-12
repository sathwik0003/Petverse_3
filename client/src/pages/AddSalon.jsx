import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Form, Button } from 'react-bootstrap';
import styles from './addproduct.module.css'; // Make sure to import your CSS file
import SidebarAdmin from '../componants/Admin/SideBarAdmin'
import useInput from './use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isPhone = (value) => /^((\+91)|\+)?[6789]\d{9}$/.test(value);


const AddSalon = () => {

    const [locationCategory, setLocationCategory] = useState('');
  
    const handleLocationChange = (event) => {
      setLocationCategory(event.target.value);
    };
    
    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resettitle,
      } = useInput(isNotEmpty);
    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescription,
      } = useInput(isNotEmpty);
    const {
        value: addressValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        reset: resetAddress,
      } = useInput(isNotEmpty);
    const {
        value: imageValue,
        isValid: imageIsValid,
        hasError: imageHasError,
        valueChangeHandler: imageChangeHandler,
        inputBlurHandler: imageBlurHandler,
        reset: resetimage,
      } = useInput(isNotEmpty);

      const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetphone,
      } = useInput(isPhone);
    


      let formIsValid = false;
      

      if (titleIsValid && descriptionIsValid && addressIsValid && phoneIsValid && imageIsValid) {
        formIsValid = true;
      }


      const registerSalon = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/addsalon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
              title:titleValue,
              address:addressValue,
              description:descriptionValue,
              location:locationCategory,
              phoneNumber:phoneValue,
              image:imageValue
            }),
          });
      
          if (response.ok) {
            console.log('Salon Added Successfully');
           
          } else {
            console.error('failed');
          }
        } catch (error) {
          console.error('Error during adding:', error);
        }
      };
      
      const submitHandler = async(event )=> {
        event.preventDefault();
    
    
        if (!formIsValid) {
          return;
        }
      
        console.log(titleValue)
        registerSalon();
        resettitle();
        resetimage();
      resetphone();
      resetAddress();
        resetDescription();
       
      };


      const titleClasses = titleHasError ? 'form-control invalid' : 'form-control';
      const addressClasses = addressHasError ? 'form-control invalid' : 'form-control';
      const phoneClasses = phoneHasError ? 'form-control invalid' : 'form-control';
   
      const descriptionClasses = descriptionHasError ? 'form-control invalid' : 'form-control';
      const imageClasses = imageHasError ? 'form-control invalid' : 'form-control';







  const labelStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold'
  };

  return (
    <>
     <SidebarAdmin />
    
    <div className={styles.backgroundContainer}>
     <div className={styles.MainContainer}>
  
    <Container className={styles.container} style={{
      boxShadow: '5px 8px 20px #000',
      marginTop: '40px',
      marginLeft: '370px',
      padding: '20px',
      maxWidth: '800px',
      borderBottom: '3px',
       zIndex: 1,
    }}>

        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>ADD SALON</h2>
        <Form onSubmit={submitHandler}>
          <Row>
           
              <Form.Group controlId="formSalonTitle" className={titleClasses}  style={{border:'0px'}}>
                <Form.Label style={labelStyle}>SALON NAME</Form.Label>
                <Form.Control type="text" placeholder="Salon Title" value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}/>
            {titleHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a title.</p>}
              </Form.Group>
           
           
          </Row>
         
              
           

          <Row>

          <Form.Group controlId="formSalonDescription" className={descriptionClasses}  style={{border:'0px'}}>
                <Form.Label style={labelStyle}>SALON DESCRIPTION</Form.Label>
                <Form.Control type="text" placeholder="Salon Description" value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}/>
            {descriptionHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a description.</p>}
              </Form.Group>
            
          </Row>
          <Row>

          <Form.Group controlId="formSalonAddress" className={addressClasses}  style={{border:'0px'}}>
                <Form.Label style={labelStyle}>SALON ADDRESS</Form.Label>
                <Form.Control type="text" placeholder="Salon Address" value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}/>
            {addressHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a address.</p>}
              </Form.Group>
            
          </Row>
          <Row>

          <Form.Group controlId="formSalonPhone" className={phoneClasses}  style={{border:'0px'}}>
                <Form.Label style={labelStyle}>PHONE NUMBER</Form.Label>
                <Form.Control type="text" placeholder="Salon Phone Number" value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}/>
            {phoneHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a phone.</p>}
              </Form.Group>
            
          </Row>

          <Row>
          <Form.Group controlId="formLocation">
                <Form.Label style={labelStyle}>LOCATION</Form.Label>
                <Form.Control as="select" value={locationCategory} onChange={handleLocationChange}>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="delhi">Delhi</option>
                </Form.Control>
              </Form.Group>
          </Row>

          <Row>
            
              <Form.Group controlId="formImage" className={imageClasses} style={{border:'0px'}}>
                <Form.Label style={labelStyle}>IMAGE</Form.Label>
                <Form.Control type="text" placeholder="Image URL" value={imageValue}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}/>
            {imageHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a image URL.</p>}
              </Form.Group>
           

           
          </Row>

          <Button type="submit" className="mt-4" style={{ backgroundColor: 'green', borderColor: 'green', width: '160px' }}>ADD SALON</Button>
        </Form>
      
    </Container >
    </div>
   </div>
   </>
  );
};

export default AddSalon;