import React from "react";
import "./RefundModal.css";

function RefundModal({ open, booking, reason, setReason, onSubmit, onCancel }) {
  if (!open) return null;

  return (
    <div className="refund-modal-overlay">
      <div className="refund-modal">
        <h3>Refund Booking</h3>
        <p>Please confirm refund for booking <strong>#{booking.id}</strong>.</p>
        <form onSubmit={onSubmit}>
          <label>
            Refund Reason:
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe why you are refunding..."
              required
            />
          </label>
          <div className="refund-modal-buttons">
            <button type="submit">Submit Refund</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RefundModal;
