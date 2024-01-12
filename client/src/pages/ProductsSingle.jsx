import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';

import Reviews from './reviews';
import { useParams } from 'react-router-dom';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Star from "./star";
import Footer from '../componants/mainpage/Footer';
const ProductsSingle = () => {
  const { userid, producttitle } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${producttitle}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [producttitle]);



  if (!product) {
    return <div>Loading...</div>;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  }
  const data = [
    {
      name: 'nishitha',
      review: 'good'
    },
    {
      name: 'Sathwik',
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


  return (
    <>

      <ProductsCard {...product} />;
      <div className="reviewdiv1">
        <div className="reviewdiv2">
          <div className="reviewdiv3">
            <Slider {...settings} style={{}}>
              {data.map((d, index) => (
                <div className="reviewdiv4" key={index} style={{ width: '85%' }}>
                  <div className="reviewdiv5">
                    <div className="reviewavatar">{d.name.charAt(0).toUpperCase()}</div>
                  </div>
                  <div className="reviewstar">
                    <Star></Star>
                  </div>
                  <div className="reviewdiv6">

                    <p className="reviewp1">{d.name}</p>
                    <p>{d.review}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
};

export default ProductsSingle;