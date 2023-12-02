import React from "react";
import { ButtonProps } from "./ButtonProps";

function SecondaryButton({ text, action }: ButtonProps) {
  return (
    <button
      className="m-2 px-4 py-2 rounded-full bg-white text-secondary border-1 border-solid hover:bg-primary hover:text-white "
      onClick={() => action()}
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
