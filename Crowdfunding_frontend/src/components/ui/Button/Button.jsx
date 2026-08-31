import React from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700",

  secondary:
    "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        px-5
        py-2.5
        rounded-lg
        font-medium
        transition-all
        duration-300
        shadow-sm
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;