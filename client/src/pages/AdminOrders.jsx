import { useState, useEffect } from 'react';
import './AdminOrders.css';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';

const AdminOrders = () => {
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

  return (
    <div className="admin-orders">
      <SidebarAdmin />
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
                      <div key={product.title} style={{display:'flex'}}>
                      <img src={product.image} alt={product.title} style={{width:'12rem'}}></img>
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
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
