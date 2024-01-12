import  { useState, useEffect } from 'react';
import { Image, Button } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import './Productpag.css';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';


const AdminProducts = () => {

  

    const [brandFilter, setBrandFilter] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const [specieFilter, setSpecieFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [items, setItems] = useState([]);
   
  
    useEffect(() => {
        fetchProducts();
      }, []);
      

    
    
      const fetchProducts = async () => {
        try {
          console.log('hi')
          console.log(specieFilter)
          console.log(categoryFilter)
         
          const response = await fetch(`http://localhost:3001/products?specie=${specieFilter}&brand=${brandFilter}&price=${priceFilter}&category=${categoryFilter}`);
          
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
      const deleteProduct = async (title) => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${title}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Product deleted successfully');
                // Update the state after successful deletion
                setItems(prevItems => prevItems.filter(item => item.title !== title));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error during product deletion:', error);
        }
    };
   


    return (
        <>
         <SidebarAdmin/>
     
        <div style={{marginLeft: '25rem'}} >
         

            <div className="mainproduct1">


                {items.map((item) => (
                    <div key={item.id} className="ppcard">
                   
                   
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                boxSize="20vw"
              />
          
                     
                        <div style={{ backgroundColor: "white" }}>
                            <div style={{ color: "#212529b5", fontSize: "1vw", marginLeft: "2vw" }}>
                                {item.brandName}
                            </div>
                            <div style={{ marginLeft: "2vw" }}>{item.title}</div>
                            <div style={{ marginLeft: "2vw" }}>
                                <b>₹{item.price}</b>
                            </div>
                            <div style={{ marginLeft: "2vw" }}></div>
                           
                              
                            </div>
                            <Button
                                        colorScheme="red"
                                        variant="outline"
                                        size="sm"
                                        height="3vw"
                                        width="8.7vw"
                                        fontSize="1.5vw"
                                        marginRight="1vw"
                                        marginBottom="0.6vw"
                                        background='red'
                                        onClick={() => deleteProduct(item.title)}
                                    >
                                        <div style={{ padding: "0.2vw" }}>Delete</div>
                                    </Button>
                        </div>
                       
                  
                ))}
            </div>
        </div>
        </>
    );
};

export default AdminProducts;
