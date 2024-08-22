

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../Message";
// import CheckoutSteps from "./CheckoutSteps";
// import { createOrder } from "../../redux/actions/orderActions";
// import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";
// import { USER_DETAILS_RESET } from "../../redux/constants/userConstants";
// import { useNavigate } from "react-router-dom";

// const PlaceOrderScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart);
//   const orderCreate = useSelector((state) => state.orderCreate);
//   const { order, success, error } = orderCreate;

//   // Calculate prices
//   const addDecimals = (num) => {
//     return (Math.round(num * 100) / 100).toFixed(2);
//   };

//   cart.itemsPrice = addDecimals(
//     cart.cartItems.reduce((acc, item) => acc + item.price.cost * item.qty, 0)
//   );
//   cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 40);
//   cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
//   cart.totalPrice = (
//     Number(cart.itemsPrice) +
//     Number(cart.shippingPrice) +
//     Number(cart.taxPrice)
//   ).toFixed(2);

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     } else if (!cart.paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

//   useEffect(() => {
//     if (success) {
//       navigate(`/order/${order._id}`);
//       dispatch({ type: USER_DETAILS_RESET });
//       dispatch({ type: ORDER_CREATE_RESET });
//     }
//   }, [success, order, navigate, dispatch]);

//   const placeOrderHandler = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       })
//     );
//   };

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//         <div className="md:col-span-2">
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-lg leading-6 font-medium text-gray-900">
//                 Shipping
//               </h2>
//               <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                 <strong>Address:</strong> {cart.shippingAddress.address},{" "}
//                 {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
//                 {cart.shippingAddress.country}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-lg leading-6 font-medium text-gray-900">
//                 Payment Method
//               </h2>
//               <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                 <strong>Method:</strong> {cart.paymentMethod}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-lg leading-6 font-medium text-gray-900">
//                 Order Items
//               </h2>
//               {cart.cartItems.length === 0 ? (
//                 <Message>Your cart is empty</Message>
//               ) : (
//                 <ul className="divide-y divide-gray-200">
//                   {cart.cartItems.map((item, index) => (
//                     <li key={index} className="py-4 flex">
//                       <div className="flex-shrink-0">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={item.url}
//                           alt={item.title.shortTitle}
//                         />
//                       </div>
//                       <div className="ml-3">
//                         <Link
//                           to={`/product/${item.product}`}
//                           className="text-sm font-medium text-gray-900 hover:text-blue-500"
//                         >
//                           {item.name}
//                         </Link>
//                       </div>
//                       <div className="ml-auto text-sm text-gray-500">
//                         {item.qty} x Rs.{item.price} = Rs.
//                         {item.qty * item.price}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h2 className="text-lg leading-6 font-medium text-gray-900">
//               Order Summary
//             </h2>
//             <ul className="mt-5 divide-y divide-gray-200">
//               <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
//                 <span>Items</span>
//                 <span>Rs.{cart.itemsPrice}</span>
//               </li>
//               <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
//                 <span>Shipping</span>
//                 <span>Rs.{cart.shippingPrice}</span>
//               </li>
//               <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
//                 <span>Tax</span>
//                 <span>Rs.{cart.taxPrice}</span>
//               </li>
//               <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
//                 <span>Total</span>
//                 <span>Rs.{cart.totalPrice}</span>
//               </li>
//               {error && (
//                 <li className="py-3 text-red-500">
//                   <Message variant="danger">{error}</Message>
//                 </li>
//               )}
//               <li className="py-3">
//                 <button
//                   type="button"
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   disabled={cart.cartItems.length === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   Place Order
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlaceOrderScreen;



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";
import { USER_DETAILS_RESET } from "../../redux/constants/userConstants";
import { useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart); 
  
      if (!cart.shippingAddress.address) {
        navigate("/shipping");
      } else if (!cart.paymentMethod) {
        navigate("/payment");
      }

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 40 : 0);
  cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Shipping
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Payment Method
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Order Items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.cartItems.map((item, index) => (
                    <li key={index} className="py-4 flex">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="ml-3">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-500"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        {item.qty} x Rs.{item.price} = Rs.
                        {item.qty * item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Order Summary
            </h2>
            <ul className="mt-5 divide-y divide-gray-200">
              <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
                <span>Items</span>
                <span>Rs.{cart.itemsPrice}</span>
              </li>
              <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
                <span>Shipping</span>
                <span>Rs.{cart.shippingPrice}</span>
              </li>
              <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
                <span>Tax</span>
                <span>Rs.{cart.taxPrice}</span>
              </li>
              <li className="py-3 flex justify-between text-sm font-medium text-gray-900">
                <span>Total</span>
                <span>Rs.{cart.totalPrice}</span>
              </li>
              {error && (
                <li className="py-3 text-red-500">
                  <Message variant="danger">{error}</Message>
                </li>
              )}
              <li className="py-3">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
