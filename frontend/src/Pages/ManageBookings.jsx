import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageBookings.css';
import ConfirmModal from '../components/ConfirmModal';
import { Helmet } from 'react-helmet';

function ManageBookings() {
  useEffect(() => {
    document.title = "Biyahero | Manage Bookings";
  }, []);

  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

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


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/delete/${id}`);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/bookings/update/${editingBooking.id}`, {
        ...editingBooking,
        passengerCount: parseInt(editingBooking.passengerCount)
      });
      setEditingBooking(null);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="manage-bookings-container">
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
                    <button className="edit-btn" onClick={() => handleEdit(booking)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setConfirmDeleteId(booking.id)}
                    >
                      Delete
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

          {editingBooking && (
            <div className="edit-modal-overlay">
              <div className="edit-modal">
                <h3>Edit Booking</h3>
                <form onSubmit={handleEditSubmit}>
                  <label>
                    Booking ID:
                    <input type="text" value={editingBooking.id} readOnly />
                  </label>
                  <label>
                    Terminal:
                    <input
                      name="terminal"
                      value={editingBooking.terminal}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          terminal: e.target.value
                        }))
                      }
                    />
                  </label>
                  <label>
                    Destination:
                    <input
                      name="destination"
                      value={editingBooking.destination}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          destination: e.target.value
                        }))
                      }
                    />
                  </label>
                  <label>
                    Date:
                    <input
                      type="date"
                      name="date"
                      value={editingBooking.date}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          date: e.target.value
                        }))
                      }
                    />
                  </label>
                  <label>
                    Bus Type:
                    <select
                      name="busType"
                      value={editingBooking.busType}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          busType: e.target.value
                        }))
                      }
                    >
                      <option value="Aircon">Aircon</option>
                      <option value="Non-Aircon">Non-Aircon</option>
                    </select>
                  </label>
                  <label>
                    Passengers:
                    <input
                      type="number"
                      name="passengerCount"
                      value={editingBooking.passengerCount}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          passengerCount: e.target.value
                        }))
                      }
                      min="1"
                    />
                  </label>
                  <div className="edit-modal-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingBooking(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <ConfirmModal
            open={confirmDeleteId !== null}
            message="Are you sure you want to delete this booking?"
            onConfirm={async () => {
              await handleDelete(confirmDeleteId);
              setConfirmDeleteId(null);
            }}
            onCancel={() => setConfirmDeleteId(null)}
          />
        </>
      )}
    </div>
  );
}

export default ManageBookings;
