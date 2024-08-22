import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
  const { id } = useParams();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);
  const [clientId, setClientId] = useState(""); // Store clientId in state

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
      try {
        const { data: clientId } = await axios.get(
          "https://book-shoppe-140l.vercel.app/paypal"
        );
        setClientId(clientId); // Store clientId in state
        setSdkReady(true);
      } catch (error) {
        console.error("Failed to load PayPal client ID:", error);
      }
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
  }, [dispatch, id, successPay, successDeliver, order, userInfo, navigate]);

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
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
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
                  {!sdkReady || !clientId ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider
                      options={{
                        "client-id": clientId,
                      }}
                    >
                      <PayPalButtons
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    </PayPalScriptProvider>
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
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../Message";
// import Loader from "../Loader";
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from "../../redux/actions/orderActions";
// import {
//   ORDER_PAY_RESET,
//   ORDER_DELIVER_RESET,
// } from "../../redux/constants/orderConstants";
// import { useNavigate, useParams } from "react-router-dom";

// const OrderScreen = () => {
//   const { id: id } = useParams();
//   const navigate = useNavigate();

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
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     );
//   }

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/");
//     }

//     const addPayPalScript = async () => {
//       const { data: clientId } = await axios.get(
//         "https://book-shoppe-140l.vercel.app/paypal"
//       );
//       setSdkReady(true);
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
//   }, [dispatch, id, successPay, successDeliver, order, userInfo, navigate]);

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
//       <h1 className="text-2xl font-bold mb-4">Order {order._id}</h1>
//       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
//         <div className="w-full md:w-2/3">
//           <div className="bg-white p-4 shadow-md rounded-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Shipping</h2>
//             <p>
//               <strong>Name: </strong> {order.user.username}
//             </p>
//             <p>
//               <strong>Email: </strong>
//               <a href={`mailto:${order.user.email}`} className="text-blue-500">
//                 {order.user.email}
//               </a>
//             </p>
//             <p>
//               <strong>Address:</strong>
//               {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
//               {order.shippingAddress.postalCode},{" "}
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

//           <div className="bg-white p-4 shadow-md rounded-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
//             <p>
//               <strong>Method: </strong> {order.paymentMethod}
//             </p>
//             {order.isPaid ? (
//               <Message variant="success">Paid on {order.paidAt}</Message>
//             ) : (
//               <Message variant="danger">Not Paid</Message>
//             )}
//           </div>

//           <div className="bg-white p-4 shadow-md rounded-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Order Items</h2>
//             {order.orderItems.length === 0 ? (
//               <Message>Order is empty</Message>
//             ) : (
//               <ul>
//                 {order.orderItems.map((item, index) => (
//                   <li
//                     key={index}
//                     className="flex items-center justify-between py-2"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                       <Link
//                         to={`/product/${item.product}`}
//                         className="text-blue-500"
//                       >
//                         {item.name}
//                       </Link>
//                     </div>
//                     <div>
//                       {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//         <div className="w-full md:w-1/3">
//           <div className="bg-white p-4 shadow-md rounded-md">
//             <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//             <ul>
//               <li className="flex justify-between py-2">
//                 <span>Items</span>
//                 <span>Rs.{order.itemsPrice}</span>
//               </li>
//               <li className="flex justify-between py-2">
//                 <span>Shipping</span>
//                 <span>Rs.{order.shippingPrice}</span>
//               </li>
//               <li className="flex justify-between py-2">
//                 <span>Tax</span>
//                 <span>Rs.{order.taxPrice}</span>
//               </li>
//               <li className="flex justify-between py-2 font-bold">
//                 <span>Total</span>
//                 <span>Rs.{order.totalPrice}</span>
//               </li>
//               {!order.isPaid && (
//                 <li className="py-2">
//                   {loadingPay && <Loader />}
//                   {!sdkReady ? (
//                     <Loader />
//                   ) : (
//                     <PayPalScriptProvider
//                       options={{
//                         "client-id": clientId, // Replace with your PayPal client ID
//                       }}
//                     >
//                       <PayPalButtons
//                         amount={order.totalPrice}
//                         onSuccess={successPaymentHandler}
//                       />
//                     </PayPalScriptProvider>
//                   )}
//                 </li>
//               )}
//               {loadingDeliver && <Loader />}
//               {userInfo &&
//                 userInfo.isAdmin &&
//                 order.isPaid &&
//                 !order.isDelivered && (
//                   <li className="py-2">
//                     <button
//                       type="button"
//                       className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//                       onClick={deliverHandler}
//                     >
//                       Mark As Delivered
//                     </button>
//                   </li>
//                 )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderScreen;
