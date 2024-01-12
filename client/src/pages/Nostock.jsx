// import React from 'react';
// import outofstockimage from '../assets/outofstock.jpg';
// import './Nostock.css';

// const Nostock = () => {
//   const containerStyle = {
//     margin: 0,
//     padding: 0,
//     height: '100vh',
//     background: `url(${outofstockimage}) center/cover no-repeat`,
//     overflow: 'hidden',
//     fontFamily: 'Arial, sans-serif', 
//   };

//   return (
//     <div className='outofstock' style={containerStyle}>
//       <div className="nostock-container">
//         <div className="wavy-designs"></div>
//         <div className="nostock-content">
//           <div className="nostock-text">
//             <h1 className='outofstockh1'>Oops! Out of Stock</h1>
//             <p>We regret to inform you that the item you are looking for is currently out of stock. Our team is working hard to restock this product as soon as possible.</p>
//             <p className='outofstockp'>In the meantime, feel free to browse our other amazing products.</p>
//             <button className="browse-more-button">Browse More</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nostock;

import React from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './Nostock.css'; // Make sure to create a corresponding CSS file

const Nostock = () => {
  const renderStars = (rating) => {
    const starArray = Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? '#FFD700' : '#C4C4C4'} />
    ));
    return <div className="star-rating">{starArray}</div>;
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1>Welcome to My React Page</h1>
        <p>This is a simple React page with a scrolling effect.</p>
        <div className="product-card">
          <img src="https://via.placeholder.com/150" alt="Product" />
          <div className="product-info">
            <h2>Product Title</h2>
            <p>Description of the product goes here.</p>
            <div className="price">{renderStars(4.5)} $19.99</div>
            <div className="buttons">
              <button className='nobutton'>
                <FaShoppingCart /> Add to Cart
              </button>
              <button>
                <FaHeart className='nobutton'/> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        {/* Repeat the product card as needed */}
      </div>
    </div>
  );
};

export default Nostock;

