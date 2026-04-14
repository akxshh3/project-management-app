import React from 'react';

export default function GlassCard({ children, className = '', style = {}, onClick }) {
  return (
    <div 
      className={`glass-panel ${className}`} 
      style={{ padding: '32px', ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
