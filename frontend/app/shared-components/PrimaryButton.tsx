import React from "react";
import { ButtonProps } from "./ButtonProps";

function PrimaryButton({ text, action }: ButtonProps) {
  return (
    <button
      className="m-2 px-4 py-2 rounded-full bg-primary text-white border-1 border-solid hover:bg-white hover:text-secondary "
      onClick={() => action()}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
