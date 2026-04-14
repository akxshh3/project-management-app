import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import GlassCard from '../components/GlassCard';
import { ArrowLeft, CheckCircle, Circle, Trash2, Plus } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', status: 'todo' });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/projects/${id}/tasks`, newTask);
      setProject({ ...project, tasks: [...project.tasks, res.data] });
      setNewTask({ title: '', status: 'todo' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setProject({
        ...project, 
        tasks: project.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setProject({
        ...project,
        tasks: project.tasks.filter(t => t.id !== taskId)
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) return <div style={{ color: '#fff', padding: '40px' }}>Loading...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '24px', border: 'none', padding: 0 }}>
        <ArrowLeft size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        Back to Dashboard
      </button>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>{project.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '8px' }}>{project.description}</p>
      </div>

      <GlassCard style={{ marginBottom: '40px' }}>
        <form onSubmit={createTask} style={{ display: 'flex', gap: '16px' }}>
          <input
            type="text"
            placeholder="Add a new task..."
            className="input-field"
            style={{ margin: 0, flex: 1 }}
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary" style={{ width: 'auto', display: 'flex', alignItems: 'center' }}>
            <Plus size={20} style={{ marginRight: '8px' }} /> Add
          </button>
        </form>
      </GlassCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {project.tasks?.map(task => (
          <GlassCard key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', gap: '16px' }}>
            <button 
              onClick={() => updateTaskStatus(task.id, task.status)}
              style={{ background: 'none', border: 'none', color: task.status === 'completed' ? '#00f5d4' : '#a0a0B0' }}
            >
              {task.status === 'completed' ? <CheckCircle size={28} /> : <Circle size={28} />}
            </button>
            <span style={{ 
              flex: 1, 
              fontSize: '1.2rem', 
              color: task.status === 'completed' ? '#a0a0B0' : '#fff',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none'
            }}>
              {task.title}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}
            >
              <Trash2 size={24} />
            </button>
          </GlassCard>
        ))}
        {project.tasks?.length === 0 && (
           <div style={{ textAlign: 'center', color: '#a0a0B0', padding: '40px' }}>No tasks found for this project.</div>
        )}
      </div>
    </div>
  );
}
