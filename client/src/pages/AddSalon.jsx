import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import SidebarAdmin from '../componants/Admin/SideBarAdmin'
import useInput from './use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isPhone = (value) => /^((\+91)|\+)?[6789]\d{9}$/.test(value);


import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
} from '@chakra-ui/react';

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

          title: titleValue,
          address: addressValue,
          description: descriptionValue,
          location: locationCategory,
          phoneNumber: phoneValue,
          image: imageValue
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

  const submitHandler = async (event) => {
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







  return (
    <ChakraProvider>
      <Container maxW="xl" centerContent>
        <Box p={8} boxShadow="xl" borderRadius="md" bg="white" style={{ width: '55vw' }}>
          <Heading as="h2" size="xl" mb={6}>
            Add Salon
          </Heading>
          <form >

            <FormControl className={titleClasses} id="salonName" mb={4}>
              <FormLabel>Salon Name</FormLabel>
              <Input
                type="text"
                name="salonName"

                value={titleValue}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                required
                size="lg" // Increase input size
              />
              {titleHasError && <p style={{ color: '#b40e0e', fontSize: '10px' }}>Please enter a title.</p>}
            </FormControl>


            <FormControl id="salonDescription" className={descriptionClasses} mb={4}>
              <FormLabel>Salon Description</FormLabel>
              <Textarea
                name="salonDescription"
                value={descriptionValue}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
                required
                size="lg" // Increase textarea size
              />
              {descriptionHasError && <p style={{ color: '#b40e0e', fontSize: '10px' }}>Please enter a description.</p>}
            </FormControl>


            <FormControl id="salonAddress" className={addressClasses} mb={4}>
              <FormLabel>Salon Address</FormLabel>
              <Input
                type="text"
                name="salonAddress"
                value={addressValue}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                required
                size="lg" // Increase input size
              />
              {addressHasError && <p style={{ color: '#b40e0e', fontSize: '10px' }}>Please enter a address.</p>}
            </FormControl>

            {/* Salon Location Dropdown */}


            <FormControl id="salonLocation" mb={4}>
              <FormLabel>Salon Location</FormLabel>
              <Select
                name="salonLocation"
                value={locationCategory} onChange={handleLocationChange}
                required
                size="lg" // Increase select size
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </Select>
            </FormControl>


            <FormControl id="salonPhoneNumber" className={phoneClasses} mb={4}>
              <FormLabel>Salon Phone Number</FormLabel>
              <Input
                type="tel"
                name="salonPhoneNumber"
                value={phoneValue}
                onChange={phoneChangeHandler}
                onBlur={phoneBlurHandler}
                required
                size="lg" // Increase input size
              />
              {phoneHasError && <p style={{ color: '#b40e0e', fontSize: '10px' }}>Please enter a phone.</p>}
            </FormControl>

            {/* Salon Image (Text input for simplicity) */}

            <FormControl id="salonImage" className={imageClasses} mb={4}>
              <FormLabel>Salon Image (URL)</FormLabel>
              <Input
                type="text"
                name="salonImage"
                value={imageValue}
                onChange={imageChangeHandler}
                onBlur={imageBlurHandler}
                required
                size="lg" // Increase input size
              />
              {imageHasError && <p style={{ color: '#b40e0e', fontSize: '10px' }}>Please enter a image URL.</p>}
            </FormControl>

            {/* Submit Button */}

            <Button type="submit" colorScheme="teal" size="lg">
              Add Salon
            </Button>
          </form>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default AddSalon;
