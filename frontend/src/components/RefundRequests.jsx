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
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => (
              <tr key={refund.id}>
                <td>{refund.id}</td>
                <td>{refund.bookingId}</td>
                <td>{refund.reason}</td>
                <td>{refund.refundDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RefundRequests;
