import { useState, useEffect } from 'react';
import { Image, Button } from '@chakra-ui/react';
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Header from '../componants/Header'
import './WishListPage.css'


const WishlistPage = () => {
    
  const { userid } = useParams();
  const [wishlist, setWishlist] = useState({ userId: '', products: [] });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/wishlist/${userid}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userid]);

  const removeFromWishlist = async (title) => {
    try {
      const response = await fetch(`http://localhost:3001/api/wishlist/${userid}/${title}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Update the local state after successfully removing from wishlist
      setWishlist((prevWishlist) => ({
        ...prevWishlist,
        products: prevWishlist.products.filter((product) => product.title !== title),
      }));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

 

  return (
    <div>
    <Header/>
      <h1 style={{    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '76px',
    padding: '1rem'}}>Wishlist</h1>
    <div className="mainproduct1">


{wishlist.products.map((product) => (
    <div key={product.id} className="ppcard">
        <Image src={product.image} alt={product.title} objectFit="cover" boxSize="20vw" />
        <div style={{ backgroundColor: "white" }}>
            <div style={{ color: "#212529b5", fontSize: "1vw", marginLeft: "2vw" }}>
                {product.brandName}
            </div>
            <div style={{ marginLeft: "2vw" }}>{product.title}</div>
            <div style={{ marginLeft: "2vw" }}>
                <b>₹{product.price}</b>
            </div>
            <div style={{ marginLeft: "2vw" }}></div>
            <div className="buttonproducts">
            <Button
            className='wishbutton'
            leftIcon={<FaRegTrashAlt />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={() => removeFromWishlist(product.title)}
          >
            Remove
          </Button>
          
            </div>
        </div>
    </div>
))}
</div>
    
    </div>
  );
};

export default WishlistPage;
