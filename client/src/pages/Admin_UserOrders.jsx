import { useState, useEffect } from 'react';
import './AdminOrders.css';
import { useParams } from 'react-router-dom';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import { Image, Box } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa'; // Importing the FaUser icon
import { Link } from 'react-router-dom';
const Admin_UserOrders = () => {
    const {userid}=useParams()
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

  return (
    <>
    <SidebarAdmin/>
      <div className="admin-orders">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Object.keys(groupedOrders).map(userId => (
            <div key={userId} className="user-orders"  style={{marginLeft:'21vw'}}>
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
                              
                                

                              </Box>

                            </div>

                          </>
                        ))}
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

export default Admin_UserOrders;
