import React, { useState, useEffect } from 'react';
import './Complaints.css'; 
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import CardInfo from '../componants/UI/CardInfo';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('https://petverse-3.onrender.com/api/complaints');
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchComplaints(); // Fetch complaints when the component mounts

    // Polling interval
    const intervalId = setInterval(fetchComplaints, 5000); // Adjust the interval as needed

    // Cleanup function to clear interval when the component unmounts
    return () => clearInterval(intervalId);
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
