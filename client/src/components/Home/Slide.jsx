import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

// Responsive settings for Carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const timerURL =
  "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

const RenderTimer = ({ hours, minutes, seconds }) => {
  return (
    <span className="hidden sm:inline">
      {hours} : {minutes} : {seconds} Left
    </span>
  );
};

const MultiSlide = ({ products, timer, tagline }) => {
  // const data = products.filter(
  //   (item) => item.tagline.trim().toLowerCase() === tagline.trim().toLowerCase()
  // );
  const data = products;
  return (
    <div className="mt-2 bg-white">
      <div className="flex p-4">
        <div className="text-xl font-semibold leading-8 mr-6">{tagline}</div>
        {timer && (
          <div className="text-gray-500 ml-2 flex items-center">
            <img src={timerURL} className="w-6" alt="time clock" />
            <Countdown date={Date.now() + 5.04e7} renderer={RenderTimer} />
          </div>
        )}
        
          <button className="ml-auto bg-blue-600 text-white rounded px-4 py-1 text-xs">
          <Link to={`/deals/${tagline}`}>
          View All
           </Link>
          </button>
       
      </div>
      <hr />
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        centerMode={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {data.map((temp) => (
          <Link
            to={`product/${temp.id}`}
            key={temp.id}
            className="no-underline"
          >
            <div className="text-center p-6">
              <img
                src={temp.url}
                className="h-36 w-auto m-auto"
                alt={temp.title.shortTitle}
              />
              <div className="text-lg font-semibold text-gray-900 mt-2">
                {temp.title.shortTitle}
              </div>
              <div className="text-green-500">{temp.discount}</div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

const Slide = (props) => {
  return <>{props.multi === true && <MultiSlide {...props} />}</>;
};

export default Slide;
