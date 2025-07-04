import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RefundRequests.css";

function RefundRequests() {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    document.title = "Biyahero | Refund Requests";
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/refunds/all");
      const reversed = response.data.slice().reverse();
      setRefunds(reversed);
    } catch (error) {
      console.error("Failed to fetch refunds:", error);
    }
  };

  const updateRefundProgress = async (refundId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/refunds/update/${refundId}`, {
        progress: status
      });
    } catch (error) {
      console.error(`Failed to update refund status to ${status}`, error);
    }
  };

  const handleApprove = async (refund) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/delete/${refund.bookingId}`);
      await updateRefundProgress(refund.id, "approved");

      setRefunds((prev) =>
        prev.map((r) =>
          r.id === refund.id ? { ...r, progress: "approved" } : r
        )
      );
    } catch (error) {
      console.error("Error approving refund:", error);
    }
  };

  const handleDeny = async (refund) => {
    try {
      await updateRefundProgress(refund.id, "denied");

      setRefunds((prev) =>
        prev.map((r) =>
          r.id === refund.id ? { ...r, progress: "denied" } : r
        )
      );
    } catch (error) {
      console.error("Error denying refund:", error);
    }
  };

  return (
    <div className="refund-requests-container">
      <h2>Refund Requests</h2>
      {refunds.length === 0 ? (
        <p>No refund requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Refund ID</th>
              <th>Booking ID</th>
              <th>Reason</th>
              <th>Date Requested</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => (
              <tr key={refund.id}>
                <td>{refund.id}</td>
                <td>{refund.bookingId}</td>
                <td>{refund.reason}</td>
                <td>{refund.refundDate}</td>
                <td>{refund.progress || "-"}</td>
                <td>
                  <button
                    className="refund-edit-btn"
                    onClick={() => handleApprove(refund)}
                    disabled={refund.progress === "approved" || refund.progress === "denied"}
                  >
                    Approve
                  </button>
                  <button
                    className="refund-delete-btn"
                    onClick={() => handleDeny(refund)}
                    disabled={refund.progress === "approved" || refund.progress === "denied"}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RefundRequests;
