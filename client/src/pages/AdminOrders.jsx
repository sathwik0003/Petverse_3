import { useState, useEffect } from 'react';
import './AdminOrders.css';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/orders');
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

      if (!groupedOrders[userId]) {
        groupedOrders[userId] = [];
      }

      groupedOrders[userId].push(order);
    });

    return groupedOrders;
  };

  const groupedOrders = groupOrdersByUserId();

  const getProfilePic = (userId) => {
    return userId.charAt(0).toUpperCase();
  };

  const toggleOrder = (userId) => {
    if (expandedOrder === userId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(userId);
    }
  };

  return (
    <div className="admin-orders">
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(groupedOrders).map(userId => (
          <div key={userId} className="user-orders">
            <h3 style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => toggleOrder(userId)}>
              <div className="profile-pic">{getProfilePic(userId)}</div> 
              <span>{userId}</span>
              <span>{expandedOrder === userId ? '↓' : '→'}</span>
            </h3>
            {expandedOrder === userId && (
              <ul className="order-list">
                {groupedOrders[userId].map(order => (
                  <li key={order._id} className="order-item">
                    <div className="order-info">
                      <p><b>Order ID:</b> {order._id}</p>
                      <p><b>Date:</b> {order.dateCreated}</p>
                      <p><b>Username:</b> {order.username}</p>
                    </div>
                    <div className="product-details">
                      {order.products.map(product => (
                        <div key={product.title} style={{display:'flex'}}>
                          <img src={`http://localhost:3002/uploads/${product.image}`} alt={product.title} style={{width:'12rem'}} />
                          <div>
                            <p>{product.title}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ₹{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-total">
                      <p><b>Total Amount: ₹{order.totalAmount}</b></p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
