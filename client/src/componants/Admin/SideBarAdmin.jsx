import React from "react";
import './SideBarAdmin.css'
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  const styles = {
    ".custom-link": {
      textDecoration: "none",
      color: "inherit",
    },
  };
    return (
      <div className="sidebar">
        <h2>PETVERSE</h2>
        <ul>
          <li><Link to='/admin/dashboard' className="custom-link">Home</Link></li>
          <li><Link to='/addsalon' className="custom-link" >Add Saloon</Link></li>
          <li><Link to='/admin/salon' className="custom-link">View Saloon</Link></li>
          <li><Link to='/admin/complaints' className="custom-link">View Complaints</Link></li>
          <li><Link to='/admin/services' className="custom-link">View Services</Link></li>
          <li><Link to='/admin/products' className="custom-link">View Products</Link></li>
         
          <li><Link to='/admin/orders' className="custom-link">View Orders</Link></li>
          <li onClick={() => {
 
  window.location.href = '/';
}}>Logout</li>
        </ul>
      </div>
    );
  }
  
  export default SidebarAdmin;