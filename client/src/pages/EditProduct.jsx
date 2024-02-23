import React,{useState,useEffect} from 'react';
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

const isNotEmpty = (value) => value.trim() !== '';
const isGreaterThanZero = (value) => parseFloat(value) > 0;

const Editproduct = () => {



    const [petCategory, setPetCategory] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDetails, setProductDetails] = useState(null);
  
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
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetdescription,
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
      

      if (titleIsValid && descriptionIsValid && priceIsValid && quantityIsValid ) {
        formIsValid = true;
      }
      const {title}=useParams()
      console.log(title)

      const getProductDetails = async (title) => {
        try {
          const response = await fetch(`http://localhost:3002/api/product/${title}/edit`);
          
          if (response.ok) {
            const productDetails = await response.json();
            return productDetails;
          } else {
            console.error('Failed to fetch product details');
            return null;
          }
        } catch (error) {
          console.error('Error during product details fetch:', error);
          return null;
        }
      };
      

      useEffect(() => {
        const fetchData = async () => {
          const details = await getProductDetails(title);
          setProductDetails(details);
        };
    
        fetchData();
      }, [title]);


      const registerProduct = async () => {
        console.log('ok')
        try {
            console.log(title)
          const response = await fetch(`http://localhost:3002/edit/${title}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                brand:bc,
              title:title,
              pet_category:petCategory,
              product_category:productCategory,
              description:descriptionValue,
              price:priceValue,
              quantity:quantityValue,
              image:file
            }),
          });
      
          if (response.ok) {
            console.log('Product Edited Successfully');
            window.location.href=`/sell/products/${bc}`
           
          } else {
            console.error('failed');
          }
        } catch (error) {
          console.error('Error during adding:', error);
        }
      };
      
      const submitHandler = async(event )=> {
        console.log('hi')
        event.preventDefault();
      
    
        if (!formIsValid) {
         console.log('invalid')
        }
      
        console.log(title)
        registerProduct();
        resettitle();
       
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







  const labelStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold'
  };
  const {bc}=useParams();
  console.log(bc)
  return (
    <>
    {productDetails && (
        <>
    <Navbar brand={bc}/>
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
    )}
   </>
  );
};

export default Editproduct;