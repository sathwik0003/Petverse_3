import  { useState, useEffect } from 'react';
import './Complaints.css'; // Import your CSS file
import SidebarAdmin from '../componants/Admin/SideBarAdmin';

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
    ) : (
      <ul>
      {complaints.map((complaint) => (
  <li key={complaint.id} className="complaint-card">
    <div className="comprofile-pic">
      {complaint.username && complaint.username.charAt(0).toUpperCase()}
    </div>
    <div className="complaint-details">
      <div className="comusername"><b>USERNAME: </b>{complaint.username}</div>
      <div className="complaint-text"><b>COMPLAINT: </b>{complaint.complaint}</div>
      <div className="complaint-text"><b>PRODUCTS SUGGESTIONS: </b>{complaint.suggestions}</div>
    </div>
  </li>
))}


      </ul>
    )}
    </div>
  );
};

export default Complaints;
