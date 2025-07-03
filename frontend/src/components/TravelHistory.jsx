import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TravelHistory.css';

function TravelHistory() {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Biyahero | Travel History";
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payments/with-bookings');
      const reversed = response.data.slice().reverse(); 
      setHistory(reversed);
    } catch (error) {
      console.error('Error fetching travel history:', error);
    }
  };

  
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = history.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="travel-history-container">
      <h2>Travel History</h2>
      {history.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Booking ID</th>
                <th>Terminal</th>
                <th>Destination</th>
                <th>Bus Type</th>
                <th>Date of Trip</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.booking ? payment.booking.id : '—'}</td>
                  <td>{payment.booking ? payment.booking.terminal : '—'}</td>
                  <td>{payment.booking ? payment.booking.destination : '—'}</td>
                  <td>{payment.booking ? payment.booking.busType : '—'}</td>
                  <td>{payment.booking ? payment.booking.date : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TravelHistory;
