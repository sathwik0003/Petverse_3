import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import './AdminSalon.css';

const AdminSalon = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const response = await fetch('https://petverse-3.onrender.com/salon');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSalons(data);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
  };

  const deleteProduct = async (title) => {
    try {
        const response = await fetch(`https://petverse-3.onrender.com/api/salon/${title}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Product deleted successfully');
            // Update the state after successful deletion
            setSalons(prevItems => prevItems.filter(item => item.title !== title));
        } else {
            console.error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error during product deletion:', error);
    }}

    const viewBookings= (title)=>{
      window.location.href=`/admin/salon/${title}`
    }

  return (
    <>
      <div>
        <SidebarAdmin />
        <div className="scontainer" style={{ marginLeft: '20vw', width: '70vw' }}>
          {salons.map((item) => (
            <div key={item._id} className="saloon-container1">
              <div className="image-container">
                <img
                  src={`https://petverse-3.onrender.com/uploads/${item.image}`}
                  alt="Salon Image"
                  className="img-fluid"
                  style={{ height: '13rem', margin:'3rem 1rem' }}
                />
              </div>
              <div className="content-container">
                <h2 className="title" style={{ marginBottom: '20px' }}>
                  {item.title}
                </h2>
                <p className="description">{item.description}</p>
                <br />
                <div className="location">
                  <h6><b>Location:</b> {item.address}</h6>
                </div>
                <div className="location">
                  <h6><b>Phone:</b> {item.phoneNumber}</h6>
                </div>
              </div>
              <div>
              <button>Edit</button>
              </div>
              <div>
              <button onClick={() => deleteProduct(item.title)}>Delete</button>
              </div>
              <div>
              <button style={{background:'green'}} onClick={()=>viewBookings(item.title)}>View Bookings</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSalon;
