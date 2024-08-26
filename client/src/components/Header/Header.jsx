// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Search from "./Search";
// import CustomButtons from "./CustomButtons";
// import { Menu as MenuIcon } from "@mui/icons-material"; // Import the Menu icon
// import { Drawer, IconButton } from "@mui/material"; // Import Drawer and IconButton

// const Header = () => {
//   const [open, setOpen] = useState(false);

//   const handleClose = () => setOpen(false);
//   const handleOpen = () => setOpen(true);

//   return (
//     <header className="w-full bg-white text-black shadow-md mb-2 p-2">
//       <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
//         {/* Logo or Brand Name */}
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="">
//             <span className="text-xl font-extrabold text-blue-600 tracking-wide cursor-pointer">
//               ShopIndia
//             </span>
//           </Link>
//         </div>

//         {/* Search */}
//         <div className=" justify-center items-center">
//           <Search />
//         </div>

//         {/* Custom Buttons for larger screens */}
//         <div className="hidden lg:flex items-center space-x-4">
//           <CustomButtons />
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="block lg:hidden">
//           <IconButton className="text-black" onClick={handleOpen}>
//             <MenuIcon />
//           </IconButton>
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       <Drawer anchor="right" open={open} onClose={handleClose}>
//         <div className="w-64 h-full p-4">
//           <div className="mt-4">
//             <CustomButtons />
//           </div>
//         </div>
//       </Drawer>
//     </header>
//   );
// };

// export default Header;



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import CustomButtons from "./CustomButtons";
import { Menu as MenuIcon } from "@mui/icons-material"; // Import the Menu icon
import { Drawer, IconButton } from "@mui/material"; // Import Drawer and IconButton

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    // Media query to check if screen width is greater than 1024px (breakpoint for lg)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Function to close the drawer if media query matches (screen is larger than mobile)
    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    // Add event listener for changes in media query state
    mediaQuery.addEventListener("change", handleResize);

    // Initial check
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <header className="w-full bg-white text-black shadow-md mb-2 p-2">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo or Brand Name */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="">
            {/* <span className="text-xl font-extrabold text-[#ab09a3] tracking-wide cursor-pointer">
              BookShoppe
            </span> */}
            <img
              src="/Book.png"
              alt="BookShoppe"
              className="text-[#ab09a3]"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="justify-center items-center">
          <Search />
        </div>

        {/* Custom Buttons for larger screens */}
        <div className="hidden lg:flex items-center space-x-4">
          <CustomButtons />
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <IconButton className="text-black" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <div className="w-64 h-full p-4">
          <div className="mt-4">
            <CustomButtons />
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
