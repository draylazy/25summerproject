import React from "react";
import "./ConfirmModal.css";

function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button className="confirm" onClick={onConfirm}>Yes</button>
          <button className="cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
