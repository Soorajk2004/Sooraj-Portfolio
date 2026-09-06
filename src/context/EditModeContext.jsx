import { createContext, useContext, useState, useEffect } from 'react';
import defaultContent from '../data/content.json';

const STORAGE_KEY = 'portfolio-content';
const EDIT_PASSWORD = 'admin'; // Client-side gate password

const EditModeContext = createContext(null);

// Migration & Deep Merge helper
function mergeWithDefaults(saved, fallback) {
  if (!saved || typeof saved !== 'object') return fallback;

  // Migrate projects: single 'link' -> 'githubUrl'
  const migratedProjects = (saved.projects || fallback.projects).map((proj) => {
    const p = { ...proj };
    if (p.link && !p.githubUrl) {
      p.githubUrl = p.link;
      delete p.link;
    }
    if (!p.demoUrl) p.demoUrl = '';
    return p;
  });

  // Migrate CV: 'resumeUrl' -> 'contact.cv.fileUrl'
  const savedContact = saved.contact || fallback.contact;
  const migratedCV = {
    label: savedContact?.cv?.label || fallback.contact.cv.label || 'Curriculum Vitae',
    fileUrl: savedContact?.cv?.fileUrl || saved?.resumeUrl || savedContact?.resumeUrl || fallback.contact.cv.fileUrl || '',
    updatedAt: savedContact?.cv?.updatedAt || fallback.contact.cv.updatedAt || new Date().toISOString().split('T')[0],
  };

  return {
    hero: { ...fallback.hero, ...(saved.hero || {}) },
    about: {
      bio: saved.about?.bio !== undefined ? saved.about.bio : fallback.about.bio,
      stats: Array.isArray(saved.about?.stats) ? saved.about.stats : fallback.about.stats,
    },
    projects: migratedProjects,
    skills: {
      languages: Array.isArray(saved.skills?.languages) ? saved.skills.languages : fallback.skills.languages,
      frameworks: Array.isArray(saved.skills?.frameworks) ? saved.skills.frameworks : fallback.skills.frameworks,
      tools: Array.isArray(saved.skills?.tools) ? saved.skills.tools : fallback.skills.tools,
    },
    contact: {
      intro: savedContact?.intro !== undefined ? savedContact.intro : fallback.contact.intro,
      email: savedContact?.email !== undefined ? savedContact.email : fallback.contact.email,
      linkedin: savedContact?.linkedin !== undefined ? savedContact.linkedin : fallback.contact.linkedin,
      github: savedContact?.github !== undefined ? savedContact.github : fallback.contact.github,
      cv: migratedCV,
      personalLinks: Array.isArray(savedContact?.personalLinks)
        ? savedContact.personalLinks
        : fallback.contact.personalLinks,
    },
  };
}

export function EditModeProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return mergeWithDefaults(parsed, defaultContent);
      }
    } catch (e) {
      console.warn('Failed to load portfolio content from localStorage:', e);
    }
    return defaultContent;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // 'saved' | 'saving' | ''
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Toggle Edit Mode with password gate
  const requestToggleEditMode = () => {
    if (isEditMode) {
      // Exit Edit Mode directly
      setIsEditMode(false);
    } else {
      // Request password to enter
      setIsPasswordModalOpen(true);
    }
  };

  const authenticate = (password) => {
    if (password === EDIT_PASSWORD || password === 'sooraj' || password === 'portfolio') {
      setIsPasswordModalOpen(false);
      setIsEditMode(true);
      return true;
    }
    return false;
  };

  // Generic updater
  const updateContent = (updater) => {
    setContent((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setHasUnsavedChanges(true);
      return next;
    });
  };

  // Section-specific helpers
  const updateHero = (field, value) => {
    updateContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateAbout = (field, value) => {
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  };

  const addStat = (stat) => {
    updateContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: [...(prev.about.stats || []), stat],
      },
    }));
  };

  const removeStat = (index) => {
    updateContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.filter((_, i) => i !== index),
      },
    }));
  };

  const updateStat = (index, field, value) => {
    updateContent((prev) => {
      const stats = [...(prev.about.stats || [])];
      if (stats[index]) {
        stats[index] = { ...stats[index], [field]: value };
      }
      return {
        ...prev,
        about: { ...prev.about, stats },
      };
    });
  };

  // Projects helpers
  const addProject = (project) => {
    updateContent((prev) => ({
      ...prev,
      projects: [project, ...(prev.projects || [])],
    }));
  };

  const updateProject = (index, project) => {
    updateContent((prev) => {
      const projects = [...(prev.projects || [])];
      projects[index] = project;
      return { ...prev, projects };
    });
  };

  const deleteProject = (index) => {
    updateContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const reorderProjects = (fromIndex, toIndex) => {
    updateContent((prev) => {
      const list = [...(prev.projects || [])];
      if (toIndex < 0 || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, projects: list };
    });
  };

  // Skills helpers
  const addSkill = (category, skill) => {
    updateContent((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...(prev.skills[category] || []), skill],
      },
    }));
  };

  const removeSkill = (category, index) => {
    updateContent((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  const updateSkill = (category, index, field, value) => {
    updateContent((prev) => {
      const list = [...(prev.skills[category] || [])];
      if (list[index]) {
        list[index] = { ...list[index], [field]: value };
      }
      return {
        ...prev,
        skills: { ...prev.skills, [category]: list },
      };
    });
  };

  // Contact helpers
  const updateContact = (field, value) => {
    updateContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const updateCV = (updates) => {
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cv: {
          ...prev.contact.cv,
          ...updates,
          updatedAt: updates.updatedAt || new Date().toISOString().split('T')[0],
        },
      },
    }));
  };

  const addPersonalLink = (link) => {
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        personalLinks: [...(prev.contact.personalLinks || []), link],
      },
    }));
  };

  const removePersonalLink = (index) => {
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        personalLinks: prev.contact.personalLinks.filter((_, i) => i !== index),
      },
    }));
  };

  const updatePersonalLink = (index, field, value) => {
    updateContent((prev) => {
      const list = [...(prev.contact.personalLinks || [])];
      if (list[index]) {
        list[index] = { ...list[index], [field]: value };
      }
      return {
        ...prev,
        contact: { ...prev.contact, personalLinks: list },
      };
    });
  };

  // Save to localStorage
  const saveContent = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setHasUnsavedChanges(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2500);
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      alert('Error saving to browser storage. If you uploaded a large PDF, please use an external URL link instead.');
      return false;
    }
  };

  // Export JSON file
  const exportContent = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'content.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to default
  const resetContent = () => {
    if (window.confirm('Reset all content back to factory defaults? This will erase your local edits.')) {
      localStorage.removeItem(STORAGE_KEY);
      setContent(defaultContent);
      setHasUnsavedChanges(false);
      setSaveStatus('reset');
      setTimeout(() => setSaveStatus(''), 2500);
    }
  };

  return (
    <EditModeContext.Provider
      value={{
        content,
        isEditMode,
        requestToggleEditMode,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        authenticate,
        saveStatus,
        hasUnsavedChanges,
        updateContent,
        updateHero,
        updateAbout,
        addStat,
        removeStat,
        updateStat,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addSkill,
        removeSkill,
        updateSkill,
        updateContact,
        updateCV,
        addPersonalLink,
        removePersonalLink,
        updatePersonalLink,
        saveContent,
        exportContent,
        resetContent,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useContent() {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useContent must be used within an EditModeProvider');
  }
  return context;
}
