import { useEffect } from "react";

import NavBar from "./NavBar";
import Banner from "./Banner";
import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../../redux/actions/productActions";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import Footer from "../Footer/Footer"

// function Home() {
//   const { products } = useSelector((state) => state.getProducts); // here getProducts is an object of (array of objects) in store;
//   // getProducts is {Products:[{},{},{}]};

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getProducts()); // here getProducts is an api or function connection home with productActions;
//   }, [dispatch]);

//   return (
//     <div className="w-[95vw] mx-auto">
//       <NavBar />
//       <Banner />
//       <MidSlide
//         products={products}
//         tagline="Deal of the Day"
//         timer={true}
//         multi={true}
//       />
//       <Slide
//         products={products}
//         tagline="Best Seller"
//         timer={false}
//         multi={true}
//       />

//       <Slide
//         products={products}
//         tagline="Suggested Items"
//         timer={false}
//         multi={true}
//       />
//       <MidSection />
//       <Slide
//         products={products}
//         tagline="Grab Now"
//         timer={false}
//         multi={true}
//       />
//     </div>
//   );
// }

// export default Home;


function Home() {
  const { products, loading, error } = useSelector(
    (state) => state.getProducts
  ); // Fetching from redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="w-[95vw] mx-auto">
      <NavBar />
      <Banner />

      {loading ? ( // Show loading spinner if products are being fetched
        <div className="text-center py-5">Loading products...</div>
      ) : error ? ( // Handle error case
        <div className="text-center py-5 text-red-500">Error: {error}</div>
      ) : (
        <>
          <MidSlide
            products={products}
            tagline="Deal of the Day"
            timer={true}
            multi={true}
          />
          <Slide
            products={products}
            tagline="Best Seller"
            timer={false}
            multi={true}
          />
          <Slide
            products={products}
            tagline="Suggested Items"
            timer={false}
            multi={true}
          />
          <MidSection />
          <Slide
            products={products}
            tagline="Grab Now"
            timer={false}
            multi={true}
          />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;
