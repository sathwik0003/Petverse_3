import React, { useState } from 'react';
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
import axios from 'axios';
import SidebarAdmin from '../componants/Admin/SideBarAdmin'

const AddSalon = () => {
  const [locationCategory, setLocationCategory] = useState('');
  const handleLocationChange = (event) => {
    setLocationCategory(event.target.value);
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [titleValue, setTitleValue] = useState('');
  const titleChangeHandler = (event) => {
    setTitleValue(event.target.value);
  };

  const [descriptionValue, setDescriptionValue] = useState('');
  const descriptionChangeHandler = (event) => {
    setDescriptionValue(event.target.value);
  };

  const [addressValue, setAddressValue] = useState('');
  const addressChangeHandler = (event) => {
    setAddressValue(event.target.value);
  };

  const [phoneValue, setPhoneValue] = useState('');
  const phoneChangeHandler = (event) => {
    setPhoneValue(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('address', addressValue);
      formData.append('description', descriptionValue);
      formData.append('location', locationCategory);
      formData.append('phoneNumber', phoneValue);
      formData.append('image', file);
      console.log(file)

      const response = await fetch('http://localhost:3002/uploadsalon', {
        method: 'POST',
        body: formData,
        encType:'multipart/form'
      });

      if (response.ok) {
        console.log('Image Uploaded Successfully');
       

        

       
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error during adding:', error);
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
            <FormControl id="salonName" mb={4}>
              <FormLabel>Salon Name</FormLabel>
              <Input
                type="text"
                value={titleValue}
                onChange={titleChangeHandler}
                required
                size="lg"
              />
            </FormControl>

            <FormControl id="salonDescription" mb={4}>
              <FormLabel>Salon Description</FormLabel>
              <Textarea
                value={descriptionValue}
                onChange={descriptionChangeHandler}
                required
                size="lg"
              />
            </FormControl>

            <FormControl id="salonAddress" mb={4}>
              <FormLabel>Salon Address</FormLabel>
              <Input
                type="text"
                value={addressValue}
                onChange={addressChangeHandler}
                required
                size="lg"
              />
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

            <FormControl id="salonPhoneNumber" mb={4}>
              <FormLabel>Salon Phone Number</FormLabel>
              <Input
                type="tel"
                value={phoneValue}
                onChange={phoneChangeHandler}
                required
                size="lg"
              />
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
