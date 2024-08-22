

const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

    return (
        <div className="w-[80%] h-[65vh] bg-white mx-auto my-20 flex flex-col items-center justify-center">
            <img src={imgurl} alt="Empty Cart" className="w-1/6 mb-6" />
            <p className="text-xl font-semibold mb-2">Your cart is empty!</p>
            <p className="text-lg text-gray-600">Add items to it now.</p>
        </div>
    );
};

export default EmptyCart;
