import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

const GroupButton = ({ id, currqty }) => {
  const [qty, setQty] = useState(currqty);
  const dispatch = useDispatch();

  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;

  const product = cartItems.find((item) => item.product === id);
  const maxQuantity = product ? product.countInStock : 1;

  const handleIncrement = () => {
    if (qty < maxQuantity) {
      setQty(qty + 1);
      dispatch(addToCart(id, qty + 1));
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      dispatch(addToCart(id, qty - 1));
    }
  };

  return (
    <div className="flex mt-8">
      <button
        onClick={handleDecrement}
        disabled={qty === 1}
        className={`w-12 h-12 rounded-full bg-gray-200 border border-gray-300 text-lg font-bold ${
          qty === 1 ? "text-gray-400" : "text-black"
        } flex items-center justify-center`}
      >
        -
      </button>
      <button
        disabled
        className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 text-lg font-bold text-black flex items-center justify-center mx-2"
      >
        {qty}
      </button>
      <button
        onClick={handleIncrement}
        disabled={qty >= maxQuantity}
        className={`w-12 h-12 rounded-full bg-gray-200 border border-gray-300 text-lg font-bold ${
          qty >= maxQuantity ? "text-gray-400" : "text-black"
        } flex items-center justify-center`}
      >
        +
      </button>
    </div>
  );
};

export default GroupButton;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/actions/cartActions';

// const GroupButton = ({ id, currqty }) => {
//     const [qty, setQty] = useState(currqty);
//     const dispatch = useDispatch();

//     const cartDetails = useSelector((state) => state.cart);
//     const { cartItems } = cartDetails;

//     const product = cartItems.find((item) => item.id === id);
//     const maxQuantity = product ? product.quantity : 1;

//     const handleIncrement = () => {
//         if (qty < maxQuantity) {
//             setQty(qty + 1);
//             dispatch(addToCart(id, qty + 1));
//         }
//     };

//     const handleDecrement = () => {
//         if (qty > 1) {
//             setQty(qty - 1);
//             dispatch(addToCart(id, qty - 1));
//         }
//     };

//     return (
//         <div className="flex mt-8">
//             <button
//                 onClick={handleDecrement}
//                 disabled={qty === 1}
//                 className={`w-12 h-12 rounded-full bg-gray-200 border border-gray-300 text-lg font-bold ${
//                     qty === 1 ? 'text-gray-400' : 'text-black'
//                 } flex items-center justify-center`}
//             >
//                 -
//             </button>
//             <button disabled className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 text-lg font-bold text-black flex items-center justify-center mx-2">
//                 {qty}
//             </button>
//             <button
//                 onClick={handleIncrement}
//                 disabled={qty >= maxQuantity}
//                 className={`w-12 h-12 rounded-full bg-gray-200 border border-gray-300 text-lg font-bold ${
//                     qty >= maxQuantity ? 'text-gray-400' : 'text-black'
//                 } flex items-center justify-center`}
//             >
//                 +
//             </button>
//         </div>
//     );
// };

// export default GroupButton;
