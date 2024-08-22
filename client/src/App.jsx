import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ProductScreen from "./components/Product/SingleProduct/ProductScreen";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Header/Profile";
import CategoryProductScreen from "./components/Product/ProductCategory/CategoryProductScreen";
import Seller from "./components/Header/Seller";
import DealProductScreen from "./components/Product/DealPage/DealProductScreen";
import OrderScreen from "./components/Order-Payment/OrderScreen";
import ShippingScreen from "./components/Order-Payment/ShippingScreen";
import PaymentScreen from "./components/Order-Payment/PaymentScreen";
import PlaceOrderScreen from "./components/Order-Payment/PlaceOrderScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:text" element={<CategoryProductScreen />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/deals/:text" element={<DealProductScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />

        {/* Catch-all route that redirects to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
