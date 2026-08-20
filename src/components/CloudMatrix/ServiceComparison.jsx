import React, { useState } from 'react';
import { cloudMatrixData, cloudCategories } from '../../data/cloudMatrixData';
import CodeBlock from '../Common/CodeBlock';
import SearchBar from '../Common/SearchBar';
import { Layers, Cloud, Terminal, CheckCircle, ExternalLink, Cpu } from 'lucide-react';

export default function ServiceComparison() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);

  const filteredServices = cloudMatrixData.filter(service => {
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      service.title.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.aws.name.toLowerCase().includes(q) ||
      service.gcp.name.toLowerCase().includes(q) ||
      service.azure.name.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-devops">Multi-Cloud Mapping</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>AWS vs GCP vs Azure</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          Cloud Services <span style={{ color: '#ffffff', borderBottom: '2px solid #ffffff' }}>Equivalency Matrix</span>
        </h1>
        <p style={{ color: '#a1a1aa', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Direct side-by-side comparison between Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure services with CLI syntax and Terraform examples.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cloudCategories.map(cat => (
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
            placeholder="Search AWS EC2, GCP GKE, Azure AKS..."
          />
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredServices.map(service => {
          const isExpanded = expandedItem === service.id;

          return (
            <div key={service.id} className="glass-panel" style={{ padding: '24px' }}>
              {/* Category & Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span className="badge badge-k8s" style={{ marginBottom: '8px' }}>{service.category}</span>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                    {service.title}
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#a1a1aa', marginTop: '4px' }}>
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedItem(isExpanded ? null : service.id)}
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem' }}
                >
                  <Cpu size={14} color="#ffffff" />
                  <span>{isExpanded ? 'Hide Terraform Code' : 'View Terraform Code'}</span>
                </button>
              </div>

              {/* 3-Column Cloud Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {/* AWS Column */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-aws">AWS</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>{service.aws.name}</h3>
                  </div>
                  <ul style={{ paddingLeft: '16px', fontSize: '0.84rem', color: '#e4e4e7', lineHeight: '1.6', marginBottom: '14px' }}>
                    {service.aws.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a1a1aa', marginBottom: '4px' }}>AWS CLI:</div>
                  <CodeBlock code={service.aws.cli} language="bash" showLineNumbers={false} />
                </div>

                {/* GCP Column */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-gcp">GCP</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>{service.gcp.name}</h3>
                  </div>
                  <ul style={{ paddingLeft: '16px', fontSize: '0.84rem', color: '#e4e4e7', lineHeight: '1.6', marginBottom: '14px' }}>
                    {service.gcp.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a1a1aa', marginBottom: '4px' }}>gcloud CLI:</div>
                  <CodeBlock code={service.gcp.cli} language="bash" showLineNumbers={false} />
                </div>

                {/* Azure Column */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-azure">AZURE</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>{service.azure.name}</h3>
                  </div>
                  <ul style={{ paddingLeft: '16px', fontSize: '0.84rem', color: '#e4e4e7', lineHeight: '1.6', marginBottom: '14px' }}>
                    {service.azure.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a1a1aa', marginBottom: '4px' }}>Azure CLI:</div>
                  <CodeBlock code={service.azure.cli} language="bash" showLineNumbers={false} />
                </div>
              </div>

              {/* Collapsible Terraform Snippet */}
              {isExpanded && service.terraform && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    Unified Terraform Infrastructure Code:
                  </div>
                  <CodeBlock code={service.terraform} language="hcl" title="Terraform Module" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
