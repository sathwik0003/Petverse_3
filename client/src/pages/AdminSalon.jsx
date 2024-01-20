import { useState, useEffect } from 'react';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import { Image } from '@chakra-ui/react';
import './AdminSalon.css';


const AdminSalon = () => {
  const [salons, setSalons] = useState([]);

  const labelStyle = {
    fontFamily: 'Open Sans, sans-serif',
  };                                      

  useEffect(() => {
    fetchSalons();
  }, [salons, setSalons]);

  const fetchSalons = async () => {
    try {
      const response = await fetch(`http://localhost:3001/salon`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setSalons(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (                                
    <>
      <div className="container">
        {salons.map((item) => (
          <div
            key={item.id}
            className="saloon-container1"
          >
            <div className="image-container">
              <Image
                src={item.image}
                alt="Your Image"
                className="img-fluid"
                style={{ height: '13rem' }}
                boxSize="20rem"
              />
            </div>
            <div className="content-container">
              <h2 className="title" style={{ marginBottom: '20px', ...labelStyle }}>
                {item.title}
              </h2>
              <p className="description" style={{ ...labelStyle }}>
                {item.description}
              </p>
              <br />
              <div className="location">
                <h6 style={{ ...labelStyle }}><b>Location:</b> {item.address}</h6>
              </div>
              <div className="location">
                <h6 style={{ ...labelStyle }}><b>Phone:</b> {item.phoneNumber}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminSalon;
