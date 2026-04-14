import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { Canvas } from '@react-three/fiber';
import CuteLamp3D from '../components/CuteLamp3D';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLightOn, setIsLightOn] = useState(false); // Default to off so the user pulls the cord!
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const toggleLight = () => setIsLightOn(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.username, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* Dark Overlay (Dimming the background when light is off) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: '#1a101f', // Dark purple-ish night hue
        opacity: isLightOn ? 0 : 0.85,
        transition: 'opacity 0.8s ease',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* 3D Lamp Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ pointerEvents: 'auto' }}>
          <ambientLight intensity={isLightOn ? 0.8 : 0.1} />
          <CuteLamp3D isLightOn={isLightOn} toggleLight={toggleLight} />
        </Canvas>
      </div>

      {/* Login Card UI */}
      <div style={{ 
        position: 'relative',
        zIndex: 10,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        padding: '20px',
        opacity: isLightOn ? 1 : 0,
        pointerEvents: isLightOn ? 'auto' : 'none',
        transform: isLightOn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <GlassCard style={{ width: '100%', maxWidth: '400px', background: 'rgba(255, 255, 255, 0.5)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '2rem', color: '#ff85a2' }}>
            {isLogin ? 'Welcome Back' : 'Join the Club!'}
          </h2>
          {error && <div style={{ color: '#ff4d4d', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                className="input-field"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ background: 'none', border: 'none', color: '#b19cd9', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
