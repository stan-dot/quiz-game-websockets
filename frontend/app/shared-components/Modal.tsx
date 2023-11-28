import React from "react";

export const Modal = (
  { isOpen, close, children }: {
    isOpen: boolean;
    close: () => void;
    children: React.ReactNode;
  },
) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center">
      <div className="bg-white p-5 rounded w-full max-w-2xl">
        <button className="modal-close" onClick={close}>Close</button>
        {children}
      </div>
    </div>
  );
};
