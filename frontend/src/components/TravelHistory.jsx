import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TravelHistory.css';

function TravelHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payments/all');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching travel history:', error);
    }
  };

  return (
    <div className="travel-history-container">
      <h2>Travel History</h2>
      {history.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.bookingId}</td>
                <td>₱{item.amountPaid.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TravelHistory;
