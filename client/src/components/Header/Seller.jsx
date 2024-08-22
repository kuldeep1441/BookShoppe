import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Seller({ userInfo, logoutHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const isAuthenticated = userInfo ? true : false;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      alert("Please enter both username and email.");
      return;
    }

    if (!isAuthenticated) {
      alert("Please log in first to send your details.");
      return;
    }

    try {
      const response = await axios.post(`/send-seller-request`, {
        username,
        email,
      });

      alert(response.data.message);
      logoutHandler();
      setUsername("");
      setEmail("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleToggle}
          ref={buttonRef}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Become a Seller
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="origin-top-center absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          style={{
            top: buttonRef.current ? buttonRef.current.offsetHeight : "auto",
            left: buttonRef.current
              ? buttonRef.current.offsetWidth / 2 - 128
              : "auto", // Centering the dropdown
          }}
        >
          <form className="py-1 px-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            {isAuthenticated ? (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!username || !email || !isAuthenticated}
              >
                Send
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26c.52.35 1.22.35 1.74 0L21 8m-2 8.14a1.993 1.993 0 00-1.74-2L12 15m-1-7H5a2 2 0 00-2 2v5a2 2 0 002 2h4m2 0h6a2 2 0 002-2v-5a2 2 0 00-2-2h-4"
                  />
                </svg>
              </button>
            ) : (
              <h5 className="text-red-600">Please Login First</h5>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Seller;
