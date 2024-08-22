import React from "react";
import { Link } from "react-router-dom";

const DealProductCard = ({ item }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-3 p-3 sm:w-[280px] w-[92vw] h-[380px]">
      <Link to={`/product/${item.id}`}>
        <img
          src={item.url}
          alt={item.title.shortTitle}
          className="h-[250px] w-auto m-auto"
          //   className="w-full object-cover"
        />
      </Link>

      <div className="p-3">
        <Link to={`/product/${item.id}`} className="text-black no-underline">
          <h2 className="font-bold text-lg">{item.title.shortTitle}</h2>
        </Link>

        <div className="mt-2">
          <p className="mt-1">
            <span className="text-2xl">₹{item.price.cost}</span>
            &nbsp;&nbsp;&nbsp;
            <span className="text-gray-600 line-through">
              ₹{item.price.mrp}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="text-green-700">{item.price.discount} off</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealProductCard;
