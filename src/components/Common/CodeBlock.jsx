import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code, language = 'bash', title, showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div style={{
      background: '#1e265c',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '14px',
      overflow: 'hidden',
      margin: '12px 0',
      boxShadow: '0 6px 20px rgba(30, 38, 92, 0.25)'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.82rem' }}>
          <Terminal size={15} color="#818cf8" />
          <span style={{ fontWeight: 700, color: '#ffffff' }}>{title || language.toUpperCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: copied ? '#22c55e' : 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div style={{
        padding: '14px 18px',
        overflowX: 'auto',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        fontFamily: "'Fira Code', monospace"
      }}>
        <pre style={{ margin: 0, display: 'table', width: '100%' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'table-row' }}>
              {showLineNumbers && (
                <span style={{
                  display: 'table-cell',
                  paddingRight: '16px',
                  userSelect: 'none',
                  color: '#64748b',
                  textAlign: 'right',
                  fontSize: '0.78rem'
                }}>
                  {i + 1}
                </span>
              )}
              <span style={{ display: 'table-cell', color: '#f8fafc', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {line}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
