import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const services = [
    {
      icon: 'fas fa-user-md',
      title: 'Expert Doctors',
      description: 'Connect with certified and experienced medical professionals'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Easy Booking',
      description: 'Schedule appointments with your preferred doctors instantly'
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Health Monitoring',
      description: 'Track your health records and medical history securely'
    },
    {
      icon: 'fas fa-ambulance',
      title: 'Emergency Care',
      description: '24/7 emergency services and immediate medical assistance'
    },
    {
      icon: 'fas fa-pills',
      title: 'Prescription Management',
      description: 'Digital prescriptions and medication tracking'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Access',
      description: 'Access healthcare services from anywhere, anytime'
    }
  ];

  const featuredDoctors = [
    {
      id: 1,
      name: 'Dr. Sneha Rao',
      specialty: 'Cardiology',
      experience: '15 years',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Dr. Arjun Gupta',
      specialty: 'Neurology',
      experience: '12 years',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Dr. Harsha Singh',
      specialty: 'Pediatrics',
      experience: '10 years',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title fade-in">
                Your Health, Our Priority
              </h1>
              <p className="hero-subtitle fade-in">
                Connect with certified doctors, book appointments, and manage your healthcare 
                journey with AegleCare - the most trusted healthcare management platform.
              </p>
              <div className="fade-in">
                <Link to="/register" className="btn btn-light btn-lg me-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Healthcare Professional" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <h2 className="section-title text-start">About AegleCare</h2>
              <p className="text-muted mb-4">
                AegleCare is a comprehensive healthcare management system designed to bridge 
                the gap between patients and healthcare providers. Our platform ensures quality 
                medical care through certified professionals and advanced technology.
              </p>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-primary me-3"></i>
                    <span>Certified Doctors</span>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-primary me-3"></i>
                    <span>Secure Platform</span>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-primary me-3"></i>
                    <span>24/7 Support</span>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-primary me-3"></i>
                    <span>Easy Booking</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Medical Team" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive healthcare solutions designed for your convenience and well-being
          </p>
          
          <div className="row">
            {services.map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="service-card slide-up">
                  <i className={`${service.icon} service-icon`}></i>
                  <h4 className="mb-3">{service.title}</h4>
                  <p className="text-muted">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section id="doctors" className="section-padding bg-light">
        <div className="container">
          <h2 className="section-title">Featured Doctors</h2>
          <p className="section-subtitle">
            Meet our certified medical professionals dedicated to your health
          </p>
          
          <div className="row">
            {featuredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-lg-4 col-md-6 mb-4">
                <div className="doctor-card slide-up">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <h4 className="mb-2">{doctor.name}</h4>
                  <p className="text-primary mb-1">{doctor.specialty}</p>
                  <p className="text-muted mb-2">{doctor.experience} experience</p>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="text-warning me-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(doctor.rating) ? '' : 'text-muted'}`}></i>
                      ))}
                    </div>
                    <span className="text-muted">({doctor.rating})</span>
                  </div>
                  <Link to={`/doctor/${doctor.id}`} className="btn btn-outline-primary">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stats-card bg-transparent text-white">
                <div className="stats-number text-white">500+</div>
                <div className="stats-label text-white-50">Certified Doctors</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stats-card bg-transparent text-white">
                <div className="stats-number text-white">10,000+</div>
                <div className="stats-label text-white-50">Happy Patients</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stats-card bg-transparent text-white">
                <div className="stats-number text-white">50+</div>
                <div className="stats-label text-white-50">Specializations</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stats-card bg-transparent text-white">
                <div className="stats-number text-white">24/7</div>
                <div className="stats-label text-white-50">Emergency Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have questions? We're here to help you with your healthcare needs
          </p>
          
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card">
                <div className="card-body p-5">
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea className="form-control" rows="5" required></textarea>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;