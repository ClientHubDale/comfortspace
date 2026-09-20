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
import AdminCMSModal from './components/modals/AdminCMSModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import TurnkeyPage from './pages/TurnkeyPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

import {
  INITIAL_DATA,
  getStoredProjects,
  saveStoredProjects,
  getStoredLeads,
  saveStoredLeads,
} from './data/initialData';

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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persistent Data State
  const [projects, setProjects] = useState(() => getStoredProjects());
  const [leads, setLeads] = useState(() => getStoredLeads());

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

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Project CRUD
  const handleSaveProject = (newOrUpdatedProj) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === newOrUpdatedProj.id);
      let updated;
      if (exists) {
        updated = prev.map((p) => (p.id === newOrUpdatedProj.id ? newOrUpdatedProj : p));
      } else {
        updated = [newOrUpdatedProj, ...prev];
      }
      saveStoredProjects(updated);
      return updated;
    });
  };

  const handleDeleteProject = (projId) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== projId);
      saveStoredProjects(updated);
      return updated;
    });
  };

  const handleRestoreDefaults = () => {
    setProjects(INITIAL_DATA.projects);
    saveStoredProjects(INITIAL_DATA.projects);
    setLeads(INITIAL_DATA.initialLeads);
    saveStoredLeads(INITIAL_DATA.initialLeads);
  };

  // Lead CRUD
  const handleSaveLead = (newLead) => {
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      saveStoredLeads(updated);
      return updated;
    });
  };

  const handleDeleteLead = (leadId) => {
    setLeads((prev) => {
      const updated = prev.filter((l) => l.id !== leadId);
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
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* Mobile Slide-out Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Sub-nav breadcrumb strip (hidden on Home) */}
      <SubNavStrip
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Active Tab View */}
      {activeTab === 'home' && (
        <HomePage
          onSelectTab={handleSelectTab}
          onOpenStoryModal={() => setIsStoryOpen(true)}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          projects={projects}
        />
      )}

      {activeTab === 'about' && (
        <AboutPage onSelectTab={handleSelectTab} />
      )}

      {activeTab === 'services' && (
        <ServicesPage onSelectTab={handleSelectTab} />
      )}

      {activeTab === 'turnkey' && (
        <TurnkeyPage onSelectTab={handleSelectTab} />
      )}

      {activeTab === 'projects' && (
        <ProjectsPage
          projects={projects}
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
      <Footer
        onSelectTab={handleSelectTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

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

      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        onRestoreDefaults={handleRestoreDefaults}
        leads={leads}
        onDeleteLead={handleDeleteLead}
        onShowToast={(msg) => setToastMessage(msg)}
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
