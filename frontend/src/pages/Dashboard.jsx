import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { Plus, Folder, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects', newProject);
      setProjects([...projects, res.data]);
      setNewProject({ title: '', description: '' });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
          My Projects
        </h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-secondary" onClick={() => setShowModal(true)}>
            <Plus size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            New Project
          </button>
          <button className="btn-secondary" onClick={() => { logout(); navigate('/auth'); }} style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>
            <LogOut size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {projects.map(p => (
          <GlassCard 
            key={p.id} 
            onClick={() => navigate(`/project/${p.id}`)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
            className="project-card"
          >
            <Folder color="#00f5d4" size={32} />
            <h3 style={{ fontSize: '1.4rem' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{p.description}</p>
            <div style={{ marginTop: 'auto', fontSize: '0.9rem', color: '#9d4edd', fontWeight: '600' }}>
              {p.tasks_count || 0} Tasks
            </div>
          </GlassCard>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <GlassCard style={{ width: '400px' }}>
            <h2 style={{ marginBottom: '20px' }}>Create New Project</h2>
            <form onSubmit={createProject}>
              <input
                type="text"
                placeholder="Project Title"
                className="input-field"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="input-field"
                style={{ height: '100px', resize: 'none' }}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, margin: 0 }}>Create</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
