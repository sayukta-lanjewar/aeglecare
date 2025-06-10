import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [stats] = useState({
    todayAppointments: 8,
    totalPatients: 145,
    upcomingAppointments: 12,
    completedAppointments: 420,
    rating: 4.8,
    reviews: 67
  });

  const [todaySchedule] = useState([
    {
      id: 1,
      time: '09:00 AM',
      patientName: 'Sarah Johnson',
      type: 'Consultation',
      status: 'Confirmed'
    },
    {
      id: 2,
      time: '10:30 AM',
      patientName: 'Michael Davis',
      type: 'Follow-up',
      status: 'Confirmed'
    },
    {
      id: 3,
      time: '02:00 PM',
      patientName: 'Emma Wilson',
      type: 'Consultation',
      status: 'Pending'
    }
  ]);

  const [availability, setAvailability] = useState({
    monday: { start: '09:00', end: '17:00', available: true },
    tuesday: { start: '09:00', end: '17:00', available: true },
    wednesday: { start: '09:00', end: '17:00', available: true },
    thursday: { start: '09:00', end: '17:00', available: true },
    friday: { start: '09:00', end: '17:00', available: true },
    saturday: { start: '09:00', end: '13:00', available: true },
    sunday: { start: '', end: '', available: false }
  });

  const sidebarItems = [
    { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Appointments' },
    { id: 'patients', icon: 'fas fa-users', label: 'My Patients' },
    { id: 'availability', icon: 'fas fa-clock', label: 'Availability' },
    { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
    { id: 'reviews', icon: 'fas fa-star', label: 'Reviews & Ratings' }
  ];

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

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
                <i className="fas fa-user-md text-primary fs-4"></i>
              </div>
              <h6 className="text-white mt-2 mb-1">{user.name}</h6>
              <small className="text-white-50">{user.specialty || 'Doctor'}</small>
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
            <h2>Doctor Dashboard</h2>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">
                <i className="fas fa-calendar me-2"></i>
                {new Date().toLocaleDateString()}
              </span>
              <button className="btn btn-outline-primary">
                <i className="fas fa-bell me-2"></i>
                Notifications
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="fade-in">
              {/* Stats Cards */}
              <div className="row mb-4">
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-calendar-day text-primary mb-3 fs-2"></i>
                    <div className="stats-number">{stats.todayAppointments}</div>
                    <div className="stats-label">Today's Appointments</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-users text-success mb-3 fs-2"></i>
                    <div className="stats-number">{stats.totalPatients}</div>
                    <div className="stats-label">Total Patients</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-clock text-warning mb-3 fs-2"></i>
                    <div className="stats-number">{stats.upcomingAppointments}</div>
                    <div className="stats-label">Upcoming</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-check-circle text-info mb-3 fs-2"></i>
                    <div className="stats-number">{stats.completedAppointments}</div>
                    <div className="stats-label">Completed</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-star text-warning mb-3 fs-2"></i>
                    <div className="stats-number">{stats.rating}</div>
                    <div className="stats-label">Rating</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-comments text-primary mb-3 fs-2"></i>
                    <div className="stats-number">{stats.reviews}</div>
                    <div className="stats-label">Reviews</div>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="row">
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Today's Schedule</h5>
                      <span className="badge bg-primary">{todaySchedule.length} Appointments</span>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>Patient</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {todaySchedule.map(appointment => (
                              <tr key={appointment.id}>
                                <td className="fw-bold">{appointment.time}</td>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.type}</td>
                                <td>
                                  <span className={`badge ${
                                    appointment.status === 'Confirmed' ? 'bg-success' : 'bg-warning'
                                  }`}>
                                    {appointment.status}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-success">
                                    <i className="fas fa-check"></i>
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

                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Quick Actions</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => setActiveTab('appointments')}
                        >
                          <i className="fas fa-calendar-plus me-2"></i>
                          View All Appointments
                        </button>
                        <button 
                          className="btn btn-outline-success"
                          onClick={() => setActiveTab('availability')}
                        >
                          <i className="fas fa-clock me-2"></i>
                          Update Availability
                        </button>
                        <button 
                          className="btn btn-outline-info"
                          onClick={() => setActiveTab('patients')}
                        >
                          <i className="fas fa-users me-2"></i>
                          View Patients
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3">
                    <div className="card-header">
                      <h5 className="mb-0">Patient Reviews</h5>
                    </div>
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <div className="text-warning fs-1">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < Math.floor(stats.rating) ? '' : 'text-muted'}`}></i>
                          ))}
                        </div>
                        <h4 className="text-primary">{stats.rating}/5.0</h4>
                        <p className="text-muted mb-0">Based on {stats.reviews} reviews</p>
                      </div>
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setActiveTab('reviews')}
                      >
                        View All Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Manage Availability</h3>
                <button className="btn btn-primary">
                  <i className="fas fa-save me-2"></i>
                  Save Changes
                </button>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {Object.entries(availability).map(([day, schedule]) => (
                      <div key={day} className="col-lg-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="mb-0 text-capitalize">{day}</h5>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={schedule.available}
                                  onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                                />
                              </div>
                            </div>
                            
                            {schedule.available && (
                              <div className="row">
                                <div className="col-6">
                                  <label className="form-label">Start Time</label>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={schedule.start}
                                    onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                                  />
                                </div>
                                <div className="col-6">
                                  <label className="form-label">End Time</label>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={schedule.end}
                                    onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'overview' && activeTab !== 'availability' && (
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

export default DoctorDashboard;