import React, { useState } from 'react';
import { roadmapsData } from '../../data/roadmapsData';
import CodeBlock from '../Common/CodeBlock';
import SearchBar from '../Common/SearchBar';
import { CheckCircle2, Circle, ChevronRight, Terminal, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export default function RoadmapViewer() {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('devops-engineer');
  const [selectedNode, setSelectedNode] = useState(null);
  const [completedNodes, setCompletedNodes] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const activeRoadmap = roadmapsData.find(r => r.id === selectedRoadmapId) || roadmapsData[0];

  const toggleNodeCompletion = (nodeId) => {
    setCompletedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const calculateProgress = () => {
    if (!activeRoadmap.nodes.length) return 0;
    const completedCount = activeRoadmap.nodes.filter(n => completedNodes[n.id]).length;
    return Math.round((completedCount / activeRoadmap.nodes.length) * 100);
  };

  const filteredNodes = activeRoadmap.nodes.filter(node => {
    const q = searchQuery.toLowerCase();
    return (
      node.title.toLowerCase().includes(q) ||
      node.description.toLowerCase().includes(q) ||
      node.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner (Matching Indigo Mockup Card) */}
      <div className="indigo-banner" style={{ marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {activeRoadmap.badge}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Interactive Learning Path</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
            {activeRoadmap.title}
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {activeRoadmap.subtitle}
          </p>

          {/* Track Switcher */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
            {roadmapsData.map(track => (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedRoadmapId(track.id);
                  setSelectedNode(null);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedRoadmapId === track.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.2)',
                  background: selectedRoadmapId === track.id ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedRoadmapId === track.id ? '#1e265c' : '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{track.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedNode ? '1fr 500px' : '1fr', gap: '24px' }}>
        {/* Left Column: Nodes Step Flow */}
        <div>
          {/* Progress Bar & Search */}
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>TRACK PROGRESS</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>
                  {calculateProgress()}% Completed
                </div>
              </div>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search topics in roadmap..."
              />
            </div>
            {/* Bar */}
            <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${calculateProgress()}%`,
                background: '#2b3674',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Node Cards Timeline (Matching Rounded White Item Cards in Mockup) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredNodes.map((node, index) => {
              const isCompleted = !!completedNodes[node.id];
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="glass-panel-interactive"
                  style={{
                    padding: '20px',
                    borderColor: isSelected ? '#2b3674' : isCompleted ? '#bbf7d0' : undefined,
                    background: isSelected ? '#ffffff' : undefined,
                    boxShadow: isSelected ? '0 10px 30px rgba(43, 54, 116, 0.12)' : undefined
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNodeCompletion(node.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          marginTop: '2px',
                          color: isCompleted ? '#16a34a' : '#cbd5e1',
                          padding: 0
                        }}
                      >
                        {isCompleted ? <CheckCircle2 size={24} color="#16a34a" /> : <Circle size={24} />}
                      </button>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <span className="badge badge-devops" style={{ fontSize: '0.7rem' }}>
                            {node.category}
                          </span>
                          {isCompleted && (
                            <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                          {node.title}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight size={20} color={isSelected ? '#2b3674' : '#94a3b8'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dive Drawer */}
        {selectedNode && (
          <div className="glass-panel animate-fade-in" style={{ padding: '24px', position: 'sticky', top: '90px', maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-devops">{selectedNode.category}</span>
              <button
                onClick={() => setSelectedNode(null)}
                className="btn-icon"
              >
                ✕
              </button>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: '#1e293b' }}>
              {selectedNode.title}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', marginBottom: '20px' }}>
              {selectedNode.description}
            </p>

            {/* Core Concepts */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#2b3674', textTransform: 'uppercase', marginBottom: '10px' }}>
                <BookOpen size={15} /> CORE CONCEPTS TO MASTER
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '0.86rem', color: '#334155', lineHeight: '1.7' }}>
                {selectedNode.concepts.map((concept, idx) => (
                  <li key={idx}>{concept}</li>
                ))}
              </ul>
            </div>

            {/* Essential Commands */}
            {selectedNode.commands && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#2b3674', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <Terminal size={15} /> ESSENTIAL CLI COMMANDS
                </div>
                <CodeBlock code={selectedNode.commands} language="bash" title="Terminal Snippets" />
              </div>
            )}

            {/* Ready Config Snippet */}
            {selectedNode.snippet && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#2b3674', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <Sparkles size={15} /> PRODUCTION CODE TEMPLATE
                </div>
                <CodeBlock code={selectedNode.snippet} language="yaml" title="Production Template" />
              </div>
            )}

            {/* Official Doc Link */}
            {selectedNode.docLink && (
              <a
                href={selectedNode.docLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                <span>Read Official Documentation</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
