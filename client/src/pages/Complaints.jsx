import  { useState, useEffect } from 'react';
import './Complaints.css'; // Import your CSS file
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import CardInfo from '../componants/UI/CardInfo';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        console.log('hi')
        const response = await fetch('http://localhost:3001/api/complaints');
        const data = await response.json();
        setComplaints(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };
  
    fetchComplaints();
  }, []);
  
  return (
    <div className="complaint-container">
      <SidebarAdmin/>
      {loading ? (
      <p>Loading...</p>
    ) : <CardInfo complaints={complaints}/>}
    </div>
  );
};

export default Complaints;
