import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

function getPHDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const manilaTime = new Date(utc + 8 * 3600000);
  return manilaTime.toISOString().split("T")[0];
}

function BookingForm({ requireLogin }) {
  useEffect(() => {
    document.title = "Biyahero";
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    busType: 'Non-Aircon',
    passengers: '1'
  });

  const terminalDestinations = {
    'CNBT (North Bus Terminal)': ['Catmon','Bogo', 'Daanbantayan', 'Danao', 'Liloan', 'Mandaue', 'Medellin'],
    'CSBT (South Bus Terminal)': ['Carcar', 'Moalboal'],
    'DBBT (Daanbantayan Bus Terminal)': ['Bogo', 'Liloan'],
    'BBT (Bogo Bus Terminal)': ['Cebu', 'Daanbantayan', 'Liloan'],
    'CBT (Carcar Bus Terminal)': ['Moalboal', 'Cebu City']
  };

  const priceMap = {
    'CNBT (North Bus Terminal)': {
      'Catmon': 180,
      'Bogo': 200,
      'Daanbantayan': 250,
      'Danao': 150,
      'Liloan': 120,
      'Mandaue': 100,
      'Medellin': 220
    },
    'CSBT (South Bus Terminal)': {
      'Carcar': 180,
      'Moalboal': 300
    },
    'DBBT (Daanbantayan Bus Terminal)': {
      'Cebu': 250,
      'Bogo': 100,
      'Liloan': 120
    },
    'BBT (Bogo Bus Terminal)': {
      'Cebu': 200,
      'Daanbantayan': 110,
      'Liloan': 130
    },
    'CBT (Carcar Bus Terminal)': {
      'Moalboal': 210,
      'Cebu City': 160
    }
  };

  const [currentPrice, setCurrentPrice] = useState(null);
  const [localAlert, setLocalAlert] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };

    if (name === 'from') {
      updatedData.to = '';
      setCurrentPrice(null);
    }

    const terminal = name === 'from' ? value : formData.from;
    const destination = name === 'to' ? value : formData.to;
    const busType = name === 'busType' ? value : formData.busType;

    if (terminal && destination) {
      let basePrice = priceMap[terminal]?.[destination] || 0;
      if (busType === 'Aircon') {
        basePrice += 50;
      }
      setCurrentPrice(basePrice);
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("biyaheroUsername");
    const role = localStorage.getItem("biyaheroRole");

    if (!username) {
      setLocalAlert("⚠️ You must log in to proceed with booking.");
      requireLogin();
      return;
    }

    if (role === "ADMIN") {
      setLocalAlert("⛔ Admins are not allowed to book tickets.");
      return;
    }

    navigate('/payment', {
      state: {
        ...formData,
        pricePerPassenger: currentPrice
      }
    });
  };

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container">
        <h2>Book Your Ticket</h2>

        {localAlert && (
          <div className="local-alert">{localAlert}</div>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <label>From</label>
            <select
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select departure</option>
              {Object.keys(terminalDestinations).map((terminal) => (
                <option key={terminal} value={terminal}>
                  {terminal}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>To</label>
            <select
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              disabled={!formData.from}
            >
              <option value="" disabled>
                {formData.from ? "Select destination" : "Select terminal first"}
              </option>
              {formData.from &&
                terminalDestinations[formData.from].map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Date of trip</label>
             <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getPHDate()}
                required
              />
          </div>

          <div>
            <label>Bus Type (AC/NAC)</label>
            <select
              name="busType"
              value={formData.busType}
              onChange={handleChange}
            >
              <option value="Non-Aircon">Non-Aircon</option>
              <option value="Aircon">Aircon</option>
            </select>
          </div>

          <div>
            <label>Passengers</label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {currentPrice && (
            <div className="price-info">
              <strong>Price per passenger: ₱{currentPrice}</strong>
              <br />
              <span>
                Total for {formData.passengers} passenger(s): ₱
                {currentPrice * parseInt(formData.passengers)}
              </span>
            </div>
          )}

          <div className="full-width">
            <button type="submit">Continue Payment</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
