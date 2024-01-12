import React from 'react'
import './AdminServices.css'
import SidebarAdmin from '../componants/Admin/SideBarAdmin';


const service = () => {
    return (
        <>
            <SidebarAdmin />
       
        <div className='services1' style={{marginLeft: '21rem'}}>
        <div className='service.servicebox'>
            <p style={{
                backgroundColor:'white',
                height: '60px',
                marginTop: '-15px 0px',
                padding: '0px 568px',
                fontSize: '30px',
            }}><b>SERVICES</b></p>
            <div className="service.service1">
                <div className="services" >
                  
                </div>

                <div className="service.service">Id: 6445f738b35369f69da1c0b5</div>
                <div className="sercice.service">Name: nishitha464</div>
                <div className="service.service">TimeSlot: 10am - 11am</div>
                <div className="service.service">services: Haircut</div>
                <div className="service.service">Center: Rusty Spur Saloon</div>
            </div>

            
        </div>
        </div>
        </>
    )
}

export default service