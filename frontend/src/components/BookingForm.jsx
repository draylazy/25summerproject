import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';

function BookingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    busType: 'Non-Aircon',
    passengers: '1 Passenger',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const passengersNumber = parseInt(formData.passengers); // converts "1 Passenger" to 1

  const payload = {
    terminal: formData.from,
    destination: formData.to,
    date: formData.date,
    busType: formData.busType,
    passengerCount: passengersNumber,
  };

  try {
    await axios.post('http://localhost:8080/api/bookings/create', payload);
    navigate('/payment', { state: formData });
  } catch (error) {
    console.error("Failed to send booking:", error);
    alert("Error submitting booking. Please try again.");
  }
};

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container">
        <h2>Book Your Ticket</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <label>From</label>
            <select name="from" value={formData.from} onChange={handleChange} required>
              <option value="" disabled>Select departure</option>
              <option value="CNBT (North Bus Terminal)">Cebu North Bus Terminal</option>
              <option value="CSBT (South Bus Terminal)">Cebu South Bus Terminal</option>
              <option value="DBBT (Daanbantayan Bus Terminal)">Daanbantayan Bus Terminal</option>
              <option value="BBT (Bogo Bus Terminal)">Bogo Bus Terminal</option>
              <option value="CBT (Carcar Bus Terminal)">Carcar Bus Terminal</option>
            </select>
          </div>

          <div>
            <label>To</label>
            <select name="to" value={formData.to} onChange={handleChange} required>
              <option value="" disabled>Select destination</option>
              <option value="Cebu City">Cebu City</option>
              <option value="Daanbantayan">Daanbantayan</option>
              <option value="Liloan">Liloan</option>
              <option value="Carcar">Carcar</option>
              <option value="Moalboal">Moalboal</option>
            </select>
          </div>

          <div>
            <label>Date of trip</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Bus Type (AC/NAC)</label>
            <select name="busType" value={formData.busType} onChange={handleChange}>
              <option value="Non-Aircon">Non-Aircon</option>
              <option value="Aircon">Aircon</option>
            </select>
          </div>

          <div>
            <label>Passengers</label>
            <select name="passengers" value={formData.passengers} onChange={handleChange}>
              <option>1 Passenger</option>
              <option>2 Passengers</option>
              <option>3 Passengers</option>
              <option>4 Passengers</option>
              <option>5 Passengers</option>
            </select>
          </div>

          <div className="full-width">
            <button type="submit">Continue Payment</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
