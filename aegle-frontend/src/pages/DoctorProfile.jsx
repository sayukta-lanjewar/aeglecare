import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DoctorProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  // Mock doctor data - replace with API call
  const doctor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: 15,
    rating: 4.9,
    reviewCount: 127,
    fee: 150,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2000 successful procedures.',
    education: [
      'MD in Cardiology - Harvard Medical School',
      'MBBS - Johns Hopkins University',
      'Fellowship in Interventional Cardiology - Mayo Clinic'
    ],
    certifications: [
      'Board Certified Cardiologist',
      'Fellow of American College of Cardiology',
      'Certified in Advanced Cardiac Life Support'
    ],
    languages: ['English', 'Spanish', 'French'],
    availability: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed'
    }
  };

  const reviews = [
    {
      id: 1,
      patientName: 'John D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent doctor! Very thorough and caring. Explained everything clearly.'
    },
    {
      id: 2,
      patientName: 'Mary S.',
      rating: 5,
      date: '2024-01-10',
      comment: 'Dr. Johnson is amazing. She took time to listen to my concerns and provided great care.'
    },
    {
      id: 3,
      patientName: 'Robert K.',
      rating: 4,
      date: '2024-01-08',
      comment: 'Professional and knowledgeable. Would definitely recommend.'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="row">
          {/* Doctor Info Card */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-lg">
              <div className="card-body text-center p-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h3 className="text-primary mb-2">{doctor.name}</h3>
                <p className="text-muted mb-3">{doctor.specialty}</p>
                
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(doctor.rating) ? '' : 'text-muted'}`}></i>
                    ))}
                  </div>
                  <span className="text-muted">({doctor.rating}) • {doctor.reviewCount} reviews</span>
                </div>

                <div className="row text-center mb-4">
                  <div className="col-6">
                    <div className="border-end">
                      <h5 className="text-primary mb-0">{doctor.experience}</h5>
                      <small className="text-muted">Years Experience</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <h5 className="text-success mb-0">${doctor.fee}</h5>
                    <small className="text-muted">Consultation Fee</small>
                  </div>
                </div>

                <button className="btn btn-primary btn-lg w-100 mb-3">
                  <i className="fas fa-calendar-plus me-2"></i>
                  Book Appointment
                </button>

                <div className="text-center">
                  <button className="btn btn-outline-primary me-2">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="btn btn-outline-primary me-2">
                    <i className="fas fa-video"></i>
                  </button>
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-envelope"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="mb-0">Quick Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Languages:</strong>
                  <div className="mt-1">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="badge bg-light text-dark me-1">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <strong>Consultation Types:</strong>
                  <div className="mt-1">
                    <span className="badge bg-primary me-1">In-Person</span>
                    <span className="badge bg-success me-1">Video Call</span>
                    <span className="badge bg-info">Phone Call</span>
                  </div>
                </div>

                <div>
                  <strong>Response Time:</strong>
                  <div className="text-muted">Usually responds within 2 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-8">
            {/* Navigation Tabs */}
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                      onClick={() => setActiveTab('about')}
                    >
                      About
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'availability' ? 'active' : ''}`}
                      onClick={() => setActiveTab('availability')}
                    >
                      Availability
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                      onClick={() => setActiveTab('reviews')}
                    >
                      Reviews ({doctor.reviewCount})
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="fade-in">
                    <h4 className="mb-4">About Dr. {doctor.name.split(' ')[1]}</h4>
                    <p className="text-muted mb-4">{doctor.about}</p>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <h5 className="text-primary mb-3">Education</h5>
                        <ul className="list-unstyled">
                          {doctor.education.map((edu, index) => (
                            <li key={index} className="mb-2">
                              <i className="fas fa-graduation-cap text-primary me-2"></i>
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col-md-6 mb-4">
                        <h5 className="text-primary mb-3">Certifications</h5>
                        <ul className="list-unstyled">
                          {doctor.certifications.map((cert, index) => (
                            <li key={index} className="mb-2">
                              <i className="fas fa-certificate text-primary me-2"></i>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-primary mb-3">Specializations</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Interventional Cardiology
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Cardiac Catheterization
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Angioplasty
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Heart Disease Prevention
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Echocardiography
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Cardiac Rehabilitation
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Availability Tab */}
                {activeTab === 'availability' && (
                  <div className="fade-in">
                    <h4 className="mb-4">Availability Schedule</h4>
                    <div className="row">
                      {Object.entries(doctor.availability).map(([day, time]) => (
                        <div key={day} className="col-md-6 mb-3">
                          <div className="card border">
                            <div className="card-body py-3">
                              <div className="d-flex justify-content-between align-items-center">
                                <strong className="text-capitalize">{day}</strong>
                                <span className={`badge ${time === 'Closed' ? 'bg-danger' : 'bg-success'}`}>
                                  {time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="alert alert-info mt-4">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Note:</strong> Appointment slots are available every 30 minutes during working hours.
                      Emergency consultations may be available outside regular hours.
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="fade-in">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="mb-0">Patient Reviews</h4>
                      <div className="text-end">
                        <div className="text-warning fs-4">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < Math.floor(doctor.rating) ? '' : 'text-muted'}`}></i>
                          ))}
                        </div>
                        <div className="text-muted">
                          {doctor.rating}/5.0 ({doctor.reviewCount} reviews)
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {reviews.map(review => (
                        <div key={review.id} className="col-12 mb-4">
                          <div className="card border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h6 className="mb-1">{review.patientName}</h6>
                                  <div className="text-warning">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <i key={i} className="fas fa-star"></i>
                                    ))}
                                  </div>
                                </div>
                                <small className="text-muted">
                                  {new Date(review.date).toLocaleDateString()}
                                </small>
                              </div>
                              <p className="text-muted mb-0">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <button className="btn btn-outline-primary">
                        Load More Reviews
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

export default DoctorProfile;