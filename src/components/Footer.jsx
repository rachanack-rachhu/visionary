import React from 'react';
import { Cloud, Terminal, Shield, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid var(--border-color)',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '40px 20px 30px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Cloud size={20} color="var(--accent-contrast)" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              DevOps & Cloud Master Platform
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Unified AWS • GCP • Azure • Kubernetes • Terraform Knowledge Engine
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Shield size={14} /> 100% Production Ready
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Cpu size={14} /> Pure White Light Theme
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Terminal size={14} /> Multi-Cloud Standard
          </span>
        </div>
      </div>
    </footer>
  );
}
