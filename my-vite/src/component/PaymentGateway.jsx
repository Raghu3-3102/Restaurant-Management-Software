import React, { useState } from 'react';
import '../Style/PaymentGateway.css'
// import creditCardImage from './credit-card.png'; // Import your credit card image


function PaymentGateway() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim());
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value.toUpperCase());
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value.replace(/[^0-9]/g, '').replace(/(.{2})/, '$1/').slice(0, 5));
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/[^\d]/g, '').slice(0, 3));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing logic here
    console.log('Payment submitted');
  };

  return (
    <div className="payment-container">
      <h1>Credit Card Payment</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="password"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter card number"
            maxLength="19"
            required
          />
        </div>
        <div className="form-group">
          <label>Card Holder:</label>
          <input
            type="text"
            value={cardHolder}
            onChange={handleCardHolderChange}
            placeholder="Enter card holder's name"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date:</label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div className="form-group">
            <label>CVV:</label>
            <input
              type="password"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              maxLength="3"
              required
            />
          </div>
        </div>
        <button type="submit" className="pay-btn">Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentGateway;














