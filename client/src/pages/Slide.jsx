// src/Slide.js
import React from 'react';
import Review from './Review';

const Slide = ({ reviews, currentSlide }) => {
  const startIndex = currentSlide * 3;
  const endIndex = startIndex + 3;
  const visibleReviews = reviews.slice(startIndex, endIndex);

  return (
    <div className="slide">
      {visibleReviews.map((review, index) => (
        <Review key={index} {...review} />
      ))}
    </div>
  );
};

export default Slide;


