import React from "react";
import Heade2r from '../componants/Heade2r'
import Header from '../componants/Header'
import Mum from '../assets/mum.png'
import Del from '../assets/del.png'
import Hyd from '../assets/hyd.png'
import Che from '../assets/ben.png'
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'
import s4 from '../assets/s4.png'
import img from '../assets/grooming.jpg'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Salon=()=>{
    const { userid } = useParams();
    console.log(userid)
    return(
        <>
        {userid !== undefined ? (
        <Header />
      ) : <Heade2r/>}
        <div style={{
    maxHeight: '700px',
    height: '80vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: '#dedede'}}>
            <img src={img} style={{  
    backgroundSize: 'cover',
    width: '83%',
    height: '102%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem'}}/>
     {/* <div style={{    marginTop: '8px',
    textAlign: 'center',
    fontWeight: '500'}}>

        <h1 style={{color: '#fff',
    fontWeight: '700'}}>Pet Grooming Service</h1>
    
    </div> */}
        </div>
       
        <div style={{    textAlign: 'center',paddingTop: '40px',paddingBottom: '40px'}}>

           <div style={{    fontSize: '32px',fontWeight: '900',lineHeight: '1.4',textAlign: 'center',color: '#515252',margin: '35px'}}> Book Cat & Dog Grooming Services</div>
<div style={{fontSize: '16px',fontWeight: '500',color: '#040416',marginBottom: '15px'}}>You can book pet grooming services on the basis of your pet requirements on PetVerse, From basic baths & blow-dry to brushing, from anti-fleas treatment to de-shedding we have covered it all, Now you can Book a standard bath & blow-dry to full-service grooming. The Pet Groomer brings all its equipment and provides their services from the comfort of your home. you'll get matched with a pet groomer who will reached at your home within the scheduled arrival window.
</div>
<div style={{fontSize: '16px',fontWeight: '500',color:'#040416',marginBottom: '15px'}}>
Book a Professional Pet groomer That Will Come to your home.
</div>
<div style={{fontSize: '16px',fontWeight: '500',color:'#040416',marginBottom: '15px'}}>
 Stress-free. Pet groomer come to your home, so your pet will get one-on-one attention at the comfort of your home.</div>
 <div style={{fontSize: '16px',fontWeight: '500',color:'#040416',marginBottom: '15px'}}>
 Book online. No need for phone calls & early appointment visits to the Pet spa near you! Our online booking keeps things simple and after service, your house is clean like before.</div>
 </div>

 <div style={{display: 'flex',
    alignItems: 'center',
    justifyContent:' center'}}>
    <Link to={`/salons/${userid}/mumbai`}> <img src={Mum}/></Link>
    <Link to={`/salons/${userid}/hyderabad`}> <img src={Hyd}/></Link>
    <Link to={`/salons/${userid}/chennai`}> <img src={Che}/></Link>
    <Link to={`/salons/${userid}/delhi`}> <img src={Del}/></Link>
    
    
 </div>
 
 <div style={{    fontSize: '32px',fontWeight: '900',lineHeight: '1.4',textAlign: 'center',color: '#515252',margin: '35px'}}>Steps to Book a Service</div>
 <div style={{display: 'flex',
    alignItems: 'center',
    justifyContent:' center'}}>
    <img src={s1}/>
    <img src={s2}/>
    <img src={s3}/>
    <img src={s4}/>
 </div>
 <div style={{display: 'flex',
    alignItems: 'center',
    justifyContent:' center'}}>
   <h5 style={{    width: '513px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>Choose a Package</h5>
   <h5 style={{    width: '513px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>Select a nearest Salon and Schedule Date and Time</h5>
   <h5 style={{    width: '513px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>Easy Payment Options</h5>

   <h5 style={{    width: '513px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>Get Grooming Service</h5>
 </div>
        </>
    )
}

export default Salon