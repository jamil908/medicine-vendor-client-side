import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
