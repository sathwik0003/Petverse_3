import { useState, useEffect } from 'react';
import './UserOrders.css';
import { useParams } from 'react-router-dom';
import Header from '../componants/Header';
import { Image, Box } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa'; // Importing the FaUser icon
import { Link } from 'react-router-dom';
const UserOrders = ({ userid }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://petverse-3.onrender.com/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const groupOrdersByUserId = () => {
    const groupedOrders = {};

    orders.forEach(order => {
      const { userId } = order;
      if (userid == userId) {
        if (!groupedOrders[userId]) {
          groupedOrders[userId] = [];
        }

        groupedOrders[userId].push(order);
      }
    });

    return groupedOrders;
  };

  const groupedOrders = groupOrdersByUserId();

  const addToCart = async (product) => {
    try {

      if (!cart.some((item) => item.title === product.title)) {
        const { id, title, description, pet_category, product_category, available, price, image, brandcode } = product;
        setCart((prevCart) => [...prevCart, product]);
        setShowToast(true);
        const response = await fetch(`https://petverse-3.onrender.com/api/cart/${userid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: { id, title, description, pet_category, product_category, available, price, image, brandcode },
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }


      }
      // You can handle success, e.g., show a toast or update UI
    } catch (error) {
      console.error('Error adding the cart:', error);
    }
  };

  return (
    <>
      <div className="admin-orders">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Object.keys(groupedOrders).map(userId => (
            <div key={userId} className="user-orders">
              {groupedOrders[userId].map(order => (
                <Box key={order._id} style={{ borderWidth: '1px', padding: '0px', marginBottom: '20px', border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '9px' }}>
                  <Box style={{ display: 'flex',flexWrap:'wrap', borderBottom: '1px solid #ddd' }}>
                    <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                      <p style={{
                        margin: '1px',
                        fontSize: '21px'
                      }}>Name</p>
                      <p style={{ display: 'flex' ,flexWrap:'wrap'}}>
                        <b> {userId}</b>
                      </p>
                    </Box>
                    <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                      <p style={{
                        margin: '1px',
                        fontSize: '21px'
                      }}>Date</p>
                      <b> <p>17-02-2023</p></b>
                    </Box>
                    <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>

                      <p style={{
                        margin: '1px',
                        fontSize: '21px'
                      }}>
                        Total Amount
                      </p>
                      <p>
                        <b> ₹{order.totalAmount}</b>
                      </p>



                    </Box>
                    <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                      <p style={{
                        margin: '1px',
                        fontSize: '21px'
                      }}>Order Id</p>
                      <b> <p>{order._id}</p></b>
                    </Box>
                  </Box>
                  <ul className="order-list">
                    <li className="order-item">
                      <div className="product-details">
                        {order.products.map(product => (
                          <>
                            <div key={product.title} style={{ display: 'flex',flexWrap:'wrap' }}>
                              <Image src={`http://localhost:3002/uploads/${product.image}`} alt={product.title} boxSize="5vw" style={{ margin: '1px 58px' }} />
                              <Box style={{ display: 'flex',flexWrap:'wrap' }} >
                                <Box style={{ width: '27rem' }}>
                                  <p style={{
                                    fontWeight: 'bold',
                                    marginRight: '34px',
                                    marginLeft: '22px'
                                  }}>{product.title}</p>
                                  <p style={{
                                    fontWeight: 'bold',
                                    marginRight: '34px',
                                    marginLeft: '22px'
                                  }}>Quantity: {product.quantity}</p>
                                  <p style={{
                                    fontWeight: 'bold',
                                    marginRight: '34px',
                                    marginLeft: '22px'
                                  }}>Price: ₹{product.price}</p>
                                </Box>
                                <Link to={`/product/${userid}/${product.title}`}>
                                  <button style={{
                                    background: 'RGBA(0, 0, 0, 0.36)',
                                    color: 'black',
                                    width: '19rem',
                                    height: '3.5rem',
                                    margin: '1rem'
                                  }}>View Item</button>
                                </Link>

                                <button style={{
                                  background: 'RGBA(0, 0, 0, 0.36)',
                                  color: 'black',
                                  width: '19rem',
                                  height: '3.5rem',
                                  margin: '1rem'
                                }} onClick={() => addToCart(product)}>Buy Again</button>
                              </Box>

                            </div>

                          </>
                        ))}
                      </div>
                    </li>
                  </ul>
                </Box>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserOrders;
