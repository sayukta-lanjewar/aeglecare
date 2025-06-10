import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-primary mb-3">
              <i className="fas fa-heartbeat me-2"></i>
              AegleCare
            </h5>
            <p className="mb-3">
              Professional healthcare management system providing quality medical services 
              and connecting patients with certified doctors.
            </p>
            <div className="d-flex">
              <a href="#" className="text-light me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-light"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-uppercase mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/login" className="text-light text-decoration-none">Login</Link></li>
              <li><Link to="/register" className="text-light text-decoration-none">Register</Link></li>
              <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-uppercase mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><span className="text-light">Emergency Care</span></li>
              <li><span className="text-light">Online Consultation</span></li>
              <li><span className="text-light">Appointment Booking</span></li>
              <li><span className="text-light">Health Records</span></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 className="text-uppercase mb-3">Contact Info</h6>
            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-map-marker-alt me-3"></i>
              <span>123 Healthcare Street, Medical City, HC 12345</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-phone me-3"></i>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-envelope me-3"></i>
              <span>info@aeglecare.com</span>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2024 AegleCare. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-light text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-light text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;