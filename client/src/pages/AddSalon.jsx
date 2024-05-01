import  { useState } from 'react';
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

import SidebarAdmin from '../componants/Admin/SideBarAdmin'
import useInput from './use-input';
const isNotEmpty = (value) => value.trim() !== '';
const isPhone = (value) => /^((\+91)|\+)?[6789]\d{9}$/.test(value);

const AddSalon = () => {
  const [locationCategory, setLocationCategory] = useState('');
  const handleLocationChange = (event) => {
    setLocationCategory(event.target.value);
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetphone,
  } = useInput(isPhone);



  let formIsValid = false;
  

  if (titleIsValid && descriptionIsValid && addressIsValid && phoneIsValid ) {
    formIsValid = true;
  }

  const titleClasses = titleHasError ? 'form-control invalid' : 'form-control';
      const addressClasses = addressHasError ? 'form-control invalid' : 'form-control';
      const phoneClasses = phoneHasError ? 'form-control invalid' : 'form-control';
   
      const descriptionClasses = descriptionHasError ? 'form-control invalid' : 'form-control';
   

  const submitHandler = async (event) => {
    event.preventDefault();
    if(formIsValid){
    try {
   
      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('address', addressValue);
      formData.append('description', descriptionValue);
      formData.append('location', locationCategory);
      formData.append('phoneNumber', phoneValue);
      formData.append('image', file);
      console.log(file)

      const response = await fetch('https://petverse-3.onrender.com/uploadsalon', {
        method: 'POST',
        body: formData,
        encType:'multipart/form'
      });

      if (response.ok) {
        console.log('Image Uploaded Successfully');
        resettitle();
        
      resetphone();
      resetAddress();
        resetDescription();

        

       
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error during adding:', error);
    }
  }else{
    return;
  }
  };

  return (
    <ChakraProvider>
    <SidebarAdmin/>
      <div style={{marginLeft:'24vw'}}>
      <Container maxW="xl" centerContent>
        <Box p={8} boxShadow="xl" borderRadius="md" bg="white" style={{ width: '55vw' }}>
          <Heading as="h2" size="xl" mb={6}>
            Add Salon
          </Heading>
          <form onSubmit={submitHandler} encType='multipart/form-data'>
            <FormControl id="salonName" className={titleClasses} mb={4}>
              <FormLabel>Salon Name</FormLabel>
              <Input
                type="text"
                value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
                required
                size="lg"
              />
              {titleHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a title.</p>}
            </FormControl>

            <FormControl id="salonDescription" className={descriptionClasses} mb={4}>
              <FormLabel>Salon Description</FormLabel>
              <Textarea
               value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
                required
                size="lg"
              />
               {descriptionHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a description.</p>}
            </FormControl>

            <FormControl id="salonAddress" className={addressClasses} mb={4}>
              <FormLabel>Salon Address</FormLabel>
              <Input
                type="text"
                value={addressValue}
                onChange={addressChangeHandler}
                required
                size="lg"
                onBlur={addressBlurHandler}/>
            {addressHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a address.</p>}
            </FormControl>

            <FormControl id="salonLocation" mb={4}>
              <FormLabel>Salon Location</FormLabel>
              <Select
                value={locationCategory}
                onChange={handleLocationChange}
                required
                size="lg"
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </Select>
            </FormControl>

            <FormControl id="salonPhoneNumber" mb={4} className={phoneClasses}>
              <FormLabel>Salon Phone Number</FormLabel>
              <Input
                type="tel"
                value={phoneValue}
                onChange={phoneChangeHandler}
                required
                size="lg"
                onBlur={phoneBlurHandler}/>
            {phoneHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a phone.</p>}
            </FormControl>

            <FormControl id="salonImage" mb={4}>
              <FormLabel>Salon Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                size="lg"
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg">
              Add Salon
            </Button>
          </form>
        </Box>
      </Container>
      </div>
    </ChakraProvider>
  );
};

export default AddSalon;
