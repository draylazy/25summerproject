import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';
import { Helmet } from 'react-helmet';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nextBookingId, setNextBookingId] = useState(null); 

  
  useEffect(() => {
  const fetchLastBookingId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/last-id');
      const lastId = response.data.lastId || 0;   
      setNextBookingId(lastId + 1);
    } catch (error) {
      console.error('Failed to fetch last booking ID:', error);
      setNextBookingId('N/A');
    }
  };

  fetchLastBookingId();
}, []);


  const airconSurcharge = data.busType === 'Aircon' ? 50 : 0;

  const getBaseFare = () => {
    if (!data.pricePerPassenger) return 0;
    const passengers = parseInt(data.passengers || 1);
    return data.pricePerPassenger * passengers;
  };

  const totalPrice = getBaseFare();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingResponse = await axios.post('http://localhost:8080/api/bookings/create', {
        terminal: data.from,
        destination: data.to,
        date: data.date,
        busType: data.busType,
        passengerCount: parseInt(data.passengers),
        pricePerPassenger: data.pricePerPassenger
      });

      const createdBookingId = bookingResponse.data.id;

      await axios.post('http://localhost:8080/api/payments/create', {
        bookingId: createdBookingId,
        amount: totalPrice,
        method: paymentMethod,
        paymentDate: new Date().toISOString(),
      });

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment error. Try again.');
    }
  };

  return (
    <div className="payment-wrapper">
      <Helmet>
        <title>Biyahero | Payment</title>
      </Helmet>

      <div className="payment-box">
        <div className="summary-box">
          <h2>Booking Summary</h2>
          <ul>
            <li>
              <strong>Booking Id:</strong>{' '}
              {nextBookingId !== null ? nextBookingId : 'Loading...'}
            </li>
            <li><strong>From:</strong> {data.from}</li>
            <li><strong>To:</strong> {data.to}</li>
            <li><strong>Date:</strong> {data.date}</li>
            <li><strong>Bus Type:</strong> {data.busType}</li>
            <li><strong>Passengers:</strong> {data.passengers}</li>
          </ul>

          <div className="total-price">
            Total: ₱{totalPrice}
            <button
              className="toggle-breakdown"
              onClick={() => setShowBreakdown(!showBreakdown)}
            >
              {showBreakdown ? 'Hide' : 'Show'} Breakdown
            </button>
          </div>

          {showBreakdown && (
            <div className="price-breakdown">
              {data.busType === 'Aircon' ? (
                <>
                  <p>Base fare per passenger: ₱{data.pricePerPassenger - 50}</p>
                  <p>Aircon surcharge per passenger: ₱50</p>
                  <p>Passengers: {data.passengers}</p>
                  <hr />
                  <p>Total per passenger: ₱{data.pricePerPassenger}</p>
                  <strong>Grand Total: ₱{totalPrice}</strong>
                </>
              ) : (
                <>
                  <p>Base fare per passenger: ₱{data.pricePerPassenger}</p>
                  <p>Passengers: {data.passengers}</p>
                  <hr />
                  <strong>Total: ₱{totalPrice}</strong>
                </>
              )}
            </div>
          )}
        </div>

        <div className="payment-container">
          <h2>Payment Details</h2>

          <p>Choose Payment Method:</p>
          <div className="payment-method-buttons">
            <button
              type="button"
              className={paymentMethod === 'card' ? 'active' : ''}
              onClick={() => setPaymentMethod('card')}
            >
              <img src="src/images/card1.png" alt="Card" />
            </button>
            <button
              type="button"
              className={paymentMethod === 'gcash' ? 'active' : ''}
              onClick={() => setPaymentMethod('gcash')}
            >
              <img src="src/images/gcash.png" alt="GCash" />
            </button>
            <button
              type="button"
              className={paymentMethod === 'maya' ? 'active' : ''}
              onClick={() => setPaymentMethod('maya')}
            >
              <img src="src/images/maya.png" alt="Maya" />
            </button>
          </div>

          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div>
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" required />
                </div>
                <div>
                  <label>Expiration Date</label>
                  <input type="month" required />
                </div>
                <div>
                  <label>CVV</label>
                  <input type="password" placeholder="123" required />
                </div>
              </>
            )}

            {(paymentMethod === 'gcash' || paymentMethod === 'maya') && (
              <>
                <div>
                  <label>{paymentMethod.toUpperCase()} Account Number</label>
                  <input type="text" placeholder="09XXXXXXXXX" required />
                </div>
                <div>
                  <label>Account Holder Name</label>
                  <input type="text" placeholder="Full Name" required />
                </div>
              </>
            )}

            <button type="submit">Pay Now</button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="payment-success-modal">
          <div className="payment-success-box">
            <div className="check-img">
              <img src="src/images/paldocheck.gif" alt="checkpayment" />
            </div>
            <h3>✅ Payment Successful!</h3>
            <p>Redirecting you to the homepage...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
