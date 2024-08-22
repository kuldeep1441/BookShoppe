


import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const { id } = useParams();
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (id) dispatch(addToCart(id, 1));
    // }, [dispatch, id]);

    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    // const buyNow = async () => {
    //     try {
    //         // Assuming you have these functions defined somewhere
    //         let response = await payUsingPaytm({ amount: 500, email: 'kuldeepsinghtanwar2001@gmail.com' });
    //         var information = {
    //             action: 'https://securegw-stage.paytm.in/order/process',
    //             params: response,
    //         };
    //         post(information);
    //     } catch (error) {
    //         console.error('Payment error:', error);
    //     }
    // };
     const navigate = useNavigate();

     const checkoutHandler = () => {
       navigate("/shipping");
     };

    return (
      <>
        {cartItems.length ? (
          <div className="flex flex-col lg:flex-row p-8 lg:pl-32 lg:pr-32 lg:py-12">
            <div className="lg:w-9/12 mb-8 lg:mb-0">
              <div className="bg-white p-4 mb-4 shadow-md border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  My Cart ({cartItems.length})
                </h2>
              </div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeItemFromCart={removeItemFromCart}
                /> // here it sending object -> item
              ))}
            </div>
            <div className="lg:w-3/12 ml-8">
              <TotalView cartItems={cartItems} buyNow={checkoutHandler} />
              {/* here cartItems is an array */}
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </>
    );
};

export default Cart;
