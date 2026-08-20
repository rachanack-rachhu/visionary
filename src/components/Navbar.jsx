import React from 'react';
import { Map, Layers, AlertTriangle, Wrench, Video, HelpCircle, Cpu, Cloud, GitBranch } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'pipeline', label: 'CI/CD Pipeline Flow', icon: GitBranch, badge: 'Diagram' },
    { id: 'roadmaps', label: 'Roadmaps', icon: Map },
    { id: 'cloud-matrix', label: 'Cloud Matrix (AWS/GCP/Azure)', icon: Layers },
    { id: 'troubleshooting', label: 'Problem Resolver', icon: AlertTriangle },
    { id: 'tools', label: 'Tools & Snippets', icon: Wrench },
    { id: 'architecture', label: 'Cloud Canvas & IaC Generator', icon: Cpu, badge: 'Interactive' },
    { id: 'resources', label: 'Videos & Docs', icon: Video },
    { id: 'interview', label: 'Interview & Certs', icon: HelpCircle }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('pipeline')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #1e265c 0%, #2b3674 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(43, 54, 116, 0.25)'
          }}>
            <Cloud size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1e293b'
            }}>
              <span>DevOps</span>
              <span style={{ color: '#2b3674', borderBottom: '2px solid #2b3674' }}>& Cloud Hub</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
              GCP • AWS • Azure • K8s • Terraform
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: isActive ? '1px solid #2b3674' : '1px solid transparent',
                  background: isActive ? '#2b3674' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#ffffff' : '#64748b'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: isActive ? '#ffffff' : '#e0e7ff',
                    color: isActive ? '#2b3674' : '#4338ca',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
