import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../redux/actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../redux/constants/orderConstants";
import { useNavigate, useParams } from "react-router-dom";

const OrderScreen = () => {
  const { id :id } = useParams();
  // console.log(id);

  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    id,
    successPay,
    successDeliver,
    order,
    userInfo,
    navigate,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-4">Order {order._id}</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-2/3">
          <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.username}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`} className="text-blue-500">
                {order.user.email}
              </a>
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ul>
                {order.orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <ul>
              <li className="flex justify-between py-2">
                <span>Items</span>
                <span>Rs.{order.itemsPrice}</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Shipping</span>
                <span>Rs.{order.shippingPrice}</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Tax</span>
                <span>Rs.{order.taxPrice}</span>
              </li>
              <li className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>Rs.{order.totalPrice}</span>
              </li>
              {!order.isPaid && (
                <li className="py-2">
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </li>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <li className="py-2">
                    <button
                      type="button"
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PayPalButton } from "react-paypal-button-v2";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../Message";
// import Loader from "../Loader";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from "../../redux/actions/orderActions";
// import {
//   ORDER_PAY_RESET,
//   ORDER_DELIVER_RESET,
// } from "../../redux/constants/orderConstants";

// const OrderScreen = () => {
//   const {id} = useParams();

//   const [sdkReady, setSdkReady] = useState(false);

//   const dispatch = useDispatch();

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;

//   const orderPay = useSelector((state) => state.orderPay);
//   const { loading: loadingPay, success: successPay } = orderPay;

//   const orderDeliver = useSelector((state) => state.orderDeliver);
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   if (!loading) {
//     // Calculate prices
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     );
//   }
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     }

//     const addPayPalScript = async () => {
//       const { data: clientId } = await axios.get("/api/config/paypal");
//       const script = document.createElement("script");
//       script.type = "text/javascript";
//       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//       script.async = true;
//       script.onload = () => {
//         setSdkReady(true);
//       };
//       document.body.appendChild(script);
//     };

//     if (!order || successPay || successDeliver || order._id !== id) {
//       dispatch({ type: ORDER_PAY_RESET });
//       dispatch({ type: ORDER_DELIVER_RESET });
//       dispatch(getOrderDetails(id));
//     } else if (!order.isPaid) {
//       if (!window.paypal) {
//         addPayPalScript();
//       } else {
//         setSdkReady(true);
//       }
//     }
//   }, [dispatch, id, successPay, successDeliver, order]);

//   const successPaymentHandler = (paymentResult) => {
//     console.log(paymentResult);
//     dispatch(payOrder(id, paymentResult));
//   };

//   const deliverHandler = () => {
//     dispatch(deliverOrder(order));
//   };

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <>
//       <h1 className="text-2xl font-bold mb-6">Order {order._id}</h1>
//       <div className="flex flex-col md:flex-row">
//         <div className="flex-1 mb-6 md:mb-0">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Shipping</h2>
//             <p>
//               <strong>Name: </strong> {order.user.name}
//             </p>
//             <p>
//               <strong>Email: </strong>
//               <a
//                 href={`mailto:${order.user.email}`}
//                 className="text-blue-500 underline"
//               >
//                 {order.user.email}
//               </a>
//             </p>
//             <p>
//               <strong>Address:</strong> {order.shippingAddress.address},{" "}
//               {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
//               {order.shippingAddress.country}
//             </p>
//             {order.isDelivered ? (
//               <Message variant="success">
//                 Delivered on {order.deliveredAt}
//               </Message>
//             ) : (
//               <Message variant="danger">Not Delivered</Message>
//             )}
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow mt-6">
//             <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
//             <p>
//               <strong>Method: </strong> {order.paymentMethod}
//             </p>
//             {order.isPaid ? (
//               <Message variant="success">Paid on {order.paidAt}</Message>
//             ) : (
//               <Message variant="danger">Not Paid</Message>
//             )}
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow mt-6">
//             <h2 className="text-xl font-semibold mb-4">Order Items</h2>
//             {order.orderItems.length === 0 ? (
//               <Message>Order is empty</Message>
//             ) : (
//               <div>
//                 {order.orderItems.map((item, index) => (
//                   <div key={index} className="flex items-center py-2 border-b">
//                     <div className="w-16 h-16">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <Link
//                         to={`/product/${item.product}`}
//                         className="text-blue-500 underline"
//                       >
//                         {item.name}
//                       </Link>
//                     </div>
//                     <div className="ml-4">
//                       {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="w-full md:w-1/3">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="flex justify-between mb-2">
//               <div>Items</div>
//               <div>Rs.{order.itemsPrice}</div>
//             </div>
//             <div className="flex justify-between mb-2">
//               <div>Shipping</div>
//               <div>Rs.{order.shippingPrice}</div>
//             </div>
//             <div className="flex justify-between mb-2">
//               <div>Tax</div>
//               <div>Rs.{order.taxPrice}</div>
//             </div>
//             <div className="flex justify-between mb-4">
//               <div>Total</div>
//               <div>Rs.{order.totalPrice}</div>
//             </div>
//             {!order.isPaid && (
//               <div className="mb-4">
//                 {loadingPay && <Loader />}
//                 {!sdkReady ? (
//                   <Loader />
//                 ) : (
//                   <PayPalButton
//                     amount={order.totalPrice}
//                     onSuccess={successPaymentHandler}
//                   />
//                 )}
//               </div>
//             )}
//             {loadingDeliver && <Loader />}
//             {userInfo &&
//               userInfo.isAdmin &&
//               order.isPaid &&
//               !order.isDelivered && (
//                 <div>
//                   <button
//                     type="button"
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg"
//                     onClick={deliverHandler}
//                   >
//                     Mark As Delivered
//                   </button>
//                 </div>
//               )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderScreen;





// import React from 'react'
// import { useParams } from 'react-router-dom'

// function OrderScreen() {
//   const { id } = useParams();
//   return (
//     <div>{id}</div>
//   )
// }

// export default OrderScreen