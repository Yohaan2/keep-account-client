import React from "react";
import Loader from "../common/Loader";

interface ButtonPropTypes {
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  customClasses?: string;
}

const ButtonDefault = ({
  label,
  type,
  onClick,
  disabled,
  loading,
  customClasses,
}: ButtonPropTypes) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses}`}
      >
        {loading ? <Loader /> : label}
      </button>
    </>
  );
};

export default ButtonDefault;
