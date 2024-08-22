// import { useState, useEffect, useMemo } from "react";

// const TotalView = ({ cartItems, buyNow }) => {
//   const [price, setPrice] = useState(0);

//   if (!cartItems || !cartItems[0].name) {
//     console.warn("Invalid totalView item data:", cartItems);
//     return null;
//   }

//   useEffect(() => {
//     calculateTotalAmount();
//   }, [cartItems]);

//   const calculateTotalAmount = () => {
//     let totalPrice = 0;
//     cartItems.forEach((item) => {
//       totalPrice += item.price * item.qty;
//     });
//     setPrice(totalPrice);
//   };

//   const totalAmount = useMemo(() => price + 40, [price]);

//   return (
//     <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
//       <div className="p-4 border-b border-gray-200">
//         <p className="text-gray-500 text-sm">PRICE DETAILS</p>
//       </div>
//       <div className="p-4">
//         <p className="flex justify-between text-sm mb-4">
//           Price ({cartItems?.length} item{cartItems?.length > 1 ? "s" : ""})
//           <span className="font-medium">₹{price}</span>
//         </p>
//         <p className="flex justify-between text-sm mb-4">
//           Delivery Charges
//           <span>₹40</span>
//         </p>
//         <div className="border-t border-dashed border-gray-200 py-4 mt-4">
//           <p className="flex justify-between text-lg font-semibold">
//             Total Amount
//             <span>₹{totalAmount}</span>
//           </p>
//         </div>
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={() => buyNow()}
//             className="bg-orange-600 text-white px-6 py-3 rounded-md w-full lg:w-3/4 xl:w-1/2"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalView;

import { useState, useEffect, useMemo } from "react";

const TotalView = ({ cartItems, buyNow }) => {
  const [price, setPrice] = useState(0);

  if (!cartItems || !cartItems[0].name) {
    console.warn("Invalid totalView item data:", cartItems);
    return null;
  }

  useEffect(() => {
    calculateTotalAmount();
  }, [cartItems]);

  const calculateTotalAmount = () => {
    let totalPrice = 0,
      totalDiscount = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    setPrice(totalPrice);
  };

  const totalAmount = useMemo(() => price + 40, [price]);
  // const totalSavings = useMemo(
  //   () => (discount - 40 > 0 ? discount - 40 : 0),
  //   [discount]
  // );

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <p className="text-gray-500 text-sm">PRICE DETAILS</p>
      </div>
      <div className="p-4">
        <p className="flex justify-between text-sm mb-4">
          Price ({cartItems?.length} item{cartItems?.length > 1 ? "s" : ""})
          <span className="font-medium">₹{price}</span>
        </p>
        {/* <p className="flex justify-between text-sm mb-4">
          Discount
          <span className="text-green-600">-₹{discount}</span>
        </p> */}
        <p className="flex justify-between text-sm mb-4">
          Delivery Charges
          <span>₹40</span>
        </p>
        <div className="border-t border-dashed border-gray-200 py-4 mt-4">
          <p className="flex justify-between text-lg font-semibold">
            Total Amount
            <span>₹{totalAmount}</span>
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => buyNow()}
            className="bg-orange-600 text-white px-2 py-2 rounded-md w-full lg:w-3/4 xl:w-3/4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalView;

// import { useState, useEffect, useMemo } from "react";

// const TotalView = ({ cartItems, buyNow }) => {
//   const [price, setPrice] = useState(0);
//   const [discount, setDiscount] = useState(0);

//   if (!cartItems || !cartItems[0].title) {
//     console.warn("Invalid totalView item data:", cartItems);
//     return null;
//   }

//   useEffect(() => {
//     calculateTotalAmount();
//   }, [cartItems]);

//   const calculateTotalAmount = () => {
//     let totalPrice = 0,
//       totalDiscount = 0;
//     cartItems.forEach((item) => {
//       totalPrice += item.price.mrp * item.qty;
//       totalDiscount += (item.price.mrp - item.price.cost) * item.qty;
//     });
//     setPrice(totalPrice);
//     setDiscount(totalDiscount);
//   };

//   const totalAmount = useMemo(() => price - discount + 40, [price, discount]);
//   const totalSavings = useMemo(
//     () => (discount - 40 > 0 ? discount - 40 : 0),
//     [discount]
//   );

//   return (
//     <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
//       <div className="p-4 border-b border-gray-200">
//         <p className="text-gray-500 text-sm">PRICE DETAILS</p>
//       </div>
//       <div className="p-4">
//         <p className="flex justify-between text-sm mb-4">
//           Price ({cartItems?.length} item{cartItems?.length > 1 ? "s" : ""})
//           <span className="font-medium">₹{price}</span>
//         </p>
//         <p className="flex justify-between text-sm mb-4">
//           Discount
//           <span className="text-green-600">-₹{discount}</span>
//         </p>
//         <p className="flex justify-between text-sm mb-4">
//           Delivery Charges
//           <span>₹40</span>
//         </p>
//         <div className="border-t border-dashed border-gray-200 py-4 mt-4">
//           <p className="flex justify-between text-lg font-semibold">
//             Total Amount
//             <span>₹{totalAmount}</span>
//           </p>
//         </div>
//         <p className="text-green-600 text-sm mt-4 ml-8">
//           You will save ₹{totalSavings} on this order
//         </p>
//         <button
//           onClick={() => buyNow()}
//           className=" bg-orange-600 text-white px-6 py-3 rounded-md w-full lg:w-64 mt-4 ml-8"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TotalView;
