import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import CheckoutSteps from "./CheckoutSteps";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl font-semibold mb-6">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Method
          </label>
          <div className="space-y-4">
            <div>
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="PayPal" className="text-gray-700">
                PayPal or Credit Card
              </label>
            </div>
            {/* Uncomment this block if you want to include Stripe as an option */}
            {/* <div>
              <input
                type="radio"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="Stripe" className="text-gray-700">
                Stripe
              </label>
            </div> */}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
