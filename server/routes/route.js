// // import express from  'express';
// // import { getProductById, getProducts } from '../controller/product-controller.js';
// // import { userSignUp, userLogIn, getUsers } from '../controller/user-controller.js';
// // import { userSignUpValidation, userLogInValidation } from '../middleware/signup-login-middleware.js';  // middleware are used in routes;
// // import { protect, admin } from '../middleware/authMiddleware.js'
// // import {
// //   addOrderItems,
// //   getOrderById,
// //   updateOrderToPaid,
// //   updateOrderToDelivered,
// //   getMyOrders,
// //   getOrders,
// // } from "../controller/order-controller.js";

// // // import { addItemInCart } from '../controller/cart-controller.js';
// // // import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';

// // const router = express.Router();

// // //login & signup
// // router.post('/signup', userSignUpValidation, userSignUp);
// // router.get("/", protect, admin, getUsers);
// // router.post('/login',userLogInValidation, userLogIn);
// // router.get('/userData',protect,admin,getUsers );

// // router.get('/products', getProducts);
// // router.get('/product/:id', getProductById);

// // // router.post('/cart/add', addItemInCart);

// // // router.post('/payment', addPaymentGateway);
// // // router.post('/callback', paymentResponse);




// // // Routes for order management

// // // Create a new order and get all orders (admin only)
// // router.route("/orders").post(protect, addOrderItems).get(protect, admin, getOrders);

// // // Get logged-in user's orders
// // router.route("/orders/myorders").get(protect, getMyOrders);

// // // Get order by ID
// // router.route("/orders/:id").get(protect, getOrderById);

// // // Update order to paid
// // router.route("/orders/:id/pay").put(protect, updateOrderToPaid);

// // // Update order to delivered (admin only)
// // router.route("/orders/:id/deliver").put(protect, admin, updateOrderToDelivered);


// // export default router;



// // // import express from "express";
// // // import {
// // //   getProductById,
// // //   getProducts,
// // // } from "../controller/product-controller.js";
// // // import {
// // //   userSignUp,
// // //   userLogIn,
// // //   getUsers,
// // // } from "../controller/user-controller.js";
// // // import {
// // //   userSignUpValidation,
// // //   userLogInValidation,
// // // } from "../middleware/signup-login-middleware.js"; // middleware are used in routes;
// // // import { protect, admin } from "../middleware/authMiddleware.js"; // Keep only this import

// // // import {
// // //   addOrderItems,
// // //   getOrderById,
// // //   updateOrderToPaid,
// // //   updateOrderToDelivered,
// // //   getMyOrders,
// // //   getOrders,
// // // } from "../controller/order-controller.js";

// // // // import { addItemInCart } from '../controller/cart-controller.js';
// // // // import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';

// // // const router = express.Router();

// // // // Login & Signup routes
// // // router.post("/signup", userSignUpValidation, userSignUp);
// // // router.get("/", protect, admin, getUsers);
// // // router.post("/login", userLogInValidation, userLogIn);
// // // router.get("/userData", protect, admin, getUsers);

// // // // Product routes
// // // router.get("/products", getProducts);
// // // router.get("/product/:id", getProductById);

// // // // Order management routes

// // // // Create a new order and get all orders (admin only)
// // // router
// // //   .route("/products")
// // //   .post(protect, addOrderItems)
// // //   .get(protect, admin, getOrders);

// // // // Get logged-in user's orders
// // // router.route("/products/myorders").get(protect, getMyOrders);

// // // // Get order by ID
// // // router.route("/products/:id").get(protect, getOrderById);

// // // // Update order to paid
// // // router.route("/products/:id/pay").put(protect, updateOrderToPaid);

// // // // Update order to delivered (admin only)
// // // router
// // //   .route("/products/:id/deliver")
// // //   .put(protect, admin, updateOrderToDelivered);

// // // export default router;







// import express from "express";
// import {
//   getProductById,
//   getProducts,
// } from "../controller/product-controller.js";
// import {
//   userSignUp,
//   userLogIn,
//   getUsers,
//   getUserById,
// } from "../controller/user-controller.js";
// // import {
// //   userSignUpValidation,
// //   userLogInValidation,
// // } from "../middleware/signup-login-middleware.js";
// import { protect, admin } from "../middleware/authMiddleware.js"; // Single import here

// import {
//   addOrderItems,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getMyOrders,
//   getOrders,
// } from "../controller/order-controller.js";

// const router = express.Router();

// // Login & signup routes
// router.post("/signup", userSignUp);
// // router.get("/", protect, admin, getUsers);
// router.post("/login", userLogIn);
// router.get("/users/:id", protect, admin, getUserById);

// // Product routes
// router.get("/products", getProducts);
// router.get("/product/:id", getProductById);

// // // Order management routes

// // Create a new order and get all orders (admin only)
// router
//   .route("/orders")
//   .post(protect, addOrderItems)
//   .get(protect, admin, getOrders);

// // Get logged-in user's orders
// router.route("/orders/myorders").get(protect, getMyOrders);

// // Get order by ID
// router.route("/orders/:id").get(protect, getOrderById);

// // Update order to paid
// router.route("/orders/:id/pay").put(protect, updateOrderToPaid);

// // Update order to delivered (admin only)
// router.route("/orders/:id/deliver").put(protect, admin, updateOrderToDelivered);

// export default router;


import express from "express";
import {
  getProductById,
  getProducts,
} from "../controller/product-controller.js";
import {
  userSignUp,
  userLogIn,
  getUsers,
  getUserById,
} from "../controller/user-controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controller/order-controller.js";

const router = express.Router();

// Login & signup routes
router.post("/signup", userSignUp);
router.post("/login", userLogIn);

// User routes
router.get("/users", protect, admin, getUsers); // Renamed to be more specific
router.get("/users/:id", protect, admin, getUserById);

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById); // Made more specific with '/products'

// Order management routes
router
  .route("/orders")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

router.get("/orders/myorders", protect, getMyOrders);
router.get("/orders/:id", protect, getOrderById);
router.put("/orders/:id/pay", protect, updateOrderToPaid);
router.put("/orders/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
