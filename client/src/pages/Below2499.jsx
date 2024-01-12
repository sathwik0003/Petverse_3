import  { useState, useEffect } from 'react';
import { Image, Button } from '@chakra-ui/react';
import { FaShoppingBasket, FaRegHeart} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import './Productpag.css';
import Header from '../componants/Header'
import Heade2r from '../componants/Heade2r'
import Footer from '../componants/mainpage/Footer';

const Below2499 = () => {
    const { userid } = useParams();
    console.log(userid)
  
    const {attribute}=useParams();
    console.log(attribute)
    const {division}=useParams();
    console.log(division)
 
  

    const [brandFilter, setBrandFilter] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const [specieFilter, setSpecieFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [items, setItems] = useState([]);
   
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
  
      

    const addToWishlist = async (product) => {
        try {
            if (!wishlist.some((item) => item.id === product.id)) {
          const { id, title, description, pet_category, product_category,available, price, image, brandcode } = product;
      
          const response = await fetch(`http://localhost:3001/api/wishlist/${userid}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product: { id, title, description, pet_category, product_category,available, price, image, brandcode },
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          setWishlist((prevWishlist) => [...prevWishlist, product]);
        }
          // You can handle success, e.g., show a toast or update UI
        } catch (error) {
          console.error('Error adding to wishlist:', error);
        }
      };
    const addToCart = async (product) => {
        try {
           
            if (!cart.some((item) => item.title === product.title)) {
          const { id, title, description, pet_category, product_category,available, price, image, brandcode } = product;
      
          const response = await fetch(`http://localhost:3001/api/cart/${userid}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product: { id, title, description, pet_category, product_category,available, price, image, brandcode },
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          setCart((prevCart) => [...prevCart, product]);
        }
          // You can handle success, e.g., show a toast or update UI
        } catch (error) {
          console.error('Error adding the cart:', error);
        }
      };
      
     
     

      
    
    useEffect(() => {
      
        if (attribute === "CAT") {
            setSpecieFilter("cat");
        }
        if (attribute === "DOG") {
            setSpecieFilter("dog");
        }
        if (division === "Food") {
            setCategoryFilter("Food")
        }
       
        if (division === "Bed") {
            setCategoryFilter("Bed")
        }
        if (division === "Accessories") {
            setCategoryFilter("Accessories")
        }
        if (division === "Clothing") {
            setCategoryFilter("Clothing")
        }
        if (division === "Grooming") {
            setCategoryFilter("Grooming")
        }
        if (division === "Toy") {
            setCategoryFilter("Toys")
        }
        if(attribute==undefined){
          setCategoryFilter("All")
        }
    }, [division, attribute,specieFilter, brandFilter, setCategoryFilter, setSpecieFilter]);

    useEffect(() => {
        fetchProducts();
      }, [division,attribute,specieFilter, brandFilter, priceFilter, categoryFilter]);
      

    
    
      const fetchProducts = async () => {
        try {
          console.log('hi')
          console.log(specieFilter)
          console.log(categoryFilter)
         
          const response = await fetch(`http://localhost:3001/products?specie=${specieFilter}&brand=${brandFilter}&price=${2499}&category=${categoryFilter}`);
          
          // Check if the response is not successful (status code other than 200)
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const data = await response.json();
       
          setItems(data);
        
         
        
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
   

    

      const addToCartnot=()=>{
        window.location.href='/user/login'
      }
    // Cart 





    return (
        <div >
        {userid !== "undefined" ? (
        <Header />
      ) : <Heade2r/>}

            <div className="productsfilters">
                <select placeholder="Filter by Brand" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                    <option value="All">All Brands</option>
                    <option value="pdg">Pedigree</option>
                    <option value="td">Top Dog</option>
                    <option value="gt">Goofy Tails</option>
                   
                    {Array.from(new Set(items.map((item) => item.brandName))).map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>

                <select placeholder="Filter by Price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                    <option value="All">All Prices</option>
                    <option value="500">Up to ₹500</option>
                    <option value="700">Up to ₹700</option>
                    <option value="900">Up to ₹900</option>
                </select>
            </div>
            <div className="mainproduct1">


                {items.map((item) => (
                    <div key={item.id} className="ppcard">
                   
                    <Link to={`/product/${userid}/${item.title}`}>
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                boxSize="20vw"
              />
            </Link>
                     
                        <div style={{ backgroundColor: "white" }}>
                            <div style={{ color: "#212529b5", fontSize: "1vw", marginLeft: "2vw" }}>
                                {item.brandName}
                            </div>
                            <div style={{ marginLeft: "2vw" }}>{item.title}</div>
                            <div style={{ marginLeft: "2vw" }}>
                                <b>₹{item.price}</b>
                            </div>
                            <div style={{ marginLeft: "2vw" }}></div>
                            <div className="buttonproducts">
                            {userid!==undefined?(
                              <Button
                                    leftIcon={<FaShoppingBasket />}
                                    colorScheme="red"
                                    variant="outline"
                                    size="sm"
                                    height="3vw"
                                    width="9vw"
                                    fontSize="1.5vw"
                                    marginLeft="1vw"
                                    marginBottom="0.6vw"
                                    onClick={() => addToCart(item)}
                // Disable the button if the product is already in the wishlist
                isDisabled={cart.some((cartItem) => cartItem.id === item.id)}
                                   
                                >
                                <div style={{ padding: "0.2vw" }}>
                  {/* Change button text based on whether the product is in the wishlist */}
                 Cart
                </div>
                                    
                                </Button>

                            ):(
                              <Button
                                    leftIcon={<FaShoppingBasket />}
                                    colorScheme="red"
                                    variant="outline"
                                    size="sm"
                                    height="3vw"
                                    width="9vw"
                                    fontSize="1.5vw"
                                    marginLeft="1vw"
                                    marginBottom="0.6vw"
                                    onClick={() => addToCartnot(item)}
                                   
                                >
                                <div style={{ padding: "0.2vw" }}>
                
                    Cart
                </div>
                                    
                                </Button>
                            )}
                            {userid!==undefined?(
                              <Button
                                    leftIcon={<FaRegHeart />}
                                    colorScheme="red"
                                    variant="outline"
                                    size="sm"
                                    height="3vw"
                                    width="9vw"
                                    fontSize="1.5vw"
                                    marginLeft="1vw"
                                    marginBottom="0.6vw"
                                    onClick={() => addToWishlist(item)}
                // Disable the button if the product is already in the wishlist
                isDisabled={wishlist.some((wishItem) => wishItem.id === item.id)}
                                   
                                >
                                <div style={{ padding: "0.2vw" }}>
                  {/* Change button text based on whether the product is in the wishlist */}
                 Wishlist
                </div>
                                    
                                </Button>

                            ):(
                              <Button
                                    leftIcon={<FaRegHeart  />}
                                    colorScheme="red"
                                    variant="outline"
                                    size="sm"
                                    height="3vw"
                                    width="9vw"
                                    fontSize="1.5vw"
                                    marginLeft="1vw"
                                    marginBottom="0.6vw"
                                    onClick={() => addToCartnot(item)}
                                   
                                >
                                <div style={{ padding: "0.2vw" }}>
                
                  Wishlist
                </div>
                                    
                                </Button>
                            )}
                              
                            </div>
                        </div>
                       
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Below2499;
