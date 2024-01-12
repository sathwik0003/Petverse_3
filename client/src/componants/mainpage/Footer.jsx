import React from 'react'
import './Footer.css'
import { AiFillFacebook } from 'react-icons/ai';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import ComplaintsButton from '../../pages/Comp1';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Footer = () => {
  const {userid}=useParams()
  return (
    <div>
        <div className='footer'>
        <div className='footer1'>
       
          <div className='subfooter1'>know about our team</div>
          <div className='subfooter1'>Previous Orders</div>
        </div>
        <div className='footer4'>
          <div><Link to={`/faq/${userid}`} style={{textDecoration:'none', color:'black'}}>Faq</Link></div>
          <div>Complaints</div>
          <div>Help</div>
        </div>
        <div className='footer2'>
          <div>License</div>
          <div>Terms of Service</div>
          <div>privacy policy</div>
        </div>
        <div className='footer3'>
          <div>connect with us</div>
          <AiFillFacebook className='icons' />
          <AiFillInstagram className='icons' />
          <AiOutlineWhatsApp className='icons' />
        </div>
      </div>
      <div className='copyright'>
        copyright &copy; teamPETVERSE
      </div>

    </div>
  )
}

export default Footer