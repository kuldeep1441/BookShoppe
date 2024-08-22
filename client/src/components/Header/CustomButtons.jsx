import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";
import LoginDialog from "../Login/LoginDialog";
import { logout } from "../../redux/actions/userActions";
import Seller from "./Seller";
import { useNavigate } from "react-router-dom";

const CustomButtons = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const buttonClass =
    "text-sm md:text-base text-gray-800 hover:underline focus:outline-none";
  const dropdownClass =
    "block px-4 py-2 hover:bg-gray-200 text-sm md:text-base font-medium text-gray-800";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    navigate("/");
    dispatch(logout());
  };

  const openDialog = () => setOpen(true);
  // const closeDialog = () => setOpen(false);

  // Reset dropdown states when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setDropdownOpen(false);
      setAdminDropdownOpen(false);
      setIsMoreDropdownOpen(false);
    }
  }, [userInfo]);

  return (
    <div className="flex md:flex-row flex-col items-center space-x-4 md:space-x-6">
      {userInfo ? (
        <div
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => {
            setTimeout(() => {
              if (!document.querySelector(".user-dropdown:hover")) {
                setDropdownOpen(false);
              }
            }, 100);
          }}
        >
          <button className="text-black focus:outline-none">
            {userInfo.username.charAt(0).toUpperCase() +
              userInfo.username.slice(1).toLowerCase()}{" "}
            <ExpandMoreIcon />
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 user-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={openDialog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      )}
      <LoginDialog isOpen={isOpen} setOpen={setOpen} />

      {userInfo && userInfo.isAdmin ? (
        <div
          className="relative ml-4"
          onMouseEnter={() => setAdminDropdownOpen(true)}
          onMouseLeave={() => {
            setTimeout(() => {
              if (!document.querySelector(".admin-dropdown:hover")) {
                setAdminDropdownOpen(false);
              }
            }, 100);
          }}
        >
          <button className="text-black focus:outline-none">
            Admin <i className="fas fa-caret-down"></i>
          </button>
          {adminDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 admin-dropdown"
              onMouseEnter={() => setAdminDropdownOpen(true)}
              onMouseLeave={() => setAdminDropdownOpen(false)}
            >
              <Link
                to="/admin/userlist"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Users
              </Link>
              <Link
                to="/admin/productlist"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Products
              </Link>
              <Link
                to="/admin/orderlist"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Orders
              </Link>
            </div>
          )}
        </div>
      )
        : <div>
          <Seller userInfo={userInfo} logoutHandler={logoutHandler} />
      </div>
      }

      <Link to="/cart" className={`flex items-center ${buttonClass}`}>
        <Badge badgeContent={cartItems?.length || 0} color="secondary">
          <ShoppingCart className="h-6 w-6" />
        </Badge>
        <span className="ml-2">Cart</span>
      </Link>

      <div
        className="relative"
        onMouseEnter={() => setIsMoreDropdownOpen(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            if (!document.querySelector(".more-dropdown:hover")) {
              setIsMoreDropdownOpen(false);
            }
          }, 100);
        }}
      >
        <button
          className={buttonClass}
          aria-haspopup="true"
          aria-expanded={isMoreDropdownOpen}
        >
          More
        </button>
        {isMoreDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 transition-transform duration-300 ease-in-out more-dropdown"
            onMouseEnter={() => setIsMoreDropdownOpen(true)}
            onMouseLeave={() => setIsMoreDropdownOpen(false)}
          >
            <Link to="/notifications" className={dropdownClass}>
              Notifications
            </Link>
            <Link to="/customer-care" className={dropdownClass}>
              24x7 Customer Care
            </Link>
            <Link to="/advertise" className={dropdownClass}>
              Advertise
            </Link>
            <Link to="/download" className={dropdownClass}>
              Download App
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomButtons;
