import { useState, useEffect } from 'react';
import './AdminOrders.css';
import { useParams } from 'react-router-dom';
import { Image, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SellerOrders = ({ bc }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://petverse-3.onrender.com/api/order?bc=${bc}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data); 
        console.log(orders)// Assuming the backend response contains an object with a key 'orders'
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [bc]);

  return (
    <div className="admin-orders">
      {loading ? (
        <p>Loading...</p>
      ) : (
        orders.map(order => (
          <Box key={order._id} style={{ borderWidth: '1px', padding: '0px', marginBottom: '20px', border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '9px' }}>
            <Box style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
              <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                <p style={{ margin: '1px', fontSize: '21px' }}>Name</p>
                <p style={{ display: 'flex' }}><b>{order.userId}</b></p>
              </Box>
              <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                <p style={{ margin: '1px', fontSize: '21px' }}>Date</p>
                <b><p>{order.dateCreated}</p></b>
              </Box>
              <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                <p style={{ margin: '1px', fontSize: '21px' }}>Total Amount</p>
                <p><b> ₹{order.totalAmount}</b></p>
              </Box>
              <Box style={{ width: '20rem', padding: '1px 44px', fontSize: '16px' }}>
                <p style={{ margin: '1px', fontSize: '21px' }}>Order Id</p>
                <b><p>{order._id}</p></b>
              </Box>
            </Box>
            <ul className="order-list">
              {order.products.map(product => (
                <li key={product._id} className="order-item">
                  <div className="product-details">
                    <div style={{ display: 'flex' }}>
                      <Image src={`http://localhost:3002/uploads/${product.image}`} alt={product.title} boxSize="5vw" style={{ margin: '1px 58px' }} />
                      <Box style={{ display: 'flex',flexWrap:'wrap' }} >
                        <Box style={{ width: '57rem',display:'flex',flexWrap:'wrap',margin:'32px 4px' }}>
                          <p style={{ fontWeight: 'bold', marginRight: '34px', marginLeft: '22px',width:'21rem' }}>{product.title}</p>
                          <p style={{ fontWeight: 'bold', marginRight: '34px', marginLeft: '22px' }}>Quantity: {product.quantity}</p>
                          <p style={{ fontWeight: 'bold', marginRight: '34px', marginLeft: '22px' }}>Price: ₹{product.price}</p>
                        </Box>
                        <Link to={`/sell/${bc}/${product.title}`}>
                          <button style={{ background: 'RGBA(0, 0, 0, 0.36)', color: 'black', width: '19rem', height: '3.5rem', margin: '1rem' }}>View Item</button>
                        </Link>
                      </Box>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Box>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
