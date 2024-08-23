import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../../constants/data";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1, // Adjust the number of items to display
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1, // Adjust the number of items to display
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // Adjust the number of items to display
  },
};

const DealProductCarousel = () => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      showDots={true}
      slidesToSlide={1}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {bannerData.map((image) => (
        <img
          src={image.url}
          alt="banner"
          key={image.id}
          className="w-full h-32 sm:h-[300px] object-cover rounded-2xl"
        />
      ))}
    </Carousel>
  );
};

export default DealProductCarousel;
