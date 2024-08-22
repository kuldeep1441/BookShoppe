import React from "react";
import CategoryProductCarousel from "./CategoryProductCarousel";
import CategoryProductCard from "./CategoryProductCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CategoryProductScreen() {
  const { text } = useParams();
  const { products } = useSelector((state) => state.getProducts);
  const items = products.filter((item) => item.category === text);

  return (
    <div className="w-[95vw] m-auto">
      <CategoryProductCarousel items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item.id} className="px-2 mb-4">
            <CategoryProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProductScreen;

// import React from "react";
// import { useSelector } from "react-redux";
// import CategoryProductCarousel from "./CategoryProductCarousel";
// import CategoryProductCard from "./CategoryProductCard";
// import { useParams } from "react-router-dom";

// function CategoryProductScreen() {
//   const { text } = useParams();

//   const { products } = useSelector((state) => state.getProducts);
//   const items = products.filter((item) => item.category === text);

//   return (
//     <div className="w-[95vw] m-auto">
//       <CategoryProductCarousel items={items} />
//       <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
//         {items.map((item) => (
//           <div key={item.id} className="px-2 mb-4">
//             <CategoryProductCard item={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoryProductScreen;
