import React, { useState } from 'react';

const ContentSlider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out transform" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
      {/* <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePrev}>
        Prev
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>
        Next
      </button> */}
    </div>
  );
};

export default ContentSlider;
