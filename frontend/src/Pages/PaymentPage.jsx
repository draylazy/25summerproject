import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';
import { Helmet } from 'react-helmet';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const breakdownRef = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nextBookingId, setNextBookingId] = useState(null);
  const [cardNumber, setCardNumber] = useState('');

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

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

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
        amountPaid: totalPrice,
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

      <div className="payment-box swapped-layout">
        <div className="payment-container">
          <h2>Payment Details</h2>
          <div className="payment-method-group">
            <p className="choose-payment-label">Choose Payment Method</p>
            <div className="payment-method-buttons">
            <button type="button" className={paymentMethod === 'card' ? 'active' : ''} onClick={() => setPaymentMethod('card')}>
              <img src="src/images/card1.png" alt="Card" />
            </button>
            <button type="button" className={paymentMethod === 'gcash' ? 'active' : ''} onClick={() => setPaymentMethod('gcash')}>
              <img src="src/images/gcash.png" alt="GCash" />
            </button>
            <button type="button" className={paymentMethod === 'maya' ? 'active' : ''} onClick={() => setPaymentMethod('maya')}>
              <img src="src/images/maya.png" alt="Maya" />
            </button>
          </div>

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
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    pattern="\d{4} \d{4} \d{4} \d{4}"
                    inputMode="numeric"
                    required
                  />
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
                  <input type="tel" pattern="09[0-9]{9}" maxLength="11" placeholder="09XXXXXXXXX" required />
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

        <div className="summary-box">
          <h2>Booking Summary</h2>
          <ul>
            <li><span className="summary-label">Booking ID:</span> <span className="summary-value">{nextBookingId || 'Loading...'}</span></li>
            <li><span className="summary-label">From:</span> <span className="summary-value">{data.from}</span></li>
            <li><span className="summary-label">To:</span> <span className="summary-value">{data.to}</span></li>
            <li><span className="summary-label">Date:</span> <span className="summary-value">{data.date}</span></li>
            <li><span className="summary-label">Bus Type:</span> <span className="summary-value">{data.busType}</span></li>
            <li><span className="summary-label">Passengers:</span> <span className="summary-value">{data.passengers}</span></li>
          </ul>

          <div className="total-price">
            Total: ₱{totalPrice}
            <button className="toggle-breakdown" onClick={() => setShowBreakdown(!showBreakdown)}>
              {showBreakdown ? 'Hide' : 'Show'} Breakdown
            </button>
          </div>

          <div
            ref={breakdownRef}
            className={`price-breakdown-wrapper ${showBreakdown ? 'expanded' : ''}`}
            style={{
              maxHeight: showBreakdown ? `${breakdownRef.current?.scrollHeight}px` : '0px',
              opacity: showBreakdown ? 1 : 0,
            }}
          >
            {data.busType === 'Aircon' ? (
              <>
                <div className="summary-item">
                  <span className="summary-label">Base Fare</span>
                  <strong className="summary-value">₱{data.pricePerPassenger - 50}</strong>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Aircon Surcharge</span>
                  <strong className="summary-value">₱50</strong>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Passengers</span>
                  <strong className="summary-value">{data.passengers}</strong>
                </div>
                <hr />
                <div className="summary-item">
                  <span className="summary-label">Total / Passenger</span>
                  <strong className="summary-value">₱{data.pricePerPassenger}</strong>
                </div>
                <div className="summary-item">
                  <strong className="summary-label" style={{ opacity: 1 }}>Grand Total</strong>
                  <strong className="summary-value total">₱{totalPrice}</strong>
                </div>
              </>
            ) : (
              <>
                <div className="summary-item">
                  <span className="summary-label">Base Fare</span>
                  <strong className="summary-value">₱{data.pricePerPassenger}</strong>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Passengers</span>
                  <strong className="summary-value">{data.passengers}</strong>
                </div>
                <hr />
                <div className="summary-item">
                  <strong className="summary-label" style={{ opacity: 1 }}>Grand Total</strong>
                  <strong className="summary-value total">₱{totalPrice}</strong>
                </div>
              </>
            )}
          </div>
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
