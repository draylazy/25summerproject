import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageBookings.css';
import ConfirmModal from './ConfirmModal';
import { Helmet } from 'react-helmet';

function ManageBookings() {
  useEffect(() => {
    document.title = "Biyahero | Manage Bookings";
  }, []);

  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // NEW STATE for modal
  const [editForm, setEditForm] = useState({
    terminal: '',
    destination: '',
    date: '',
    busType: '',
    passengerCount: 1
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/all');
      setBookings(response.data);
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

  const handleEditClick = (booking) => {
    setEditingId(booking.id);
    setEditForm({ ...booking });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/bookings/update/${editingId}`, {
        ...editForm,
        passengerCount: parseInt(editForm.passengerCount)
      });
      setEditingId(null);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Biyahero | Manage Booking</title>
      </Helmet>
      <div className="manage-bookings-container">
        <h2>Manage Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Terminal</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Bus Type</th>
                  <th>Passengers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.terminal}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.date}</td>
                    <td>{booking.busType}</td>
                    <td>{booking.passengerCount}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => setConfirmDeleteId(booking.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(booking)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editingId && (
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <h3>Edit Booking</h3>
                <label>
                  Terminal:
                  <input
                    name="terminal"
                    value={editForm.terminal}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Destination:
                  <input
                    name="destination"
                    value={editForm.destination}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Bus Type:
                  <select
                    name="busType"
                    value={editForm.busType}
                    onChange={handleEditChange}
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
                    value={editForm.passengerCount}
                    onChange={handleEditChange}
                    min="1"
                  />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
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
    </>
  );
}

export default ManageBookings;
