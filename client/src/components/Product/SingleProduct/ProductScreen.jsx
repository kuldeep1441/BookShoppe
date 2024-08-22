import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import ProductImage from "./ProductImage";

const DetailView = () => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.getProductDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(product);
    console.log(id);
    if (product && id !== product.id) dispatch(getProductDetails(id));
  }, [dispatch, product, id, loading]);

  return (
    <div className="bg-gray-200 w-[95%] mx-auto">
      <div></div>
      {product && Object.keys(product).length && (
        <div className="bg-white flex flex-wrap">
          <div className="w-full lg:w-1/3 md:w-1/3 sm:w-2/3">
            <ProductImage product={product} />
          </div>
          <div className="w-full lg:w-2/3 md:w-2/3 sm:w-2/3 mt-12 px-5">
            <p className="text-lg">{product.title.longTitle}</p>
            <p className="mt-1 text-gray-600 text-sm">
              8 Ratings & 1 Reviews
              <span>
                <img src={fassured} className="w-20 ml-0" />
              </span>
            </p>
            <p className="mt-1">
              <span className="text-2xl">₹{product.price.cost}</span>
              &nbsp;&nbsp;&nbsp;
              <span className="text-gray-600 line-through">
                ₹{product.price.mrp}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span className="text-green-700">
                {product.price.discount} off
              </span>
            </p>
            <ProductDetail product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
