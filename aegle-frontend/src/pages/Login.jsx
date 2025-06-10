import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock login - replace with actual API call
      const mockResponse = await mockLogin(formData);
      
      if (mockResponse.success) {
        login(mockResponse.user, mockResponse.token);
        
        // Redirect based on role
        switch (mockResponse.user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'patient':
            navigate('/patient-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(mockResponse.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock login function - replace with actual API call
  const mockLogin = async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // Mock users for testing
    const mockUsers = [
      {
        email: 'admin@aeglecare.com',
        password: 'admin123',
        user: { id: 1, name: 'Admin User', email: 'admin@aeglecare.com', role: 'admin' }
      },
      {
        email: 'doctor@aeglecare.com',
        password: 'doctor123',
        user: { id: 2, name: 'Dr. John Smith', email: 'doctor@aeglecare.com', role: 'doctor', specialty: 'Cardiology' }
      },
      {
        email: 'patient@aeglecare.com',
        password: 'patient123',
        user: { id: 3, name: 'Jane Doe', email: 'patient@aeglecare.com', role: 'patient' }
      }
    ];

    const foundUser = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      return {
        success: true,
        user: foundUser.user,
        token: 'mock-jwt-token-' + foundUser.user.id
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="text-primary mb-2">
                    <i className="fas fa-heartbeat me-2"></i>
                    AegleCare
                  </h2>
                  <h3 className="h4 text-dark mb-3">Welcome Back</h3>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="text-muted mb-3">Demo Accounts:</p>
                  <div className="row text-start">
                    <div className="col-12 mb-2">
                      <small className="text-muted">
                        <strong>Admin:</strong> admin@aeglecare.com / admin123
                      </small>
                    </div>
                    <div className="col-12 mb-2">
                      <small className="text-muted">
                        <strong>Doctor:</strong> doctor@aeglecare.com / doctor123
                      </small>
                    </div>
                    <div className="col-12 mb-3">
                      <small className="text-muted">
                        <strong>Patient:</strong> patient@aeglecare.com / patient123
                      </small>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none">
                      Sign up here
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

export default Login;