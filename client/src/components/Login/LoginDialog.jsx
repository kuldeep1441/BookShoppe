import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateSignup, authenticateLogin } from "../../redux/actions/userActions";

const signupInitialValues = {
  username: "",
  email: "",
  phone: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const LoginDialog = ({ isOpen, setOpen}) => {
  const [account, toggleAccount] = useState(true);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [localError, showLocalError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {Loading: loginLoading, error: loginError, userInfo: loginUserInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { Loading: registerLoading, error: registerError, userInfo: registerUserInfo } = userRegister;

  // useEffect(() => {
  //   if (loginUserInfo || registerUserInfo) {
  //     navigate('/');
  //   }
  // }, [navigate, loginUserInfo, registerUserInfo]);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    dispatch(authenticateLogin(login));
    showLocalError(false);
    handleClose();
  };

  const signupUser = async (e) => {
    e.preventDefault();
    dispatch(authenticateSignup(signup));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    toggleAccount(true);
    setSignup(signupInitialValues);
    setLogin(loginInitialValues);
    showLocalError(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="flex bg-white rounded-lg shadow-lg max-w-2xl w-full h-3/5">
          <div className="bg-blue-500 w-2/3 p-6 flex flex-col justify-between">
            <div className="flex flex-col mb-4">
              <Dialog.Title className="text-2xl text-white mb-4">
                {account ? "Login" : "Sign-Up"}
              </Dialog.Title>
              <Dialog.Description className="text-white text-lg mb-4">
                {account
                  ? "Please enter your login details."
                  : "Please enter your details."}
              </Dialog.Description>
            </div>
            <div className="mt-auto">
              <img src="/path-to-your-image" alt="Logo" className="mx-auto" />
            </div>
          </div>

          <div className="p-6 w-full flex flex-col justify-between">
            {account ? (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your Username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                  name="username"
                  onChange={onValueChange}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                  name="password"
                  onChange={onValueChange}
                />
                {loginError && (
                  <div className="text-red-500 mt-2">
                    Please Enter Correct Details.
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                    onClick={loginUser}
                  >
                    Login
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>

                <div className="bg-gray-100 p-4 text-center rounded-b-lg mt-auto">
                  <p>
                    New to ShopIndia?{" "}
                    <span
                      onClick={() => toggleAccount(false)}
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      Create an account
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                  name="username"
                  onChange={onInputChange}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                  name="email"
                  onChange={onInputChange}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                  name="phone"
                  onChange={onInputChange}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                  name="password"
                  onChange={onInputChange}
                />

                {registerError && (
                  <div className="text-red-500 mt-2">
                    Error signing up. Please try again.
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                    onClick={signupUser}
                  >
                    Sign Up
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>

                <div className="bg-gray-100 p-4 text-center rounded-b-lg mt-auto">
                  <p>
                    Registered User?{" "}
                    <span
                      onClick={() => toggleAccount(true)}
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      Login
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

LoginDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default LoginDialog;
