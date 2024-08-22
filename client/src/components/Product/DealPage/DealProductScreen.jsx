import React from "react";
import DealProductCarousel from "./DealProductCarousel";
import DealProductCard from "./DealProductCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DealProductScreen() {
  const { text } = useParams();
  const { products } = useSelector((state) => state.getProducts);
  const items = products;

  return (
    <div className="w-[95vw] m-auto">
      <DealProductCarousel items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item.id} className="px-2 mb-4">
            <DealProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealProductScreen;

// import React from "react";
// import DealProductCarousel from "./DealProductCarousel";
// import { useSelector } from "react-redux";
// import DealProductCard from "./DealProductCard";
// import { useParams } from "react-router-dom";

// function DealProductScreen() {
//   const { text } = useParams();

//   const { products } = useSelector((state) => state.getProducts);
//     //   const items = products.filter((item) => item.category === text);
//     // const items = products.filter(
//     //   (item) =>
//     //     item.tagline.trim().toLowerCase() === text.trim().toLowerCase()
//   // );
//   const items = products;

//   return (
//     <div className="w-[95vw] m-auto">
//       <DealProductCarousel items={items} />
//       <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
//         {items.map((item) => (
//           <div key={item.id} className="px-2 mb-4">
//             <DealProductCard item={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DealProductScreen;
