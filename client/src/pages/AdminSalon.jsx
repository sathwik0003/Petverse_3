import { useState, useEffect } from 'react';
import saloon1 from '../assets/grooming.jpg';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import { Image } from '@chakra-ui/react';

const AdminSalon = () => {

  const [salons, setSalons] = useState([]);
 
  const labelStyle = {
    fontFamily: 'Open Sans, sans-serif',
  };

  useEffect(() => {
    fetchSalons();
  }, [ salons, setSalons]);

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
     <SidebarAdmin/>
      <div className="container" style={{marginLeft: '21rem',
    width: '72rem'}}>
      <>
        {salons.map((item) => (
          <>
          <div className="saloon-container1" style={{ display: 'flex' }}>
            <div className="image-container">
              <Image src={item.image} alt="Your Image" className="img-fluid" style={{ margin:'5rem',height:'13rem' }} boxSize='20rem' />
            </div>
            <div className="content-container" style={{ marginLeft: '87px', marginTop: '15px' }}>
              <h2 className="title" style={{ marginLeft: '20px', marginBottom: '20px', labelStyle }}>{item.title}</h2>
              <p className="description" style={{ marginLeft: '25px', labelStyle }}>
                {item.description}
              </p>
              <br />
              <div className="location">
                <h6 style={{ marginLeft: '24px', labelStyle }}><b>Location:</b> {item.address}</h6>
              </div>
              <div className="location">
                <h6 style={{ marginLeft: '24px', labelStyle }}><b>Phone:</b> {item.phoneNumber}</h6>
              </div>
             
            </div>
          </div>
          <br /><br />
        
          </>
        ))}
        </>
      </div>
    </>
  );
}

export default AdminSalon;
