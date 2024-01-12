import { useState, useEffect } from 'react';
import './AdminOrders.css';
import { useParams } from 'react-router-dom';
import Header from '../componants/Header';
import { Image } from '@chakra-ui/react';

const UserOrders = () => {
    const {userid}=useParams()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders');
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
      if(userid==userId){
        if (!groupedOrders[userId]) {
            groupedOrders[userId] = [];
          }
    
          groupedOrders[userId].push(order);

      }

   
    });

    return groupedOrders;
  };

  const groupedOrders = groupOrdersByUserId();

  const getProfilePic = (userId) => {
    return userId.charAt(0).toUpperCase();
  };

  return (
    <>
        <Header></Header>
    
    <div className="admin-orders">
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(groupedOrders).map(userId => (
          <div key={userId} className="user-orders">
            <h3 style={{ display: "flex" }}>
              <div className="profile-pic">{getProfilePic(userId)}</div> {userId}
            </h3>
            <ul className="order-list">
              {groupedOrders[userId].map(order => (
                <li key={order._id} className="order-item">
                  <div className="product-details">
                    {order.products.map(product => (
                      <div key={product.title}>
                      <Image src={product.image} alt={product.title} boxSize="5vw"></Image>
                        <p>{product.title}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ₹{product.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    <p><b>Total Amount: ₹{order.totalAmount}</b></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default UserOrders;
