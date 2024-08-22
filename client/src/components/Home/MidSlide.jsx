import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

// Responsive settings for Carousel
const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1440 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
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
          <Link to={`/deals/${tagline}`}>View All</Link>
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

const MidSlide = (props) => {
  const adURL =
    "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Advertisement Image */}
      <div className="hidden md:block mt-2 bg-white p-4 text-center flex-1">
        <div className="text-center font-semibold">Quote of the Day</div>
        <img
          src={adURL}
          className="w-full h-full object-contain p-4"
          alt="Advertisement"
        />
      </div>

      {/* Carousel Slide */}
      <div className="w-full md:w-3/4 lg:w-2/3">
        {props.multi === true && <MultiSlide {...props} />}
      </div>

      {/* Right Advertisement Image */}
      <div className="hidden lg:block mt-2 bg-white p-4 text-center flex-1">
        <div className="text-center font-semibold">Quote of the Day</div>
        <img
          src={adURL}
          className="w-full h-full object-contain p-4"
          alt="Advertisement"
        />
      </div>
    </div>
  );
};

export default MidSlide;

// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Countdown from "react-countdown";
// import { Link } from "react-router-dom";

// // Responsive settings for Carousel
// const responsive = {
//   largeDesktop: {
//     breakpoint: { max: 3000, min: 1440 },
//     items: 4,
//   },
//   desktop: {
//     breakpoint: { max: 1440, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 640 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 640, min: 0 },
//     items: 1,
//   },
// };

// const timerURL =
//   "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

// const RenderTimer = ({ hours, minutes, seconds }) => {
//   return (
//     <span className="hidden sm:inline">
//       {hours} : {minutes} : {seconds} Left
//     </span>
//   );
// };

// const MultiSlide = ({ products, timer, tagline }) => {
//   const data = products;
//   return (
//     <div className="mt-2 bg-white">
//       <div className="flex p-4">
//         <div className="text-xl font-semibold leading-8 mr-6">{tagline}</div>
//         {timer && (
//           <div className="text-gray-500 ml-2 flex items-center">
//             <img src={timerURL} className="w-6" alt="time clock" />
//             <Countdown date={Date.now() + 5.04e7} renderer={RenderTimer} />
//           </div>
//         )}
//         <button className="ml-auto bg-blue-600 text-white rounded px-4 py-1 text-xs">
//           <Link to={`/deals/${tagline}`}>View All</Link>
//         </button>
//       </div>
//       <hr />
//       <Carousel
//         swipeable={false}
//         draggable={false}
//         responsive={responsive}
//         centerMode={true}
//         infinite={true}
//         autoPlay={true}
//         autoPlaySpeed={10000}
//         keyBoardControl={true}
//         showDots={false}
//         containerClass="carousel-container"
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-40-px"
//       >
//         {data.map((temp) => (
//           <Link
//             to={`product/${temp.id}`}
//             key={temp.id}
//             className="no-underline"
//           >
//             <div className="text-center p-6">
//               <img
//                 src={temp.url}
//                 className="h-36 w-auto m-auto"
//                 alt={temp.title.shortTitle}
//               />
//               <div className="text-lg font-semibold text-gray-900 mt-2">
//                 {temp.title.shortTitle}
//               </div>
//               <div className="text-green-500">{temp.discount}</div>
//             </div>
//           </Link>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// const MidSlide = (props) => {
//   const adURL =
//     "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";

//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Left Advertisement Image */}
//       <div className="flex flex-col hidden md:block mt-2 bg-white p-2 text-center flex-1">
//         <div className="text-centre">Quote of the Day</div>
//         <img
//           src={adURL}
//           className="w-full h-full object-contain"
//           alt="Advertisement"
//         />
//       </div>

//       {/* Carousel Slide */}
//       <div className="w-full md:w-3/4 lg:w-2/3">
//         {props.multi === true && <MultiSlide {...props} />}
//       </div>

//       {/* Right Advertisement Image */}
//       <div className="flex flex-col hidden lg:block mt-2 bg-white p-2 text-center flex-1">
//         <div className="text-centre">Quote of the Day</div>
//         <img
//           src={adURL}
//           className="w-full h-full object-contain"
//           alt="Advertisement"
//         />
//       </div>
//     </div>
//   );
// };

// export default MidSlide;

// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Countdown from "react-countdown";
// import { Link } from "react-router-dom";

// // Responsive settings for Carousel
// const responsive = {
//   largeDesktop: {
//     breakpoint: { max: 3000, min: 1440 },
//     items: 4,
//   },
//   desktop: {
//     breakpoint: { max: 1440, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 640 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 640, min: 0 },
//     items: 1,
//   },
// };

// const timerURL =
//   "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

// const RenderTimer = ({ hours, minutes, seconds }) => {
//   return (
//     <span className="hidden sm:inline">
//       {hours} : {minutes} : {seconds} Left
//     </span>
//   );
// };

// const MultiSlide = ({ products, timer, tagline }) => {
//   const data = products;
//   return (
//     <div className="mt-2 bg-white">
//       <div className="flex p-4">
//         <div className="text-xl font-semibold leading-8 mr-6">{tagline}</div>
//         {timer && (
//           <div className="text-gray-500 ml-2 flex items-center">
//             <img src={timerURL} className="w-6" alt="time clock" />
//             <Countdown date={Date.now() + 5.04e7} renderer={RenderTimer} />
//           </div>
//         )}
//         <button className="ml-auto bg-blue-600 text-white rounded px-4 py-1 text-xs">
//           <Link to={`/deals/${tagline}`}>View All</Link>
//         </button>
//       </div>
//       <hr />
//       <Carousel
//         swipeable={false}
//         draggable={false}
//         responsive={responsive}
//         centerMode={true}
//         infinite={true}
//         autoPlay={true}
//         autoPlaySpeed={10000}
//         keyBoardControl={true}
//         showDots={false}
//         containerClass="carousel-container"
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-40-px"
//       >
//         {data.map((temp) => (
//           <Link
//             to={`product/${temp.id}`}
//             key={temp.id}
//             className="no-underline"
//           >
//             <div className="text-center p-6">
//               <img
//                 src={temp.url}
//                 className="h-36 w-auto m-auto"
//                 alt={temp.title.shortTitle}
//               />
//               <div className="text-lg font-semibold text-gray-900 mt-2">
//                 {temp.title.shortTitle}
//               </div>
//               <div className="text-green-500">{temp.discount}</div>
//             </div>
//           </Link>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// const MidSlide = (props) => {
//   const adURL =
//     "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";

//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Left Advertisement Image */}
//       <div className="hidden md:block mt-2 bg-white mr-1 p-1 text-center">
//         <img src={adURL} className="w-1/4 md:w-17%" alt="Advertisement" />
//       </div>

//       {/* Carousel Slide */}
//       <div className="w-full md:w-3/4 lg:w-2/3">
//         {props.multi === true && <MultiSlide {...props} />}
//       </div>

//       {/* Right Advertisement Image */}
//       <div className="hidden lg:block mt-2 bg-white ml-1 p-1 text-center">
//         <img src={adURL} className="w-1/4 md:w-17%" alt="Advertisement" />
//       </div>
//     </div>
//   );
// };

// export default MidSlide;

// import React from 'react';
// // import Slide from './Slide';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Countdown from "react-countdown";
// import { Link } from "react-router-dom";

// // Responsive settings for Carousel
// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

// const timerURL =
//   "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

// const RenderTimer = ({ hours, minutes, seconds }) => {
//   return (
//     <span className="hidden sm:inline">
//       {hours} : {minutes} : {seconds} Left
//     </span>
//   );
// };

// const MultiSlide = ({ products, timer, tagline }) => {
//   // const data = products.filter(
//   //   (item) => item.tagline.trim().toLowerCase() === tagline.trim().toLowerCase()
//   // );
//   const data = products;
//   return (
//     <div className="mt-2 bg-white">
//       <div className="flex p-4">
//         <div className="text-xl font-semibold leading-8 mr-6">{tagline}</div>
//         {timer && (
//           <div className="text-gray-500 ml-2 flex items-center">
//             <img src={timerURL} className="w-6" alt="time clock" />
//             <Countdown date={Date.now() + 5.04e7} renderer={RenderTimer} />
//           </div>
//         )}

//           <button className="ml-auto bg-blue-600 text-white rounded px-4 py-1 text-xs">
//           <Link to={`/deals/${tagline}`}>
//           View All
//            </Link>
//           </button>

//       </div>
//       <hr />
//       <Carousel
//         swipeable={false}
//         draggable={false}
//         responsive={responsive}
//         centerMode={true}
//         infinite={true}
//         autoPlay={true}
//         autoPlaySpeed={10000}
//         keyBoardControl={true}
//         showDots={false}
//         containerClass="carousel-container"
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-40-px"
//       >
//         {data.map((temp) => (
//           <Link
//             to={`product/${temp.id}`}
//             key={temp.id}
//             className="no-underline"
//           >
//             <div className="text-center p-6">
//               <img
//                 src={temp.url}
//                 className="h-36 w-auto m-auto"
//                 alt={temp.title.shortTitle}
//               />
//               <div className="text-lg font-semibold text-gray-900 mt-2">
//                 {temp.title.shortTitle}
//               </div>
//               <div className="text-green-500">{temp.discount}</div>
//             </div>
//           </Link>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// // const Slide = (props) => {
// //   return <>{props.multi === true && <MultiSlide {...props} />}</>;
// // };

// // export default Slide;

// const MidSlide = (props) => {
//     const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

//     return (
//       <div className="flex">
//         <div className="hidden md:block mt-2 bg-white mr-1 p-1 text-center">
//           <img src={adURL} className="w-17% " alt="Advertisement" />
//         </div>

//         <div className="w-full md:w-66%">
//           {/* <Slide
//             products={products}
//             tagline="Deal of the Day"
//             timer={true}
//             multi={true}
//           /> */}
//           {props.multi === true && <MultiSlide {...props} />}
//         </div>
//         <div className="hidden md:block mt-2 bg-white ml-1 p-1 text-center">
//           <img src={adURL} className="w-17% m-auto" alt="Advertisement" />
//         </div>
//       </div>
//     );
// }

// export default MidSlide;
