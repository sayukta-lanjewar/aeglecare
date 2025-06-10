import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    city: '',
    specialization: '',
    doctor: '',
    date: '',
    time: '',
    type: 'consultation'
  });

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const specializations = [
  'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics',
  'Dermatology', 'General Medicine', 'Psychiatry', 'Oncology'
];

const [availableDoctors] = useState({
  'Cardiology': [
    { id: 1, name: 'Dr. Arjun Mehta', rating: 4.9, experience: 16, fee: 500 },
    { id: 2, name: 'Dr. Kavita Nair', rating: 4.8, experience: 12, fee: 450 }
  ],
  'Neurology': [
    { id: 3, name: 'Dr. Ramesh Kulkarni', rating: 4.9, experience: 14, fee: 600 },
    { id: 4, name: 'Dr. Sneha Rao', rating: 4.7, experience: 11, fee: 550 }
  ],
  'Pediatrics': [
    { id: 5, name: 'Dr. Neha Shah', rating: 4.8, experience: 10, fee: 400 },
    { id: 6, name: 'Dr. Sameer Gupta', rating: 4.6, experience: 9, fee: 350 }
  ],
  'Orthopedics': [
    { id: 7, name: 'Dr. Rajeev Malhotra', rating: 4.7, experience: 13, fee: 480 },
    { id: 8, name: 'Dr. Priya Sinha', rating: 4.5, experience: 7, fee: 420 }
  ],
  'Dermatology': [
    { id: 9, name: 'Dr. Anjali Verma', rating: 4.8, experience: 10, fee: 370 },
    { id: 10, name: 'Dr. Manish Tiwari', rating: 4.6, experience: 8, fee: 360 }
  ],
  'General Medicine': [
    { id: 11, name: 'Dr. Shweta Deshmukh', rating: 4.9, experience: 15, fee: 300 },
    { id: 12, name: 'Dr. Akash Jain', rating: 4.7, experience: 11, fee: 280 }
  ],
  'Psychiatry': [
    { id: 13, name: 'Dr. Pooja Batra', rating: 4.8, experience: 12, fee: 600 },
    { id: 14, name: 'Dr. Kunal Menon', rating: 4.6, experience: 10, fee: 580 }
  ],
  'Oncology': [
    { id: 15, name: 'Dr. Anurag Srivastava', rating: 4.9, experience: 18, fee: 700 },
    { id: 16, name: 'Dr. Meena George', rating: 4.7, experience: 14, fee: 650 }
  ]
});


  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBooking = () => {
    // Navigate to payment page with booking data
    navigate('/payment', { state: { bookingData } });
  };

  const getSelectedDoctor = () => {
    if (!bookingData.specialization || !bookingData.doctor) return null;
    const doctors = availableDoctors[bookingData.specialization] || [];
    return doctors.find(doc => doc.id.toString() === bookingData.doctor);
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">
                  <i className="fas fa-calendar-plus me-2"></i>
                  Book Appointment
                </h3>
                
                {/* Progress Steps */}
                <div className="progress mt-3" style={{ height: '4px' }}>
                  <div 
                    className="progress-bar bg-light" 
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <small className={step >= 1 ? 'text-white' : 'text-white-50'}>Location</small>
                  <small className={step >= 2 ? 'text-white' : 'text-white-50'}>Doctor</small>
                  <small className={step >= 3 ? 'text-white' : 'text-white-50'}>Schedule</small>
                  <small className={step >= 4 ? 'text-white' : 'text-white-50'}>Confirm</small>
                </div>
              </div>

              <div className="card-body p-5">
                {/* Step 1: City & Specialization */}
                {step === 1 && (
                  <div className="fade-in">
                    <h4 className="mb-4">Select Location & Specialization</h4>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">City</label>
                        <select
                          className="form-select"
                          value={bookingData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        >
                          <option value="">Choose City</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Specialization</label>
                        <select
                          className="form-select"
                          value={bookingData.specialization}
                          onChange={(e) => handleInputChange('specialization', e.target.value)}
                          required
                        >
                          <option value="">Choose Specialization</option>
                          {specializations.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Appointment Type</label>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="appointmentType"
                              value="consultation"
                              checked={bookingData.type === 'consultation'}
                              onChange={(e) => handleInputChange('type', e.target.value)}
                            />
                            <label className="form-check-label">
                              <strong>Consultation</strong>
                              <div className="text-muted small">General consultation and diagnosis</div>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="appointmentType"
                              value="followup"
                              checked={bookingData.type === 'followup'}
                              onChange={(e) => handleInputChange('type', e.target.value)}
                            />
                            <label className="form-check-label">
                              <strong>Follow-up</strong>
                              <div className="text-muted small">Follow-up appointment</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!bookingData.city || !bookingData.specialization}
                      >
                        Next <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Doctor Selection */}
                {step === 2 && (
                  <div className="fade-in">
                    <h4 className="mb-4">Select Doctor</h4>
                    
                    <div className="row">
                      {(availableDoctors[bookingData.specialization] || []).map(doctor => (
                        <div key={doctor.id} className="col-md-6 mb-3">
                          <div 
                            className={`card doctor-selection-card ${bookingData.doctor === doctor.id.toString() ? 'border-primary' : ''}`}
                            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onClick={() => handleInputChange('doctor', doctor.id.toString())}
                          >
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="card-title mb-0">{doctor.name}</h5>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="doctor"
                                    value={doctor.id}
                                    checked={bookingData.doctor === doctor.id.toString()}
                                    readOnly
                                  />
                                </div>
                              </div>
                              
                              <p className="text-muted mb-2">{bookingData.specialization}</p>
                              
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-warning me-2">
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`fas fa-star ${i < Math.floor(doctor.rating) ? '' : 'text-muted'}`}></i>
                                  ))}
                                </div>
                                <span className="text-muted">({doctor.rating})</span>
                              </div>
                              
                              <div className="mb-2">
                                <small className="text-muted">
                                  <i className="fas fa-user-md me-1"></i>
                                  {doctor.experience} years experience
                                </small>
                              </div>
                              
                              <div className="text-primary fw-bold">
                                <i className="fas fa-dollar-sign me-1"></i>
                                ${doctor.fee} consultation fee
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-secondary" onClick={handlePrevious}>
                        <i className="fas fa-arrow-left me-2"></i> Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!bookingData.doctor}
                      >
                        Next <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time Selection */}
                {step === 3 && (
                  <div className="fade-in">
                    <h4 className="mb-4">Select Date & Time</h4>
                    
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label">Appointment Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={bookingData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>

                    {bookingData.date && (
                      <div>
                        <label className="form-label">Available Time Slots</label>
                        <div className="row">
                          {timeSlots.map(time => (
                            <div key={time} className="col-md-3 col-sm-4 col-6 mb-2">
                              <button
                                type="button"
                                className={`btn w-100 ${bookingData.time === time ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleInputChange('time', time)}
                              >
                                {time}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <button className="btn btn-outline-secondary" onClick={handlePrevious}>
                        <i className="fas fa-arrow-left me-2"></i> Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!bookingData.date || !bookingData.time}
                      >
                        Next <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div className="fade-in">
                    <h4 className="mb-4">Confirm Appointment</h4>
                    
                    <div className="card border">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="text-primary mb-3">Appointment Details</h5>
                            <div className="mb-2">
                              <strong>Doctor:</strong> {getSelectedDoctor()?.name}
                            </div>
                            <div className="mb-2">
                              <strong>Specialization:</strong> {bookingData.specialization}
                            </div>
                            <div className="mb-2">
                              <strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}
                            </div>
                            <div className="mb-2">
                              <strong>Time:</strong> {bookingData.time}
                            </div>
                            <div className="mb-2">
                              <strong>Type:</strong> {bookingData.type.charAt(0).toUpperCase() + bookingData.type.slice(1)}
                            </div>
                            <div className="mb-2">
                              <strong>Location:</strong> {bookingData.city}
                            </div>
                          </div>
                          
                          <div className="col-md-6">
                            <h5 className="text-primary mb-3">Payment Summary</h5>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Consultation Fee:</span>
                              <span>${getSelectedDoctor()?.fee}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Platform Fee:</span>
                              <span>$5</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                              <strong>Total Amount:</strong>
                              <strong className="text-primary">${(getSelectedDoctor()?.fee || 0) + 5}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button className="btn btn-outline-secondary" onClick={handlePrevious}>
                        <i className="fas fa-arrow-left me-2"></i> Previous
                      </button>
                      <button className="btn btn-success btn-lg" onClick={handleBooking}>
                        <i className="fas fa-credit-card me-2"></i>
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;