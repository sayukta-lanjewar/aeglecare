import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
    specialty: '',
    experience: '',
    certificate: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.role === 'doctor' && !formData.certificate) {
      setError('Please upload your medical certificate');
      setLoading(false);
      return;
    }

    try {
      // Mock registration - replace with actual API call
      const mockResponse = await mockRegister(formData);
      
      if (mockResponse.success) {
        if (formData.role === 'doctor') {
          setSuccess('Registration successful! Your account is pending admin approval.');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          login(mockResponse.user, mockResponse.token);
          navigate(formData.role === 'admin' ? '/admin-dashboard' : '/patient-dashboard');
        }
      } else {
        setError(mockResponse.message);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock registration function - replace with actual API call
  const mockRegister = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    if (userData.email === 'existing@aeglecare.com') {
      return {
        success: false,
        message: 'Email already exists'
      };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      ...(userData.role === 'doctor' && {
        specialty: userData.specialty,
        experience: userData.experience,
        status: 'pending'
      })
    };

    return {
      success: true,
      user: newUser,
      token: 'mock-jwt-token-' + newUser.id
    };
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="text-primary mb-2">
                    <i className="fas fa-heartbeat me-2"></i>
                    AegleCare
                  </h2>
                  <h3 className="h4 text-dark mb-3">Create Account</h3>
                  <p className="text-muted">Join our healthcare community</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="role" className="form-label">Account Type</label>
                      <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  {formData.role === 'doctor' && (
                    <>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="specialty" className="form-label">Specialization</label>
                          <select
                            className="form-control"
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Specialization</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="General Medicine">General Medicine</option>
                          </select>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="experience" className="form-label">Experience (Years)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            min="1"
                            max="50"
                            placeholder="Years of experience"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="certificate" className="form-label">
                          Medical Certificate <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="certificate"
                          name="certificate"
                          onChange={handleChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                        <div className="form-text">
                          Upload your medical certificate (PDF, JPG, PNG - Max 5MB)
                        </div>
                      </div>
                    </>
                  )}

                  {formData.role === 'admin' && (
                    <div className="alert alert-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <strong>Admin Registration:</strong> Admin accounts require special verification. 
                      Your account will be reviewed before activation.
                    </div>
                  )}

                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the{' '}
                      <Link to="/terms" className="text-decoration-none">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner me-2"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Sign in here
                    </Link>
                  </p>
                </div>

                <div className="text-center mt-3">
                  <Link to="/" className="text-muted text-decoration-none">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;