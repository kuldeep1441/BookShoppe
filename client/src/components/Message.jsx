import React from "react";
import PropTypes from "prop-types";

const Message = ({ variant, children }) => {
  const variantClasses = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    danger: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded ${variantClasses[variant]}`}
      role="alert"
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

Message.propTypes = {
  variant: PropTypes.oneOf(["info", "success", "warning", "danger"]),
  children: PropTypes.node.isRequired,
};

export default Message;
