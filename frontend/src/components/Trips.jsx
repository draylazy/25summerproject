import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../api/bookingService";

function ManageBooking() {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this booking?")) {
      await deleteBooking(id);
      fetchData(); // Refresh list
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="manage-booking">
      <h2>Manage Bookings</h2>
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
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.terminal}</td>
              <td>{b.destination}</td>
              <td>{b.date}</td>
              <td>{b.busType}</td>
              <td>{b.passengerCount}</td>
              <td>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBooking;
