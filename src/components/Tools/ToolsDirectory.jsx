import React, { useState } from 'react';
import { toolsData, toolsCategories } from '../../data/toolsData';
import CodeBlock from '../Common/CodeBlock';
import SearchBar from '../Common/SearchBar';
import { Wrench, Terminal, Download, Sparkles } from 'lucide-react';

export default function ToolsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState(toolsData[0]);

  const filteredTools = toolsData.filter(tool => {
    const matchesCat = selectedCategory === 'All Categories' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-devops">Tools & Snippets Hub</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Cheat Sheets & Boilerplates</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          DevOps & Cloud <span style={{ color: '#ffffff', borderBottom: '2px solid #ffffff' }}>Tools Directory</span>
        </h1>
        <p style={{ color: '#a1a1aa', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Collection of install commands, cheat sheet CLI commands, and copy-paste production templates for Docker, Kubernetes, Helm, Terraform, GitHub Actions, and Observability tools.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {toolsCategories.map(cat => (
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
            placeholder="Search Docker, K8s, Terraform, Helm..."
          />
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px' }}>
        {/* Left Column: Tool List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTools.map(tool => {
            const isSelected = selectedTool?.id === tool.id;

            return (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="glass-panel-interactive"
                style={{
                  padding: '16px',
                  borderColor: isSelected ? '#ffffff' : undefined,
                  background: isSelected ? 'rgba(255, 255, 255, 0.12)' : undefined
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="badge badge-devops" style={{ fontSize: '0.68rem' }}>{tool.category}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#a1a1aa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Tool View */}
        {selectedTool && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-devops">{selectedTool.category}</span>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{selectedTool.name}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              {selectedTool.name}
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '24px' }}>
              {selectedTool.description}
            </p>

            {/* Install Script */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Download size={16} /> INSTALLATION COMMANDS
              </div>
              <CodeBlock code={selectedTool.install} language="bash" title="Installation Commands" />
            </div>

            {/* Cheat Sheet */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Terminal size={16} /> TERMINAL CHEAT SHEET
              </div>
              <CodeBlock code={selectedTool.cheatSheet} language="bash" title="CLI Commands" />
            </div>

            {/* Production Template */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Sparkles size={16} /> {selectedTool.templateTitle.toUpperCase()}
              </div>
              <CodeBlock code={selectedTool.templateCode} language={selectedTool.templateLanguage} title={selectedTool.templateTitle} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
