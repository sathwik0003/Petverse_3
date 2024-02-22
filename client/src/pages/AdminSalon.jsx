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
      const response = await fetch('http://localhost:3002/salon');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSalons(data);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
  };

  return (
    <>
      <div>
        <SidebarAdmin />
        <div className="scontainer" style={{ marginLeft: '20vw', width: '70vw' }}>
          {salons.map((item) => (
            <div key={item._id} className="saloon-container1">
              <div className="image-container">
                <img
                  src={`http://localhost:3002/uploads/${item.image}`}
                  alt="Salon Image"
                  className="img-fluid"
                  style={{ height: '13rem' }}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSalon;
