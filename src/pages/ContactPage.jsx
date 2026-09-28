import React, { useState } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';

/* --------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */
const SERVICES = [
  { value: 'Turnkey Base Projects', label: 'Turnkey Design & Build', icon: 'fa-key' },
  { value: 'Civil Construction', label: 'Civil Construction', icon: 'fa-building-columns' },
  { value: 'Project Management (PMC)', label: 'Project Management', icon: 'fa-clipboard-check' },
  { value: 'Fire & Life Safety', label: 'Fire & Life Safety', icon: 'fa-shield-halved' },
  { value: 'Modular Furniture Supply', label: 'Modular Furniture', icon: 'fa-couch' },
  { value: 'Post-Handover Support / AMC', label: 'Support & AMC', icon: 'fa-screwdriver-wrench' },
];

const BUDGETS = [
  { value: '₹15L - ₹30L', label: '₹15 – 30 L' },
  { value: '₹30L - ₹75L', label: '₹30 – 75 L' },
  { value: '₹75L - ₹1.5 Cr', label: '₹75 L – 1.5 Cr' },
  { value: '₹1.5 Cr+', label: '₹1.5 Cr +' },
];

const FORM_STEPS = ['Project', 'Site', 'You'];

const NEXT_STEPS = [
  { icon: 'fa-inbox', title: 'Enquiry received', text: 'Your brief reaches our estimation desk and a project lead is assigned.' },
  { icon: 'fa-ruler-combined', title: 'Site inspection', text: 'We audit measurements, existing MEP and your drawings before anything is priced.' },
  { icon: 'fa-file-invoice', title: 'Design & BOQ proposal', text: 'Layouts, scope and an itemised BOQ with a committed schedule.' },
  { icon: 'fa-helmet-safety', title: 'Project kick-off', text: 'Resident engineer on site, with progress reviews through to handover.' },
];

const FAQS = [
  {
    q: 'What should I include in my enquiry?',
    a: 'The site location, approximate carpet area, the kind of space (QSR, office, bank branch, restaurant) and your target opening date. Drawings help, but are not required to start.',
  },
  {
    q: 'Do you visit the site before quoting?',
    a: 'Yes. Every turnkey project begins with a site inspection and drawing review, so the BOQ reflects real measurements and existing services on site.',
  },
  {
    q: 'Can you build from my architect’s drawings?',
    a: 'Yes — we can execute an existing design to specification, deliver it design-and-build, or act as your project management consultant.',
  },
  {
    q: 'Do you take projects outside Bangalore?',
    a: 'Yes. Our mobile engineering squads deliver across Karnataka, Telangana, Andhra Pradesh, Maharashtra, Gujarat, Tamil Nadu, Goa and Chhattisgarh.',
  },
];

const STATES = ['Karnataka', 'Telangana', 'Andhra Pradesh', 'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Goa', 'Chhattisgarh'];

/* 'YYYY-MM-DD HH:MM' in the visitor's own time zone (toISOString would give UTC,
   which shows Indian enquiries 5.5 hours early in the Admin CMS) */
const localStamp = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

const EMPTY = {
  service: 'Turnkey Base Projects',
  budget: '₹30L - ₹75L',
  location: '',
  message: '',
  name: '',
  company: '',
  phone: '',
  email: '',
};

/* --------------------------------------------------------------------------
   Contact
   -------------------------------------------------------------------------- */
const ContactPage = ({ onSaveLead, onShowToast }) => {
  const company = INITIAL_DATA.company;
  const whatsapp = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`;
  // the full postal address ('#48, 2nd Floor…') makes Google pick the wrong place;
  // locality + PIN centres on BTM 2nd Stage (swap in exact coordinates when available)
  const mapQuery = encodeURIComponent('BTM Layout 2nd Stage, Bengaluru, Karnataka 560076');

  const [form, setForm] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  useScrollReveal([sent]);

  const set = (key) => (e) => {
    const value = e && e.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  /* Only the last step has required fields */
  const validate = (s) => {
    const err = {};
    if (s === 2) {
      if (!form.name.trim()) err.name = 'Please tell us your name';
      if (form.phone.replace(/\D/g, '').length < 10) err.phone = 'Enter a valid phone number';
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = 'Enter a valid email address';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const go = (to) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < FORM_STEPS.length - 1) {
      go(step + 1);
      return;
    }
    if (!validate(step)) return;

    const lead = {
      id: `lead-${Date.now()}`,
      name: form.name.trim(),
      company: form.company.trim() || 'Individual Client',
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service,
      budget: form.budget,
      location: form.location.trim() || 'Bangalore',
      message: form.message.trim(),
      date: localStamp(),
      status: 'New',
    };

    onSaveLead(lead);
    onShowToast(`✓ Thank you ${lead.name}! Your inquiry has been sent to our estimation desk.`);
    setSent(lead);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setDir(-1);
    setStep(0);
    setSent(null);
  };

  const serviceLabel = SERVICES.find((s) => s.value === form.service)?.label;

  return (
    <main id="tab-contact" className="tab-page active-page csx-page csx-contact">
      {/* ====================================================================
          1. HERO + MULTI-STEP ENQUIRY FORM
          ==================================================================== */}
      <section className="ctx-hero">
        <span className="ctx-hero-glow" aria-hidden="true"></span>
        <div className="container ctx-hero-grid">
          <div className="ctx-hero-copy">
            <span className="abx-eyebrow">
              <span className="abx-eyebrow-line" aria-hidden="true"></span>
              Let&apos;s Build Together
            </span>

            <h1 className="ctx-title">
              <span className="ctx-title-line">Let&apos;s build your</span>
              <span className="ctx-title-line">
                <em>next space.</em>
              </span>
            </h1>

            <p className="ctx-sub">
              Planning a restaurant, QSR outlet, bank branch or office? Share a few details and our
              senior project estimators will come back with a preliminary BOQ and timeline.
            </p>

            <div className="ctx-quick">
              <a className="ctx-quick-card" href={`tel:${company.phone.replace(/\s/g, '')}`}>
                <span className="ctx-quick-icon">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>
                  <small>Call us</small>
                  <strong>{company.phoneDisplay}</strong>
                </span>
                <i className="fa-solid fa-arrow-right ctx-quick-go"></i>
              </a>
              <a className="ctx-quick-card" href={`mailto:${company.email}`}>
                <span className="ctx-quick-icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <span>
                  <small>Enquiries &amp; BOQ submissions</small>
                  <strong>{company.email}</strong>
                </span>
                <i className="fa-solid fa-arrow-right ctx-quick-go"></i>
              </a>
              <a className="ctx-quick-card is-wa" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <span className="ctx-quick-icon">
                  <i className="fa-brands fa-whatsapp"></i>
                </span>
                <span>
                  <small>Instant chat</small>
                  <strong>WhatsApp our team</strong>
                </span>
                <i className="fa-solid fa-arrow-right ctx-quick-go"></i>
              </a>
            </div>

            <p className="ctx-hours">
              <i className="fa-regular fa-clock"></i> Mon – Sat, 9:30 AM to 6:30 PM IST
            </p>
          </div>

          {/* ---- the form ---- */}
          <div className="ctx-form-card">
            {sent ? (
              <div className="ctx-success">
                <svg className="ctx-check" viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27 l7 7 l15 -16" />
                </svg>
                <h2>Thank you, {sent.name.split(' ')[0]}!</h2>
                <p>Your enquiry has reached our estimation desk. Here&apos;s what we received:</p>
                <dl className="ctx-summary">
                  <div>
                    <dt>Service</dt>
                    <dd>{SERVICES.find((s) => s.value === sent.service)?.label}</dd>
                  </div>
                  <div>
                    <dt>Budget</dt>
                    <dd>{sent.budget}</dd>
                  </div>
                  <div>
                    <dt>Site</dt>
                    <dd>{sent.location}</dd>
                  </div>
                  <div>
                    <dt>Contact</dt>
                    <dd>{sent.phone}</dd>
                  </div>
                </dl>
                <div className="ctx-success-actions">
                  <a className="csx-btn csx-btn-brand" href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp"></i> Continue on WhatsApp
                  </a>
                  <button type="button" className="csx-btn csx-btn-outline" onClick={reset}>
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="ctx-form-head">
                  <div>
                    <span className="ctx-form-kicker">Project Inquiry &amp; Estimation</span>
                    <h2>
                      Step {step + 1} <em>of {FORM_STEPS.length}</em>
                    </h2>
                  </div>
                  <ol className="ctx-stepper" aria-label="Form progress">
                    {FORM_STEPS.map((label, i) => (
                      <li
                        key={label}
                        className={`${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}`}
                        aria-current={i === step ? 'step' : undefined}
                      >
                        <span>{i < step ? <i className="fa-solid fa-check"></i> : i + 1}</span>
                        {label}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="ctx-bar" aria-hidden="true">
                  <span style={{ width: `${((step + 1) / FORM_STEPS.length) * 100}%` }}></span>
                </div>

                <div className={`ctx-step ${dir > 0 ? 'from-right' : 'from-left'}`} key={step}>
                  {step === 0 && (
                    <>
                      <fieldset className="ctx-field">
                        <legend>What do you need?</legend>
                        <div className="ctx-tiles">
                          {SERVICES.map((s) => (
                            <label key={s.value} className={`ctx-tile ${form.service === s.value ? 'is-on' : ''}`}>
                              <input
                                type="radio"
                                name="service"
                                value={s.value}
                                checked={form.service === s.value}
                                onChange={set('service')}
                              />
                              <i className={`fa-solid ${s.icon}`}></i>
                              <span>{s.label}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset className="ctx-field">
                        <legend>Estimated budget</legend>
                        <div className="ctx-chips">
                          {BUDGETS.map((b) => (
                            <label key={b.value} className={`ctx-chip ${form.budget === b.value ? 'is-on' : ''}`}>
                              <input
                                type="radio"
                                name="budget"
                                value={b.value}
                                checked={form.budget === b.value}
                                onChange={set('budget')}
                              />
                              {b.label}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <div className="ctx-input">
                        <input
                          id="ctxLocation"
                          type="text"
                          placeholder=" "
                          value={form.location}
                          onChange={set('location')}
                          autoComplete="address-level2"
                        />
                        <label htmlFor="ctxLocation">Site location &amp; city</label>
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <div className="ctx-input is-area">
                        <textarea
                          id="ctxMessage"
                          placeholder=" "
                          rows={6}
                          value={form.message}
                          onChange={set('message')}
                        ></textarea>
                        <label htmlFor="ctxMessage">Scope &amp; timeline — carpet area, opening date, drawings…</label>
                      </div>
                      <p className="ctx-note">
                        <i className="fa-solid fa-circle-info"></i> Both are optional — you can share
                        details on the call.
                      </p>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="ctx-row">
                        <div className={`ctx-input ${errors.name ? 'has-error' : ''}`}>
                          <input
                            id="ctxName"
                            type="text"
                            placeholder=" "
                            value={form.name}
                            onChange={set('name')}
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'ctxNameErr' : undefined}
                          />
                          <label htmlFor="ctxName">Your name *</label>
                          {errors.name && <small id="ctxNameErr">{errors.name}</small>}
                        </div>
                        <div className="ctx-input">
                          <input
                            id="ctxCompany"
                            type="text"
                            placeholder=" "
                            value={form.company}
                            onChange={set('company')}
                            autoComplete="organization"
                          />
                          <label htmlFor="ctxCompany">Company / brand</label>
                        </div>
                      </div>
                      <div className="ctx-row">
                        <div className={`ctx-input ${errors.phone ? 'has-error' : ''}`}>
                          <input
                            id="ctxPhone"
                            type="tel"
                            placeholder=" "
                            value={form.phone}
                            onChange={set('phone')}
                            autoComplete="tel"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'ctxPhoneErr' : undefined}
                          />
                          <label htmlFor="ctxPhone">Phone number *</label>
                          {errors.phone && <small id="ctxPhoneErr">{errors.phone}</small>}
                        </div>
                        <div className={`ctx-input ${errors.email ? 'has-error' : ''}`}>
                          <input
                            id="ctxEmail"
                            type="email"
                            placeholder=" "
                            value={form.email}
                            onChange={set('email')}
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'ctxEmailErr' : undefined}
                          />
                          <label htmlFor="ctxEmail">Email address *</label>
                          {errors.email && <small id="ctxEmailErr">{errors.email}</small>}
                        </div>
                      </div>
                      <div className="ctx-recap">
                        <span>
                          <i className="fa-solid fa-key"></i> {serviceLabel}
                        </span>
                        <span>
                          <i className="fa-solid fa-indian-rupee-sign"></i> {form.budget}
                        </span>
                        {form.location && (
                          <span>
                            <i className="fa-solid fa-location-dot"></i> {form.location}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="ctx-actions">
                  {step > 0 ? (
                    <button type="button" className="ctx-back" onClick={() => go(step - 1)}>
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                  ) : (
                    <span></span>
                  )}
                  <button type="submit" className="csx-btn csx-btn-brand">
                    {step < FORM_STEPS.length - 1 ? (
                      <>
                        Continue <i className="fa-solid fa-arrow-right"></i>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i> Submit Enquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHAT HAPPENS NEXT
          ==================================================================== */}
      <section className="ctx-section">
        <div className="container">
          <div className="ctx-head" data-reveal>
            <span className="csx-tag">What Happens Next</span>
            <h2 className="csx-head-title csx-head-sm">
              From your message <span className="svx-serif">to a live site.</span>
            </h2>
          </div>

          <ol className="ctx-next" data-reveal>
            {NEXT_STEPS.map((n, i) => (
              <li key={n.title} style={{ '--i': i }}>
                <span className="ctx-next-icon">
                  <i className={`fa-solid ${n.icon}`}></i>
                </span>
                <span className="ctx-next-num">0{i + 1}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====================================================================
          3. VISIT US — map + office card
          ==================================================================== */}
      <section className="ctx-section ctx-tint">
        <div className="container">
          <div className="ctx-visit" data-reveal>
            <div className="ctx-map">
              <iframe
                title="Comfort Space headquarters on Google Maps"
                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="ctx-office">
              <span className="abx-tag-light">Corporate Headquarters</span>
              <h2>Visit our Bangalore office</h2>
              <p className="ctx-office-name">
                {company.name}
                <em>Formerly {company.formerName}</em>
              </p>
              <ul className="ctx-office-list">
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{company.address}</span>
                </li>
                <li>
                  <i className="fa-regular fa-clock"></i>
                  <span>Mon – Sat, 9:30 AM to 6:30 PM IST</span>
                </li>
              </ul>
              <a
                className="csx-btn csx-btn-white"
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-diamond-turn-right"></i> Get Directions
              </a>
              <div className="ctx-office-states">
                <small>We build across</small>
                <div>
                  {STATES.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. FAQ + WHATSAPP BAND
          ==================================================================== */}
      <section className="ctx-section">
        <div className="container abx-faq">
          <div className="abx-faq-intro" data-reveal>
            <span className="csx-tag">Before You Write</span>
            <h2 className="csx-head-title csx-head-sm">Questions we hear first</h2>
            <p>Still unsure? Our project team is a message away.</p>
            <a className="csx-btn csx-btn-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp"></i> Ask on WhatsApp
            </a>
          </div>

          <div className="abx-acc abx-faq-list" data-reveal>
            {FAQS.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div key={f.q} className={`abx-acc-item ${open ? 'open' : ''}`}>
                  <button className="abx-acc-head" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : idx)}>
                    <span className="abx-acc-title">{f.q}</span>
                    <i className="fa-solid fa-plus" aria-hidden="true"></i>
                  </button>
                  <div className="abx-acc-body">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
