import { addEllipsis } from "../../utils/util";
import GroupButton from "./GroupButton";
import React, { memo } from "react";

const CartItem = memo(({ item, removeItemFromCart }) => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  if (!item || !item.name) {
    // here item is object so item.title is valid;
    console.warn("Invalid cartitem data:", item);
    return null;
  }

  return (
    <div className="border-t border-gray-200 flex bg-[#fff]">
      <div className="m-5 flex flex-col">
        <img
          src={item.image}
          alt={item.name || "Product"}
          className="h-28 w-28"
        />
        <GroupButton id={item.product} currqty={item.qty} />
      </div>
      <div className="m-5 flex-1">
        <p className="text-base font-medium">
                  {item.name}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Seller: Kuldeep
        </p>
        <div className="my-5">
          <span className="text-lg font-semibold">₹{item.price}</span>
        </div>
        <button
          onClick={() => removeItemFromCart(item.product)}
          className="text-base text-red-600 mt-5"
        >
          Remove
        </button>
      </div>
    </div>
  );
});

export default CartItem;

// import { addEllipsis } from '../../utils/util';
// import GroupButton from './GroupButton';
// import React, { memo } from 'react';

// const CartItem = memo(({ item, removeItemFromCart }) => {
//     const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

//     if (!item || !item.title) {            // here item is object so item.title is valid;
//         console.warn('Invalid cartitem data:', item);
//         return null;
//     }

//     return (
//         <div className="border-t border-gray-200 flex bg-[#fff]">
//             <div className="m-5 flex flex-col">
//                 <img src={item.url} alt={item.title.longTitle || 'Product'} className="h-28 w-28" />
//                 <GroupButton id={item.id} currqty={item.qty} />
//             </div>
//             <div className="m-5 flex-1">
//                 <p className="text-base font-medium">{addEllipsis(item.title.longTitle)}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                     Seller: RetailNet
//                     <span>
//                         <img src={fassured} alt="Assured" className="w-12 ml-2 inline" />
//                     </span>
//                 </p>
//                 <div className="my-5">
//                     <span className="text-lg font-semibold">₹{item.price.cost}</span>
//                     <span className="text-sm text-gray-500 ml-4">
//                         <strike>₹{item.price.mrp}</strike>
//                     </span>
//                     <span className="text-sm text-green-600 ml-4">{item.price.discount} off</span>
//                 </div>
//                 <button onClick={() => removeItemFromCart(item.id)} className="text-base text-red-600 mt-5">
//                     Remove
//                 </button>
//             </div>
//         </div>
//     );
// });

// export default CartItem;
