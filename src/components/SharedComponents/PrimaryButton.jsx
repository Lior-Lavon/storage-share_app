import React, { useState, useRef } from "react";

const PrimaryButton = ({ children, type = "submit", onClick, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    if (isLoading) return;
    e.preventDefault(); // prevent default submission

    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);

      // If user passed a custom onClick (like navigate()), call that
      if (onClick) {
        onClick(e);
        return;
      }

      // Otherwise, try to submit enclosing form
      const form = e.target.closest("form");
      if (form) {
        form.requestSubmit(); // triggers onSubmit
      }
    }, 500);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`w-full h-10 py-2 cursor-pointer rounded-lg transition text-white flex items-center justify-center ${
        isLoading ? "bg-gray-600" : "bg-violet-600"
      }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
