import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { bannerData } from '../../constants/data';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = bannerData.length;

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        if (!isTransitioning) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }
      }, 3000); // Matches autoPlaySpeed from original settings

      return () => clearInterval(interval);
    }
  }, [isTransitioning, totalSlides, isHovered]);

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 1000); // Matches transition duration
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 1000); // Matches transition duration
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Determine the number of slides to show based on the screen size
  const getVisibleSlides = () => {
    const width = window.innerWidth;
    if (width >= 1024) return responsive.desktop.items;
    if (width >= 464) return responsive.tablet.items;
    return responsive.mobile.items;
  };

  return (
    <div
      className='w-full h-[180px] sm:h-[260px] relative group mb-2 overflow-hidden'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{ backgroundImage: `url(${bannerData[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover transition-transform duration-1000'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='absolute bottom-0 left-0 right-0 flex justify-center py-2'>
        {bannerData.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer mx-1 ${slideIndex === currentIndex ? 'text-white' : 'text-gray-500'}`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;













// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import { bannerData } from '../../constants/data';

// const responsive = {
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 1,
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 1,
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1,
//     }
// };

// const Banner = () => {
//     return (
//         <Carousel
//             swipeable={false}
//             draggable={false}
//             responsive={responsive}
//             infinite={true}
//             autoPlay={true}
//             autoPlaySpeed={4000}
//             keyBoardControl={true}
//             showDots={true}
//             slidesToSlide={1}
//             containerClass="carousel-container"
//             dotListClass="custom-dot-list-style"
//             itemClass="carousel-item-padding-40-px"
//         >
//             {
//                 bannerData.map(image => (
//                     <img
//                         src={image.url}
//                         alt="banner"
//                         key={image.id}
//                         className="w-full h-32 sm:h-72 object-cover"
//                     />
//                 ))
//             }
//         </Carousel>
//     );
// }

// export default Banner;
