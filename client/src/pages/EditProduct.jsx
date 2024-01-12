import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './addproduct.module.css'; // Make sure to import your CSS file
import { useParams } from 'react-router-dom';
import useInput from './use-input';
import Navbar from './NavBar';
import { useSelector } from 'react-redux';

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
        value: imageValue,
        isValid: imageIsValid,
        hasError: imageHasError,
        valueChangeHandler: imageChangeHandler,
        inputBlurHandler: imageBlurHandler,
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
      const {title}=useParams()
      console.log(title)

      const getProductDetails = async (title) => {
        try {
          const response = await fetch(`http://localhost:3001/api/product/${title}/edit`);
          
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
          const response = await fetch(`http://localhost:3001/edit/${title}`, {
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
              image:imageValue
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
        resetimage();
        resetprice();
        resetquantity();
        resetdescription();
       
      };


      const titleClasses = titleHasError ? 'form-control invalid' : 'form-control';
      const priceClasses = priceHasError ? 'form-control invalid' : 'form-control';
      const quantityClasses = quantityHasError ? 'form-control invalid' : 'form-control';
      const descriptionClasses = descriptionHasError ? 'form-control invalid' : 'form-control';
      const imageClasses = imageHasError ? 'form-control invalid' : 'form-control';







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
  
    <Container className={styles.container} style={{
      boxShadow: '5px 8px 20px #000',
      marginTop: '40px',
      marginLeft: '370px',
      padding: '20px',
      maxWidth: '800px',
      borderBottom: '3px',
       zIndex: 1,
    }}>

        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>EDIT PRODUCT</h2>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductTitle" className={titleClasses}  style={{border:'0px'}}>
                <Form.Label style={labelStyle}>PRODUCT TITLE</Form.Label>
                <Form.Control type="text" placeholder="Product Title" value={productDetails.title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}/>
            {titleHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a title.</p>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formPetCategory">
                <Form.Label style={labelStyle}>PET CATEGORY</Form.Label>
                <Form.Control as="select" value={petCategory} onChange={handlePetCategoryChange}>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductCategory">
                <Form.Label style={labelStyle}>PRODUCT CATEGORY</Form.Label>
                <Form.Control as="select" value={productCategory} onChange={handleProductCategoryChange}>
                  <option value="Food">Food</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bed">Bed</option>
                  <option value="Toys">Toys</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Grooming">Grooming</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formAvialableQuantity" className={quantityClasses} style={{border:'0px'}}>
                <Form.Label style={labelStyle}>AVAILABLE QUANTITY</Form.Label>
                <Form.Control type="number" placeholder="Quantity" value={quantityValue}
            onChange={quantityChangeHandler}
            onBlur={quantityBlurHandler}/>
            {quantityHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid quantity.</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formPrice" className={priceClasses} style={{border:'0px'}}>
                <Form.Label style={labelStyle}>PRICE</Form.Label>
                <Form.Control type="number" placeholder="Price" value={priceValue}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}/>
            {priceHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid price.</p>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formBrand">
                <Form.Label style={labelStyle}>BRAND CODE</Form.Label>
                <Form.Control type="text" placeholder="Brand" value={bc} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formImage" className={imageClasses} style={{border:'0px'}}>
                <Form.Label style={labelStyle}>IMAGE</Form.Label>
                <Form.Control type="text" placeholder="Image URL" value={imageValue}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}/>
            {imageHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a image URL.</p>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formPetDescription" className={descriptionClasses} style={{border:'0px'}}>
                <Form.Label style={labelStyle}>PET DESCRIPTION</Form.Label>
                <Form.Control as="textarea" rows={1} placeholder="Pet Description" value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}/>
            {descriptionHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a description.</p>}
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="mt-4" style={{ backgroundColor: 'green', borderColor: 'green', width: '160px' }}>SAVE PRODUCT</Button>
        </Form>
      
    </Container >
    </div>
   </div>
   </>
    )}
   </>
  );
};

export default Editproduct;