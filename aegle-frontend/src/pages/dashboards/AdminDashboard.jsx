import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalPatients: 1250,
    totalDoctors: 45,
    pendingApproval: 8,
    totalAppointments: 3420,
    monthlyRevenue: 125000,
    todayAppointments: 32
  });

  const [pendingDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Michael Johnson',
      email: 'michael.johnson@email.com',
      specialty: 'Cardiology',
      experience: 10,
      phone: '+1-555-0123',
      submittedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Dr. Sarah Williams',
      email: 'sarah.williams@email.com',
      specialty: 'Neurology',
      experience: 8,
      phone: '+1-555-0124',
      submittedAt: '2024-01-14'
    }
  ]);

  const [recentAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Johnson',
      date: '2024-01-20',
      time: '11:30 AM',
      status: 'Pending'
    }
  ]);

  const handleDoctorApproval = (doctorId, action) => {
    console.log(`${action} doctor with ID: ${doctorId}`);
    // Add API call here
  };

  const sidebarItems = [
    { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview' },
    { id: 'doctors', icon: 'fas fa-user-md', label: 'Doctor Approval' },
    { id: 'patients', icon: 'fas fa-users', label: 'Patients' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Appointments' },
    { id: 'payments', icon: 'fas fa-credit-card', label: 'Payments' },
    { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
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
                <i className="fas fa-user-shield text-primary fs-4"></i>
              </div>
              <h6 className="text-white mt-2 mb-1">{user.name}</h6>
              <small className="text-white-50">Administrator</small>
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
            <h2>Admin Dashboard</h2>
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
                    <i className="fas fa-users text-primary mb-3 fs-2"></i>
                    <div className="stats-number">{stats.totalPatients}</div>
                    <div className="stats-label">Total Patients</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-user-md text-success mb-3 fs-2"></i>
                    <div className="stats-number">{stats.totalDoctors}</div>
                    <div className="stats-label">Total Doctors</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-clock text-warning mb-3 fs-2"></i>
                    <div className="stats-number">{stats.pendingApproval}</div>
                    <div className="stats-label">Pending Approval</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-calendar-check text-info mb-3 fs-2"></i>
                    <div className="stats-number">{stats.totalAppointments}</div>
                    <div className="stats-label">Total Appointments</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-dollar-sign text-success mb-3 fs-2"></i>
                    <div className="stats-number">${stats.monthlyRevenue.toLocaleString()}</div>
                    <div className="stats-label">Monthly Revenue</div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-calendar-day text-primary mb-3 fs-2"></i>
                    <div className="stats-number">{stats.todayAppointments}</div>
                    <div className="stats-label">Today's Appointments</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="row">
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Recent Appointments</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead>
                            <tr>
                              <th>Patient</th>
                              <th>Doctor</th>
                              <th>Date & Time</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentAppointments.map(appointment => (
                              <tr key={appointment.id}>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.date} at {appointment.time}</td>
                                <td>
                                  <span className={`badge ${
                                    appointment.status === 'Confirmed' ? 'bg-success' : 'bg-warning'
                                  }`}>
                                    {appointment.status}
                                  </span>
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
                          onClick={() => setActiveTab('doctors')}
                        >
                          <i className="fas fa-user-check me-2"></i>
                          Review Doctor Applications
                        </button>
                        <button 
                          className="btn btn-outline-success"
                          onClick={() => setActiveTab('analytics')}
                        >
                          <i className="fas fa-chart-line me-2"></i>
                          View Analytics
                        </button>
                        <button 
                          className="btn btn-outline-info"
                          onClick={() => setActiveTab('appointments')}
                        >
                          <i className="fas fa-calendar-plus me-2"></i>
                          Manage Appointments
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Doctor Approval Tab */}
          {activeTab === 'doctors' && (
            <div className="fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Doctor Approval Requests</h3>
                <span className="badge bg-warning fs-6">{pendingDoctors.length} Pending</span>
              </div>

              <div className="row">
                {pendingDoctors.map(doctor => (
                  <div key={doctor.id} className="col-lg-6 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title">{doctor.name}</h5>
                          <span className="badge bg-warning">Pending</span>
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-6">
                            <small className="text-muted">Email:</small>
                            <div>{doctor.email}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Phone:</small>
                            <div>{doctor.phone}</div>
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-6">
                            <small className="text-muted">Specialty:</small>
                            <div>{doctor.specialty}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Experience:</small>
                            <div>{doctor.experience} years</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <small className="text-muted">Submitted:</small>
                          <div>{new Date(doctor.submittedAt).toLocaleDateString()}</div>
                        </div>
                        
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleDoctorApproval(doctor.id, 'approve')}
                          >
                            <i className="fas fa-check me-1"></i>
                            Approve
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDoctorApproval(doctor.id, 'reject')}
                          >
                            <i className="fas fa-times me-1"></i>
                            Reject
                          </button>
                          <button className="btn btn-outline-primary btn-sm">
                            <i className="fas fa-eye me-1"></i>
                            View Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab !== 'overview' && activeTab !== 'doctors' && (
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

export default AdminDashboard;