import React, { useEffect, useState } from 'react';

function Banner() {
  const [current, setCurrent] = useState(0);

  const images = [
    "BannerImg/Biriyani Banner.jpg",
    "BannerImg/Burger Banner.jpg",
    "BannerImg/Pizza Banner.jpg",
    "BannerImg/Ice cream Carousel.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Carousel */}
      <div className="relative w-full h-48 sm:h-72 md:h-[400px] overflow-hidden rounded-xl shadow-lg">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              current === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-orange-500' : 'bg-gray-300'
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
