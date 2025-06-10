import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [stats] = useState({
    upcomingAppointments: 2,
    completedAppointments: 8,
    totalDoctors: 3,
    healthRecords: 12
  });

  const [upcomingAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-25',
      time: '10:00 AM',
      status: 'Confirmed',
      type: 'Consultation'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: '2024-01-28',
      time: '02:30 PM',
      status: 'Pending',
      type: 'Follow-up'
    }
  ]);

  const [recentAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Pediatrics',
      date: '2024-01-15',
      time: '11:00 AM',
      status: 'Completed',
      rating: 5,
      canReview: false
    },
    {
      id: 2,
      doctorName: 'Dr. Robert Wilson',
      specialty: 'General Medicine',
      date: '2024-01-10',
      time: '09:30 AM',
      status: 'Completed',
      rating: null,
      canReview: true
    }
  ]);

  const [healthRecords] = useState([
    {
      id: 1,
      type: 'Blood Test',
      date: '2024-01-15',
      doctor: 'Dr. Emily Davis',
      status: 'Normal'
    },
    {
      id: 2,
      type: 'X-Ray',
      date: '2024-01-10',
      doctor: 'Dr. Robert Wilson',
      status: 'Review Required'
    }
  ]);

  const sidebarItems = [
    { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Appointments' },
    { id: 'doctors', icon: 'fas fa-user-md', label: 'My Doctors' },
    { id: 'records', icon: 'fas fa-file-medical', label: 'Health Records' },
    { id: 'prescriptions', icon: 'fas fa-pills', label: 'Prescriptions' },
    { id: 'profile', icon: 'fas fa-user', label: 'Profile' }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 dashboard-sidebar p-0">
          <div className="p-4">
            <h4 className="text-white mb-4">
              <i className="fas fa-heartbeat me-2"></i>
              AegleCare
            </h4>
            <div className="text-center mb-4">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '60px', height: '60px' }}>
                <i className="fas fa-user text-primary fs-4"></i>
              </div>
              <h6 className="text-white mt-2 mb-1">{user.name}</h6>
              <small className="text-white-50">Patient</small>
            </div>
          </div>
          
          <nav className="sidebar-nav px-3">
            {sidebarItems.map(item => (
              <a
                key={item.id}
                href="#"
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
              >
                <i className={`${item.icon} me-3`}></i>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 dashboard-content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Patient Dashboard</h2>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">
                <i className="fas fa-calendar me-2"></i>
                {new Date().toLocaleDateString()}
              </span>
              <Link to="/book-appointment" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="fade-in">
              {/* Stats Cards */}
              <div className="row mb-4">
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-calendar-check text-primary mb-3 fs-2"></i>
                    <div className="stats-number">{stats.upcomingAppointments}</div>
                    <div className="stats-label">Upcoming Appointments</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-check-circle text-success mb-3 fs-2"></i>
                    <div className="stats-number">{stats.completedAppointments}</div>
                    <div className="stats-label">Completed</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-user-md text-info mb-3 fs-2"></i>
                    <div className="stats-number">{stats.totalDoctors}</div>
                    <div className="stats-label">Doctors Consulted</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-file-medical text-warning mb-3 fs-2"></i>
                    <div className="stats-number">{stats.healthRecords}</div>
                    <div className="stats-label">Health Records</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="row">
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Upcoming Appointments</h5>
                      <Link to="/book-appointment" className="btn btn-sm btn-primary">
                        <i className="fas fa-plus me-1"></i>
                        Book New
                      </Link>
                    </div>
                    <div className="card-body">
                      {upcomingAppointments.length > 0 ? (
                        <div className="row">
                          {upcomingAppointments.map(appointment => (
                            <div key={appointment.id} className="col-md-6 mb-3">
                              <div className="card border">
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="card-title mb-0">{appointment.doctorName}</h6>
                                    <span className={`badge ${
                                      appointment.status === 'Confirmed' ? 'bg-success' : 'bg-warning'
                                    }`}>
                                      {appointment.status}
                                    </span>
                                  </div>
                                  <p className="text-muted mb-2">{appointment.specialty}</p>
                                  <div className="mb-2">
                                    <i className="fas fa-calendar me-2 text-primary"></i>
                                    {new Date(appointment.date).toLocaleDateString()}
                                  </div>
                                  <div className="mb-3">
                                    <i className="fas fa-clock me-2 text-primary"></i>
                                    {appointment.time}
                                  </div>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-primary">
                                      <i className="fas fa-eye me-1"></i>
                                      Details
                                    </button>
                                    {appointment.status === 'Pending' && (
                                      <button className="btn btn-sm btn-outline-danger">
                                        <i className="fas fa-times me-1"></i>
                                        Cancel
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <i className="fas fa-calendar-times fs-1 text-muted mb-3"></i>
                          <h5 className="text-muted">No Upcoming Appointments</h5>
                          <p className="text-muted">Book your first appointment to get started</p>
                          <Link to="/book-appointment" className="btn btn-primary">
                            Book Appointment
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Quick Actions</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-grid gap-2">
                        <Link to="/book-appointment" className="btn btn-outline-primary">
                          <i className="fas fa-calendar-plus me-2"></i>
                          Book Appointment
                        </Link>
                        <button 
                          className="btn btn-outline-success"
                          onClick={() => setActiveTab('records')}
                        >
                          <i className="fas fa-file-medical me-2"></i>
                          View Health Records
                        </button>
                        <button 
                          className="btn btn-outline-info"
                          onClick={() => setActiveTab('prescriptions')}
                        >
                          <i className="fas fa-pills me-2"></i>
                          My Prescriptions
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3">
                    <div className="card-header">
                      <h5 className="mb-0">Health Summary</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Last Checkup:</span>
                          <span className="text-muted">Jan 15, 2024</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Next Appointment:</span>
                          <span className="text-primary">Jan 25, 2024</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Blood Group:</span>
                          <span className="text-muted">O+</span>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setActiveTab('profile')}
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Recent Appointments</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Doctor</th>
                          <th>Specialty</th>
                          <th>Date & Time</th>
                          <th>Status</th>
                          <th>Rating</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAppointments.map(appointment => (
                          <tr key={appointment.id}>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.specialty}</td>
                            <td>
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </td>
                            <td>
                              <span className="badge bg-success">{appointment.status}</span>
                            </td>
                            <td>
                              {appointment.rating ? (
                                <div className="text-warning">
                                  {[...Array(appointment.rating)].map((_, i) => (
                                    <i key={i} className="fas fa-star"></i>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted">Not rated</span>
                              )}
                            </td>
                            <td>
                              {appointment.canReview && (
                                <button className="btn btn-sm btn-outline-primary me-2">
                                  <i className="fas fa-star me-1"></i>
                                  Rate
                                </button>
                              )}
                              <button className="btn btn-sm btn-outline-info">
                                <i className="fas fa-eye me-1"></i>
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Health Records Tab */}
          {activeTab === 'records' && (
            <div className="fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Health Records</h3>
                <button className="btn btn-primary">
                  <i className="fas fa-upload me-2"></i>
                  Upload Record
                </button>
              </div>

              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Date</th>
                          <th>Doctor</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {healthRecords.map(record => (
                          <tr key={record.id}>
                            <td>
                              <i className="fas fa-file-medical me-2 text-primary"></i>
                              {record.type}
                            </td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.doctor}</td>
                            <td>
                              <span className={`badge ${
                                record.status === 'Normal' ? 'bg-success' : 'bg-warning'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2">
                                <i className="fas fa-eye me-1"></i>
                                View
                              </button>
                              <button className="btn btn-sm btn-outline-success">
                                <i className="fas fa-download me-1"></i>
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'overview' && activeTab !== 'records' && (
            <div className="fade-in">
              <div className="text-center py-5">
                <i className="fas fa-tools fs-1 text-muted mb-3"></i>
                <h4 className="text-muted">Coming Soon</h4>
                <p className="text-muted">This section is under development.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;