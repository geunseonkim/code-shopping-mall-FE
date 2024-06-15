import React from "react";

const Modal = ({ show, handleClose, children }) => {
  return (
    <div
      className={`mainPage-modal-cover ${
        show ? "display-block" : "display-none"
      }`}
    >
      <div className="mainPage-modal">
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
