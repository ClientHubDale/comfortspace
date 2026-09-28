import React, { useState, useEffect } from 'react';
import TopBar from './components/common/TopBar';
import Navbar from './components/common/Navbar';
import MobileDrawer from './components/common/MobileDrawer';
import SubNavStrip from './components/common/SubNavStrip';
import Footer from './components/common/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import Toast from './components/common/Toast';

import ProjectDetailModal from './components/modals/ProjectDetailModal';
import StoryModal from './components/modals/StoryModal';
import { initSmoothScroll, setScrollLocked, smoothScrollTo } from './utils/smoothScroll';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import TurnkeyPage from './pages/TurnkeyPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

import { INITIAL_DATA, getStoredLeads, saveStoredLeads } from './data/initialData';
import { fetchServices, fetchProjects } from './services/api';

function App() {
  // Navigation Routing State
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'about', 'services', 'turnkey', 'projects', 'contact'];
    return validTabs.includes(hash) ? hash : 'home';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals & Popups State
  const [selectedProject, setSelectedProject] = useState(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Services & Projects come from comfortspace-backend (managed in comfortspace-admin).
  // The built-in data paints instantly and stays in place if the API is unreachable.
  const [services, setServices] = useState(INITIAL_DATA.services);
  const [projects, setProjects] = useState(INITIAL_DATA.projects);

  useEffect(() => {
    const ctrl = new AbortController();
    const load = (fetcher, setter, label) =>
      fetcher({ signal: ctrl.signal })
        .then((items) => setter(items))
        .catch((err) => {
          if (err.name !== 'AbortError') console.warn(`[api] ${label} unavailable, showing built-in content:`, err.message);
        });
    load(fetchServices, setServices, 'services');
    load(fetchProjects, setProjects, 'projects');
    return () => ctrl.abort();
  }, []);

  // Contact-form enquiries are still kept in this browser (moving them to the backend is a later step)
  const [, setLeads] = useState(() => getStoredLeads());

  // Inertia scrolling for the whole site
  useEffect(() => {
    initSmoothScroll();
  }, []);

  // The page behind an open modal must not scroll
  const anyModalOpen = Boolean(selectedProject) || isStoryOpen;
  useEffect(() => {
    setScrollLocked(anyModalOpen);
  }, [anyModalOpen]);

  // URL Hash Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'about', 'services', 'turnkey', 'projects', 'contact'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // A dropdown item can point at one section of a page, e.g. ('about', 'about-journey')
  const [scrollTarget, setScrollTarget] = useState(null);

  // Project Gallery category, so a dropdown item can open the gallery pre-filtered
  const [projectCategory, setProjectCategory] = useState('all');

  const handleSelectTab = (tab, sectionId, filter) => {
    const samePage = tab === activeTab;
    // A new page always starts from its top — jump there at once rather than
    // gliding up through the new page's content
    if (!samePage) smoothScrollTo(0, { immediate: true });

    setActiveTab(tab);
    window.location.hash = tab;
    if (tab === 'projects') setProjectCategory(filter || 'all');

    if (sectionId) {
      setScrollTarget({ id: sectionId, at: Date.now() });
    } else {
      // clear any earlier target so it is not replayed on this page
      setScrollTarget(null);
      if (samePage) smoothScrollTo(0);
    }
  };

  // Runs after the target page has rendered, so the section exists to scroll to.
  // Keyed on the target alone: a plain page change must never replay it.
  useEffect(() => {
    if (!scrollTarget) return;
    const frame = requestAnimationFrame(() => {
      smoothScrollTo(document.getElementById(scrollTarget.id) || 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollTarget]);

  // Lead capture
  const handleSaveLead = (newLead) => {
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      saveStoredLeads(updated);
      return updated;
    });
  };


  return (
    <div className="site-wrapper">
      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Glass Header */}
      <Navbar
        services={services}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* Mobile Slide-out Drawer */}
      <MobileDrawer
        services={services}
        isOpen={isMobileMenuOpen}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Sub-nav breadcrumb strip (hidden on Home) */}
      <SubNavStrip activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Active Tab View */}
      {activeTab === 'home' && (
        <HomePage
          services={services}
          onSelectTab={handleSelectTab}
          onOpenStoryModal={() => setIsStoryOpen(true)}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          projects={projects}
        />
      )}

      {activeTab === 'about' && (
        <AboutPage
          onSelectTab={handleSelectTab}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          onOpenStoryModal={() => setIsStoryOpen(true)}
          projects={projects}
        />
      )}

      {activeTab === 'services' && (
        <ServicesPage services={services} onSelectTab={handleSelectTab} />
      )}

      {activeTab === 'turnkey' && (
        <TurnkeyPage onSelectTab={handleSelectTab} />
      )}

      {activeTab === 'projects' && (
        <ProjectsPage
          projects={projects}
          onSelectTab={handleSelectTab}
          selectedCategory={projectCategory}
          onSelectCategory={setProjectCategory}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
        />
      )}

      {activeTab === 'contact' && (
        <ContactPage
          onSaveLead={handleSaveLead}
          onShowToast={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Main Corporate Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Floating WhatsApp Action Pill */}
      <FloatingWhatsApp activeTab={activeTab} />

      {/* Modals & Portals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        onExploreProjects={() => handleSelectTab('projects')}
      />


      {/* Toast Notification Alert */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}

export default App;
