import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManageBookings.css';
import RefundModal from '../components/RefundModal';
import { Helmet } from 'react-helmet';

function UserManageBookings() {
  useEffect(() => {
    document.title = "Biyahero | Manage Bookings";
  }, []);

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const [refundBooking, setRefundBooking] = useState(null);
  const [refundReason, setRefundReason] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/bookings/with-payments');
    const reversed = response.data.slice().reverse(); 
    setBookings(reversed);
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};


  const handleRefund = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/delete/${id}`);
      fetchBookings();
      alert("Refund processed successfully.");
    } catch (error) {
      console.error('Error refunding booking:', error);
      alert("Failed to process refund.");
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="usermanage-bookings-container">
      <Helmet>
        <title>Biyahero | Manage Bookings</title>
      </Helmet>
      <h2>Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Terminal</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Bus Type</th>
                <th>Passengers</th>
                <th>Amount Paid</th>
                <th>Payment Method</th>
                <th>Payment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.terminal}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.date}</td>
                  <td>{booking.busType}</td>
                  <td>{booking.passengerCount}</td>
                  <td>₱ {booking.payment?.amountPaid || '—'}</td>
                  <td>{booking.payment?.method || '—'}</td>
                  <td>{booking.payment?.paymentDate || '—'}</td>
                  <td>
                    <button
                      className="refund-btn"
                      onClick={() => {
                        setRefundBooking(booking);
                        setRefundReason("");
                      }}
                    >
                      Refund
                    </button>
                  </td>
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

          <RefundModal
            open={refundBooking !== null}
            booking={refundBooking || {}}
            reason={refundReason}
            setReason={setRefundReason}
            onSubmit={async (e) => {
              e.preventDefault();
              await handleRefund(refundBooking.id);
              setRefundBooking(null);
              setRefundReason("");
            }}
            onCancel={() => setRefundBooking(null)}
          />
        </>
      )}
    </div>
  );
}

export default UserManageBookings;
