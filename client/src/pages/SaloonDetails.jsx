
import Grooming from './grooming';

import './services.css'
import { Link } from 'react-router-dom';



const SaloonDetails = ({ title,
  image,
  description,
  address,
  phone,
userid}) => {
 
 const handleSubmit=()=>{
  window.location.href=`/salon/payment/${userid}`
 }



  return (
    <>
    <div className="saloon">
      <div className="sald">
        <div className="saloondetails">
          <h1 id="h1"><br />{title}</h1>
        </div>
        <div className="saloondetails">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="salp">
        <div className="saloondetails"><b></b>Description<br />{description}</div><br />
        <div className="saloondetails">
          <b>Address:</b>{address}<br />

          <br /><br /><b>Phone:</b>{phone}<br />
        </div>
      </div>
      
    </div>
    <Grooming/>
    <form onSubmit={handleSubmit}>
      <div className="saloon1">
        <div className="services">
        <div className="serv" id="serv1">
                    <p>Services</p><br/>

                        <select id="" name="service" >
                            
                            <option value="Spa Bath">Spa Bath</option>
                            <option value="Full Service">Full Service</option>
                            <option value="Transfurmation">Transfurmation</option>
                          </select>
                   
              
           </div>
        
        </div>
        <div className="service">
        <p>Book  a slot </p><br/>
                <select id="" name="timeslot">
                    <option value="10am - 11am">10am - 11am</option>
                    <option value="11am - 12pm">11am - 12pm</option>
                    <option value="2pm - 3pm">2pm - 3pm</option>
                    <option value="3pm - 4pm">3pm - 4pm</option>
                    <option value="4pm - 5pm">4pm - 5pm</option>
                  </select>
        </div>
      </div>
      <div className="saloon2">
        <div id="paysal1"><h3><b>EXCLUSIVELY PAY LATER FOR SERVICES</b></h3>pay 100/- now</div>
        <div id="paysal2">
          <button type="submit"><Link to={`/salon/payment/${userid}`} style={{textDecoration:'none',color:'white'}}>BOOK NOW</Link></button>
        </div>
      </div>
    </form>
    </>
  );
};

export default SaloonDetails;
