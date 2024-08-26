import React from 'react';

const ImageURL = [
  "https://plus.unsplash.com/premium_photo-1723619021737-df1d775eccc8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1531323386183-43890b5c766d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjUyfHxib29rcyUyMG1vdGl2YXRpb258ZW58MHwwfDB8fHww",
  "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGJvb2tzJTIwbW90aXZhdGlvbnxlbnwwfDB8MHx8fDA%3D",
];

const MidSection = () => {
    const url =
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
