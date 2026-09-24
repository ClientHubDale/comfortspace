import React, { useState, useEffect } from 'react';

const ADMIN_PIN = 'admin123';

const AdminCMSModal = ({
  isOpen,
  onClose,
  projects,
  onSaveProject,
  onDeleteProject,
  onRestoreDefaults,
  leads,
  onDeleteLead,
  onShowToast,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formCategory, setFormCategory] = useState('hospitality-retail');
  const [formStatus, setFormStatus] = useState('Handed Over');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('');
  const [formType, setFormType] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Keep session during runtime unless closed
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
      onShowToast('✓ Admin Authentication Successful. Welcome to Comfort Space CMS.');
    } else {
      setPinError('Invalid Admin PIN. (Default is admin123)');
    }
  };

  const handleStartEdit = (proj) => {
    setEditingId(proj.id);
    setFormTitle(proj.title);
    setFormClient(proj.client);
    setFormCategory(proj.category);
    setFormStatus(proj.status);
    setFormCity(proj.city);
    setFormState(proj.state);
    setFormType(proj.type || '');
    setFormImage(proj.image || '');
    setFormDesc(proj.description || '');
    setFormFeatured(!!proj.featured);
    setActiveTab('projects');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormClient('');
    setFormCategory('hospitality-retail');
    setFormStatus('Handed Over');
    setFormCity('');
    setFormState('');
    setFormType('');
    setFormImage('');
    setFormDesc('');
    setFormFeatured(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formTitle || !formClient || !formCity || !formState) {
      alert('Please fill in required fields');
      return;
    }

    const newProject = {
      id: editingId || `proj-${Date.now()}`,
      title: formTitle,
      client: formClient,
      category: formCategory,
      categoryLabel: formCategory === 'hospitality-retail' ? 'Hospitality, F&B & Retail' : 'Corporate, Banking & Infrastructure',
      status: formStatus,
      city: formCity,
      state: formState,
      type: formType || 'Commercial Turnkey',
      image: formImage || 'assets/images/mcdonalds-hyd-exterior.jpg',
      gallery: [formImage || 'assets/images/mcdonalds-hyd-exterior.jpg'],
      description: formDesc || 'Commercial fit-out delivered with precision.',
      scope: ['Turnkey Fit-out', 'Civil Works', 'MEP Clearance'],
      featured: formFeatured,
      year: new Date().getFullYear().toString(),
    };

    onSaveProject(newProject);
    onShowToast(editingId ? '✓ Project updated successfully!' : '✓ New project added to showcase!');
    handleResetForm();
  };

  // Metrics
  const totalProjects = projects.length;
  const handedOverCount = projects.filter((p) => p.status?.toLowerCase().includes('handed')).length;
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  return (
    <div className="admin-modal-overlay active" id="adminPortalModal" data-lenis-prevent onClick={onClose}>
      <div className="admin-window" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <div className="admin-brand">
            <img src="/assets/images/logo.png" alt="Comfort Space Logo" />
            <h3>Comfort Space CMS <span>Admin Portal</span></h3>
          </div>

          {isAuthenticated && (
            <div className="admin-nav">
              <button
                className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Overview
              </button>
              <button
                className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Manage Projects
              </button>
              <button
                className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
                onClick={() => setActiveTab('leads')}
              >
                Leads Inbox ({leads.length})
              </button>
            </div>
          )}

          <div>
            <button className="btn btn-outline-dark btn-sm" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i> Close CMS
            </button>
          </div>
        </div>

        <div className="admin-body">
          {!isAuthenticated ? (
            <div style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center', background: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '60px', height: '60px', background: '#FEF3C7', color: '#D97706', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>Admin Access Verification</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>Enter Admin PIN to manage projects and incoming consultation leads.</p>
              
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter PIN (Default: admin123)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1.1rem', letterSpacing: '2px' }}
                  autoFocus
                />
                {pinError && <p style={{ color: '#DC2626', fontSize: '0.8rem', marginBottom: '1rem' }}>{pinError}</p>}
                <button type="submit" className="btn btn-brand" style={{ width: '100%', justifyContent: 'center' }}>
                  Authenticate &amp; Open
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Tab 1: Dashboard Overview */}
              {activeTab === 'dashboard' && (
                <div id="adminView-dashboard" className="admin-view-panel">
                  <div className="admin-stat-grid">
                    <div className="admin-stat-card">
                      <label>Total Projects in DB</label>
                      <h3>{totalProjects}</h3>
                    </div>
                    <div className="admin-stat-card">
                      <label>Handed Over</label>
                      <h3>{handedOverCount}</h3>
                    </div>
                    <div className="admin-stat-card">
                      <label>Total Inquiries</label>
                      <h3>{totalLeads}</h3>
                    </div>
                    <div className="admin-stat-card">
                      <label>New Uncontacted Leads</label>
                      <h3 style={{ color: 'var(--brand-orange)' }}>{newLeadsCount}</h3>
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>CMS Quick Operations</h4>
                    <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                      Changes made in this CMS update instantly across the public Home, Services, and Project Gallery views without requiring a page reload.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button className="btn btn-brand btn-sm" onClick={() => { handleResetForm(); setActiveTab('projects'); }}>
                        <i className="fa-solid fa-plus"></i> Add New Project
                      </button>
                      <button className="btn btn-outline-dark btn-sm" onClick={() => setActiveTab('leads')}>
                        <i className="fa-solid fa-inbox"></i> View Incoming Leads
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        style={{ color: '#DC2626' }}
                        onClick={() => {
                          if (window.confirm('Reset all projects and leads to default seed data?')) {
                            onRestoreDefaults();
                            onShowToast('✓ Seed data successfully restored.');
                          }
                        }}
                      >
                        <i className="fa-solid fa-rotate-left"></i> Restore Seed Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Manage Projects (CRUD) */}
              {activeTab === 'projects' && (
                <div id="adminView-projects" className="admin-view-panel">
                  <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem' }}>
                    
                    {/* Table of Projects */}
                    <div>
                      <h4 style={{ marginBottom: '1rem', color: 'var(--text-heading)' }}>Live Project Database</h4>
                      <div className="table-responsive">
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Title / Client</th>
                              <th>Category</th>
                              <th>Location</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map((p) => (
                              <tr key={p.id}>
                                <td>
                                  <img
                                    src={`/${(p.image || '').replace(/^\/+/, '')}`}
                                    alt={p.title}
                                    style={{ width: '45px', height: '35px', objectFit: 'cover', borderRadius: '4px' }}
                                  />
                                </td>
                                <td>
                                  <strong style={{ fontSize: '0.85rem' }}>{p.title}</strong>
                                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.client}</div>
                                </td>
                                <td><span style={{ fontSize: '0.8rem' }}>{p.category}</span></td>
                                <td><span style={{ fontSize: '0.8rem' }}>{p.city}, {p.state}</span></td>
                                <td>
                                  <span className={`status-badge ${p.status?.toLowerCase().includes('handed') ? 'completed' : 'ongoing'}`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                      className="btn-action edit"
                                      onClick={() => handleStartEdit(p)}
                                      title="Edit Project"
                                      style={{ background: 'none', border: 'none', color: '#6366F1', cursor: 'pointer' }}
                                    >
                                      <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                      className="btn-action delete"
                                      onClick={() => {
                                        if (window.confirm(`Delete project "${p.title}"?`)) {
                                          onDeleteProject(p.id);
                                          onShowToast('✓ Project deleted.');
                                        }
                                      }}
                                      title="Delete Project"
                                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                                    >
                                      <i className="fa-solid fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Add / Edit Project Form */}
                    <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-heading)' }}>
                        {editingId ? 'Edit Project' : 'Add New Project'}
                      </h4>
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                          <label>Project Title *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. McDonald's Drive-Thru Poicha"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Client Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Hardcastle Restaurants Pvt. Ltd."
                            value={formClient}
                            onChange={(e) => setFormClient(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Category *</label>
                            <select
                              className="form-control"
                              value={formCategory}
                              onChange={(e) => setFormCategory(e.target.value)}
                            >
                              <option value="hospitality-retail">Hospitality, F&B & Retail</option>
                              <option value="corporate-banking">Corporate, Banking & Infrastructure</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Status *</label>
                            <select
                              className="form-control"
                              value={formStatus}
                              onChange={(e) => setFormStatus(e.target.value)}
                            >
                              <option value="Handed Over">Handed Over</option>
                              <option value="Ongoing">Ongoing</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>City *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Bangalore"
                              value={formCity}
                              onChange={(e) => setFormCity(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>State *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Karnataka"
                              value={formState}
                              onChange={(e) => setFormState(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Project Typology</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Highway Drive-Thru / High Street / Corporate"
                            value={formType}
                            onChange={(e) => setFormType(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>Cover Image Path</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="assets/images/mcdonalds-hyd-exterior.jpg"
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>Project Description</label>
                          <textarea
                            className="form-control"
                            placeholder="Scope summary..."
                            value={formDesc}
                            onChange={(e) => setFormDesc(e.target.value)}
                            style={{ minHeight: '80px' }}
                          ></textarea>
                        </div>

                        <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            id="adminProjFeatured"
                            checked={formFeatured}
                            onChange={(e) => setFormFeatured(e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                          />
                          <label htmlFor="adminProjFeatured" style={{ marginBottom: 0 }}>
                            Show on Home Page Showcase
                          </label>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                          <button type="submit" className="btn btn-brand" style={{ flex: 1 }}>
                            {editingId ? 'Update Project' : 'Save Project'}
                          </button>
                          {editingId && (
                            <button type="button" className="btn btn-outline-dark" onClick={handleResetForm}>
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab 3: Leads Inbox */}
              {activeTab === 'leads' && (
                <div id="adminView-leads" className="admin-view-panel">
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-heading)' }}>
                    Real-Time Contact Form Leads ({leads.length})
                  </h4>
                  <div className="table-responsive">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Contact Info</th>
                          <th>Company</th>
                          <th>Service</th>
                          <th>Budget</th>
                          <th>Location / Message</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: 'center', color: '#64748B', padding: '2rem' }}>
                              No leads received yet. Test by submitting the contact consultation form.
                            </td>
                          </tr>
                        ) : (
                          leads.map((l) => (
                            <tr key={l.id}>
                              <td>
                                <strong style={{ fontSize: '0.85rem' }}>{l.name}</strong>
                                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{l.phone}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--brand-orange)' }}>{l.email}</div>
                              </td>
                              <td><span style={{ fontSize: '0.85rem' }}>{l.company || '—'}</span></td>
                              <td><span style={{ fontSize: '0.85rem' }}>{l.service}</span></td>
                              <td><span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{l.budget}</span></td>
                              <td>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{l.location || '—'}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748B', maxWidth: '240px' }}>{l.message || '—'}</div>
                              </td>
                              <td>
                                <span className={`status-badge ${l.status === 'New' ? 'ongoing' : 'completed'}`}>
                                  {l.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn-action delete"
                                  onClick={() => {
                                    if (window.confirm(`Delete lead from ${l.name}?`)) {
                                      onDeleteLead(l.id);
                                      onShowToast('✓ Lead removed.');
                                    }
                                  }}
                                  title="Delete Lead"
                                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCMSModal;
