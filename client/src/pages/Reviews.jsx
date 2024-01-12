import React from "react";
import './Reviews.css';
import imgg from '../assets/Slider1.jpg'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Star from "./star";


const Reviews = () => {

    const data = [
        {
            name: 'David Warner',
            review: 'Good product and my pet loved it'
        },
        {
            name: 'srilekha',
            review: 'good'
        },
        {
            name: 'nishitha',
            review: 'good'
        },
        {
            name: 'nishitha',
            review: 'good'
        },
        {
            name: 'nishitha',
            review: 'good'
        },
        {
            name: 'nishitha',
            review: 'good'
        },
        {
            name: 'nishitha',
            review: 'good'
        },
        {
            name: 'nishitha',
            review: 'good'
        }
    ];

    const settings={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:4,
        slidesToScroll:4
    }

    return (
        <div className="div1">
            <div className="div2">
                <div className="div3">
                <Slider {...settings} style={{  }}>
                    {data.map((d, index) => (
                        <div className="div4" key={index} style={{width:'85%'}}>
                            <div className="div5">
                            <div className="avatar">{d.name.charAt(0).toUpperCase()}</div>
                            </div>
                            <div className="star">
                            <Star></Star>
                            </div>
                            <div className="div6">
                          
                                <p className="p1">{d.name}</p>
                                <p>{d.review}</p>
                            </div>
                        </div>
                    ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Reviews;
