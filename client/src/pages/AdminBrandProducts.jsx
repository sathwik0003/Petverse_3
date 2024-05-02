// ProductsPage.js
import React, { useState, useEffect } from 'react';
import { Image} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
const AdminBrandProducts = () => {
  const [items, setProducts] = useState([]);
  const { brandname } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [brandname]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://petverse-3.onrender.com/fetchproducts/${brandname}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
           src={`https://petverse-3.onrender.com/uploads/${item.image}`}
           alt={item.title}
           objectFit="cover"
           boxSize="20vw"
         />
     
                
                   <div style={{ backgroundColor: "white" }}>
                       <div style={{ color: "#212529b5", fontSize: "1vw", marginLeft: "2vw" }}>
                           {item.brandName}
                       </div>
                       <div style={{ marginLeft: "2vw" }}>{item.title}</div>
                       <div style={{display:'flex'}}>
                       <div style={{ marginLeft: "2vw" }}>
                           <b>Price:₹{item.price}</b>
                       </div>
                       <div style={{ marginLeft: "2vw" }}>
                           <b>Available:{item.available}</b>
                       </div>
                       <div style={{ marginLeft: "2vw" }}>
                           <b>Sold:{item.sold}</b>
                       </div>
                       </div>
                       <div style={{ marginLeft: "2vw" }}></div>
                      
                         
                       </div>
                      
                   </div>
                  
             
           ))}
       </div>
   </div>
   </>
  );
};

export default AdminBrandProducts;
