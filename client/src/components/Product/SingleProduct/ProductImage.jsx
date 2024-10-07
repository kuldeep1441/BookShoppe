import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";

const ActionItem = ({ product }) => {
  const { id } = product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  return (
    <div className="min-w-[40%] pt-10 pl-5 md:pt-5 md:px-10">
      <img
        src={product.detailUrl}
        className="p-4 border border-gray-200 w-[95%]"
        alt="product"
      />
      <br />
      <div className="flex">
        <button
          onClick={addItemToCart}
          className="w-[90%] rounded h-12 text-white bg-[#ab09a3] flex items-center justify-center"
        >
          <Cart className="mr-2" />
          Add to Cart
        </button>
        {/* <button
          onClick={checkoutHandler}
          className="w-[46%] rounded h-12 text-white bg-[#fb641b] flex items-center justify-center"
        >
          <Flash className="mr-2" /> Buy Now
        </button> */}
      </div>
    </div>
  );
};

export default ActionItem;
