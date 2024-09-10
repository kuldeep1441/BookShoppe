import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} Kuldeep | All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
