import React, { useState } from 'react';
import { troubleshootingData, troubleshootingCategories } from '../../data/troubleshootingData';
import CodeBlock from '../Common/CodeBlock';
import SearchBar from '../Common/SearchBar';
import { AlertTriangle, Terminal, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ProblemResolver() {
  const [selectedCategory, setSelectedCategory] = useState('All Technologies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(troubleshootingData[0]);

  const filteredIssues = troubleshootingData.filter(issue => {
    const matchesCategory = selectedCategory === 'All Technologies' || issue.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      issue.title.toLowerCase().includes(q) ||
      issue.symptom.toLowerCase().includes(q) ||
      issue.rootCause.toLowerCase().includes(q) ||
      issue.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-red">Troubleshooting Engine</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Production Outage & Error Resolver</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          DevOps & Cloud <span style={{ color: '#ffffff', borderBottom: '2px solid #ffffff' }}>Problem Resolver</span>
        </h1>
        <p style={{ color: '#a1a1aa', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Interactive incident diagnostic workspace for Kubernetes, Docker, AWS, GCP, Azure, Terraform, and Linux production failures. Select any error scenario for diagnostic commands and step-by-step resolution scripts.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          {/* Tech Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {troubleshootingCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search error messages e.g. CrashLoopBackOff, AccessDenied..."
          />
        </div>
      </div>

      {/* 2-Column Incident Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
        {/* Left Column: Error Scenario Selector List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '4px' }}>
            SCENARIOS ({filteredIssues.length})
          </div>

          {filteredIssues.map(issue => {
            const isSelected = selectedIssue?.id === issue.id;

            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className="glass-panel-interactive"
                style={{
                  padding: '16px',
                  borderColor: isSelected ? '#ffffff' : undefined,
                  background: isSelected ? 'rgba(255, 255, 255, 0.12)' : undefined
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="badge badge-devops" style={{ fontSize: '0.68rem' }}>
                    {issue.severity}
                  </span>
                  <span className="badge badge-azure" style={{ fontSize: '0.68rem' }}>
                    {issue.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {issue.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#a1a1aa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {issue.symptom}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Diagnostic & Resolution Workspace */}
        {selectedIssue ? (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="badge badge-devops" style={{ fontSize: '0.78rem' }}>{selectedIssue.category}</span>
              <span className="badge badge-devops" style={{ fontSize: '0.78rem' }}>
                Severity: {selectedIssue.severity}
              </span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              {selectedIssue.title}
            </h2>

            {/* Symptom Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#ffffff', fontSize: '0.88rem', marginBottom: '6px' }}>
                <AlertTriangle size={16} /> OBSERVED SYMPTOM
              </div>
              <p style={{ fontSize: '0.9rem', color: '#e4e4e7', lineHeight: '1.5', margin: 0 }}>
                {selectedIssue.symptom}
              </p>
            </div>

            {/* Root Cause Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#ffffff', fontSize: '0.88rem', marginBottom: '6px' }}>
                <ShieldAlert size={16} /> ROOT CAUSE ANALYSIS
              </div>
              <p style={{ fontSize: '0.9rem', color: '#e4e4e7', lineHeight: '1.5', margin: 0 }}>
                {selectedIssue.rootCause}
              </p>
            </div>

            {/* Step 1: Diagnostic Commands */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Terminal size={16} /> STEP 1: RUN DIAGNOSTIC COMMANDS
              </div>
              <CodeBlock code={selectedIssue.diagnostics} language="bash" title="Diagnostic Commands" />
            </div>

            {/* Step 2: Resolution & Fix */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '10px' }}>
                <CheckCircle2 size={16} /> STEP 2: RESOLUTION & FIX PROCEDURE
              </div>
              <CodeBlock code={selectedIssue.resolution} language="bash" title="Fix Procedure & Config" />
            </div>

            {/* Step 3: Proactive Prevention */}
            {selectedIssue.prevention && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem', marginBottom: '6px' }}>
                  PROACTIVE PREVENTION TIP:
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e4e4e7', lineHeight: '1.5', margin: 0 }}>
                  {selectedIssue.prevention}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#a1a1aa' }}>
            Select an incident scenario from the left to view resolution steps.
          </div>
        )}
      </div>
    </div>
  );
}
