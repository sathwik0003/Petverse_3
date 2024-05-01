// Addproduct.js

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './addproduct.module.css'; // Make sure to import your CSS file
import { useParams } from 'react-router-dom';
import useInput from './use-input';
import Navbar from './NavBar';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import axios from 'axios';

const isNotEmpty = (value) => value.trim() !== '';
const isGreaterThanZero = (value) => parseFloat(value) > 0;

const Addproduct = () => {

  const [petCategory, setPetCategory] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handlePetCategoryChange = (event) => {
    setPetCategory(event.target.value);
  };

  const handleProductCategoryChange = (event) => {
    setProductCategory(event.target.value);
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
   
    hasError: productHasError,
   
  } = useInput(isNotEmpty);
  const {
   
    hasError: petHasError,
   
  } = useInput(isNotEmpty);
  const {
   
    hasError: brandHasError,
    
  } = useInput(isNotEmpty);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetdescription,
  } = useInput(isNotEmpty);

  const {
    value: imageValue,
    isValid: imageIsValid,
    hasError: imageHasError,
  
    reset: resetimage,
  } = useInput(isNotEmpty);

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetprice,
  } = useInput(isGreaterThanZero);

  const {
    value: quantityValue,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangeHandler,
    inputBlurHandler: quantityBlurHandler,
    reset: resetquantity,
  } = useInput(isGreaterThanZero);

  let formIsValid = false;

  if (titleIsValid && descriptionIsValid && priceIsValid && quantityIsValid && imageIsValid) {
    formIsValid = true;
  }
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const registerProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('brand', bc);
      formData.append('title', titleValue);
      formData.append('pet_category', petCategory);
      formData.append('product_category', productCategory);
      formData.append('description', descriptionValue);
      formData.append('price', priceValue);
      formData.append('quantity', quantityValue);
      formData.append('image', file);
      const response = await fetch('http://localhost:3002/productupload', {
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
  }
    

  const [csvfile, setcsvFile] = useState(null);

  const handlecsvFileChange = (event) => {
    setcsvFile(event.target.files[0]);
  };

  const handlecsvSubmit = async (event) => {
    event.preventDefault();

    if (!csvfile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvfile);

    try {
      const response = await axios.post('https://petverse-3.onrender.com/csvupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
    
  

  const submitHandler = async (event) => {
    console.log('hi')
    event.preventDefault();

   
    registerProduct();
    resettitle();
    resetimage();
    resetprice();
    resetquantity();
    resetdescription();
  };

  const titleClasses = titleHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const petClasses = petHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const productClasses = productHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const brandClasses = brandHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const priceClasses = priceHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const quantityClasses = quantityHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const descriptionClasses = descriptionHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;
  const imageClasses = imageHasError ? `${styles.inputContainer} invalid` : styles.inputContainer;

  const { bc } = useParams();

  return (
    <>
      <Navbar brand={bc} />
      <div className={styles.backgroundContainer}>
        <div className={styles.MainContainer}>
          <Container>
            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>ADD PRODUCT</h2>
            <form onSubmit={submitHandler}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <FormControl className={titleClasses}>
                    <FormLabel>Product Title</FormLabel>
                    <Input
                      type="text" placeholder="Product Title" value={titleValue}
                      onChange={titleChangeHandler}
                      onBlur={titleBlurHandler}
                    />
                    {titleHasError && <p className={styles.errorMessage}>Please enter a title.</p>}
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl className={petClasses}>
                    <FormLabel>Pet Category</FormLabel>
                    <Select
                      value={petCategory}
                      onChange={handlePetCategoryChange}
                    >
                      <option value="">Select Pet Category</option>
                      <option value="cat">Cat</option>
                      <option value="dog">Dog</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl className={productClasses}>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      value={productCategory}
                      onChange={handleProductCategoryChange}
                    >
                      <option value="">Select Product Category</option>
                      <option value="Food">Food</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Bed">Bed</option>
                      <option value="Toys">Toys</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Grooming">Grooming</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl className={quantityClasses}>
                    <FormLabel>Available Quantity</FormLabel>
                    <Input
                      type="number"
                      placeholder="Quantity" value={quantityValue}
                      onChange={quantityChangeHandler}
                      onBlur={quantityBlurHandler}
                    />
                    {quantityHasError && <p className={styles.errorMessage}>Please enter a valid quantity.</p>}
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl className={priceClasses}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number" placeholder="Price" value={priceValue}
                      onChange={priceChangeHandler}
                      onBlur={priceBlurHandler}
                    />
                    {priceHasError && <p className={styles.errorMessage}>Please enter a valid price.</p>}
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl className={brandClasses}>
                    <FormLabel>Brand Code</FormLabel>
                    <Input
                      type="text" placeholder="Brand" value={bc}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl className={imageClasses}>
                    <FormLabel>Image</FormLabel>
                    <Input
                      type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                    />
                    {imageHasError && <p className={styles.errorMessage}>Please select an image.</p>}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl className={descriptionClasses}>
                    <FormLabel>Product Description</FormLabel>
                    <Textarea
                      placeholder="Product Description" value={descriptionValue}
                      onChange={descriptionChangeHandler}
                      onBlur={descriptionBlurHandler}
                    />
                    {descriptionHasError && <p className={styles.errorMessage}>Please enter a description.</p>}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} textAlign="center">
                  <Button type="submit" colorScheme="blue" className={styles.submitButton}>
                    Add Product
                  </Button>
                </GridItem>
              </Grid>
            </form>

            <Heading mt={8} mb={4} size="md">
              Upload a CSV containing all products
            </Heading>
            <form onSubmit={handlecsvSubmit}>
            <FormControl>
              <FormLabel>Upload CSV File</FormLabel>
              <Input type="file" accept=".csv" onChange={handlecsvFileChange} />
            </FormControl>
            <Button type="submit" colorScheme="blue" className={styles.submitButton}>
                Upload CSV
              </Button>
              </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
