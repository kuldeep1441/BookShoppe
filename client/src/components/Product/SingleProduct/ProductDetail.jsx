

import React from 'react';
import { LocalOffer as Badge } from '@mui/icons-material';

const ProductDetail = ({ product }) => {
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));     // time of delivery after 5 days in mili
    
    return (
        <>
            <h2 className="text-lg font-medium">Available offers</h2>
            <div className="text-sm mt-2 space-y-2">
                <p className="flex items-center"><Badge className="text-green-600 mr-2" />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</p>
                <p className="flex items-center"><Badge className="text-green-600 mr-2" />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</p>
                <p className="flex items-center"><Badge className="text-green-600 mr-2" />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</p>
                <p className="flex items-center"><Badge className="text-green-600 mr-2" />Partner OfferExtra 10% off upto ₹500 on next furniture purchase</p>
            </div>
            <table className="mt-4 w-full">
                <tbody className="text-sm">
                    <tr className="border-t">
                        <td className="text-gray-500 py-2">Delivery</td>
                        <td className="font-semibold py-2">Delivery by {date.toDateString()} | ₹40</td>
                    </tr>
                    <tr className="border-t">
                        <td className="text-gray-500 py-2">Warranty</td>
                        <td className="py-2">No Warranty</td>
                    </tr>
                    <tr className="border-t">
                        <td className="text-gray-500 py-2">Seller</td>
                        <td className="py-2">
                            <span className="text-blue-600">SuperComNet</span>
                            <p>GST invoice available</p>
                            <p>View more sellers starting from ₹329</p>
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td colSpan={2} className="py-4">
                            <img src={adURL} alt="Ad" className="w-full max-w-xs" />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="text-gray-500 py-2">Description</td>
                        <td className="py-2">{product.description}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ProductDetail;
