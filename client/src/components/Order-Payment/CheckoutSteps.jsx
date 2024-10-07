import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4 bg-white">
      <div className="mx-2">
        {step1 ? (
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        ) : (
          <span className="text-gray-500">Sign In</span>
        )}
      </div>

      <div className="mx-2">
        {step2 ? (
          <Link to="/shipping" className="text-blue-600 hover:underline">
            Shipping
          </Link>
        ) : (
          <span className="text-gray-500">Shipping</span>
        )}
      </div>

      <div className="mx-2">
        {step3 ? (
          <Link to="/payment" className="text-blue-600 hover:underline">
            Payment
          </Link>
        ) : (
          <span className="text-gray-500">Payment</span>
        )}
      </div>

      <div className="mx-2">
        {step4 ? (
          <Link to="/placeorder" className="text-blue-600 hover:underline">
            Place Order
          </Link>
        ) : (
          <span className="text-gray-500">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
