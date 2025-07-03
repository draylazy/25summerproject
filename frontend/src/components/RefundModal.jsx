import React, { useState } from "react";
import axios from "axios";
import "./RefundModal.css";

function RefundModal({ open, booking, reason, setReason, onCancel }) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/refunds/submit", {
        bookingId: booking.id,
        reason: reason,
      });

      console.log("Refund response:", response.data);
      alert("✅ Refund submitted successfully!");

      setReason("");
      onCancel();
    } catch (err) {
      console.error("Refund failed:", err);
      if (err.response && err.response.data) {
        alert(`⚠️ Refund failed: ${err.response.data}`);
      } else {
        alert("⚠️ Refund failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="refund-modal-overlay">
      <div className="refund-modal">
        <h3>Refund Booking</h3>
        <p>
          Please confirm refund for booking{" "}
          <strong>#{booking.id}</strong>.
        </p>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Refund"}
            </button>
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RefundModal;
