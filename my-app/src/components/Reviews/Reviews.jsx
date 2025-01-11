import React, { useEffect, useState } from "react";
import "./Reviews.css";

const reviews = [
  {
    name: "RAYA NIKOLOVA",
    feedback: "The sunglasses are amazing. Thank you from the bottom of my heart!",
  },
  {
    name: "IVAN PETROV",
    feedback: "Great service and high-quality products!",
  },
  {
    name: "ELENA GEORGIEVA",
    feedback: "Fast delivery and excellent quality. Highly recommended!",
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, [])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="reviews-container">
      <h2 className="reviewsTitle">REVIEWS</h2>
      <div className="review-box">
        <button className="arrow left" onClick={handlePrev}>
          &#8249;
        </button>
        <div className="review-content">
          <h3>{reviews[current].name}</h3>
          <p>{reviews[current].feedback}</p>
        </div>
        <button className="arrow right" onClick={handleNext}>
          &#8250;
        </button>
      </div>
      <div className="indicators">
        {reviews.map((_, index) => (
          <span
            key={index}
            className={index === current ? "active" : ""}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
