import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  if (!bookingData) {
    navigate('/book-appointment');
    return null;
  }

  const totalAmount = (bookingData.doctor ? 150 : 0) + 5; // Mock calculation

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      alert('Payment successful! Your appointment has been booked.');
      navigate('/patient-dashboard');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-header bg-success text-white">
                <h3 className="mb-0">
                  <i className="fas fa-credit-card me-2"></i>
                  Payment
                </h3>
              </div>

              <div className="card-body p-5">
                <div className="row">
                  {/* Payment Form */}
                  <div className="col-lg-8">
                    <h4 className="mb-4">Payment Details</h4>

                    {/* Payment Method Selection */}
                    <div className="mb-4">
                      <label className="form-label">Payment Method</label>
                      <div className="row">
                        <div className="col-md-4 mb-2">
                          <div 
                            className={`card payment-method-card ${paymentMethod === 'card' ? 'border-primary' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setPaymentMethod('card')}
                          >
                            <div className="card-body text-center py-3">
                              <i className="fas fa-credit-card fs-2 text-primary mb-2"></i>
                              <div>Credit/Debit Card</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-2">
                          <div 
                            className={`card payment-method-card ${paymentMethod === 'razorpay' ? 'border-primary' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setPaymentMethod('razorpay')}
                          >
                            <div className="card-body text-center py-3">
                              <i className="fas fa-mobile-alt fs-2 text-primary mb-2"></i>
                              <div>Razorpay</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-2">
                          <div 
                            className={`card payment-method-card ${paymentMethod === 'upi' ? 'border-primary' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setPaymentMethod('upi')}
                          >
                            <div className="card-body text-center py-3">
                              <i className="fas fa-qrcode fs-2 text-primary mb-2"></i>
                              <div>UPI</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Payment Form */}
                    {paymentMethod === 'card' && (
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <label className="form-label">Card Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="1234 5678 9012 3456"
                              value={paymentData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Expiry Date</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">CVV</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label">Cardholder Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={paymentData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-success btn-lg w-100"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="loading-spinner me-2"></span>
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-lock me-2"></i>
                              Pay ${totalAmount}
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {/* Other Payment Methods */}
                    {paymentMethod !== 'card' && (
                      <div className="text-center py-5">
                        <i className="fas fa-tools fs-1 text-muted mb-3"></i>
                        <h5 className="text-muted">Integration Coming Soon</h5>
                        <p className="text-muted">This payment method will be available soon.</p>
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => setPaymentMethod('card')}
                        >
                          Use Card Payment
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="col-lg-4">
                    <div className="card border">
                      <div className="card-header">
                        <h5 className="mb-0">Booking Summary</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <h6 className="text-primary">Appointment Details</h6>
                          <div className="small text-muted mb-1">Doctor: Dr. Sarah Johnson</div>
                          <div className="small text-muted mb-1">Specialty: {bookingData.specialization}</div>
                          <div className="small text-muted mb-1">Date: {new Date(bookingData.date).toLocaleDateString()}</div>
                          <div className="small text-muted mb-1">Time: {bookingData.time}</div>
                          <div className="small text-muted">Type: {bookingData.type}</div>
                        </div>

                        <hr />

                        <div className="mb-3">
                          <h6 className="text-primary">Payment Breakdown</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Consultation Fee:</span>
                            <span>$150</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Platform Fee:</span>
                            <span>$5</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Tax:</span>
                            <span>$0</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong>Total Amount:</strong>
                            <strong className="text-success">${totalAmount}</strong>
                          </div>
                        </div>

                        <div className="alert alert-info">
                          <i className="fas fa-info-circle me-2"></i>
                          <small>
                            Your appointment will be confirmed after successful payment.
                          </small>
                        </div>

                        <div className="text-center">
                          <i className="fas fa-shield-alt text-success me-2"></i>
                          <small className="text-muted">Secure Payment</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;