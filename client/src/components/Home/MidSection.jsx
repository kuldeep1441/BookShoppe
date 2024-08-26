import React from 'react';

const ImageURL = [
    'https://rukminim1.flixcart.com/flap/960/960/image/2f30db9425df5cec.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/960/960/image/084789479074d2b2.jpg',
    'https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50'
];

const MidSection = () => {
    const url =
      "https://images.unsplash.com/photo-1605514449459-5a9cfa0b9955?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90aXZhdGlvbmFsfGVufDB8MHwwfHx8MA%3D%3D";

    return (
        <>
        <img src={url} alt="mid-section-img" className="w-full mt-5 object-cover h-[180px] sm:h-[280px]" />
            <div className="flex justify-between mt-5 flex-wrap">
                {
                    ImageURL.map((image, index) => (
                        <div key={index} className="w-full sm:w-1/3 p-2 h-[180px] sm:h-[280px]">
                            <img src={image} alt={`img-${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default MidSection;
