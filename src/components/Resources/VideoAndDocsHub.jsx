import React, { useState } from 'react';
import { mediaData, mediaCategories } from '../../data/mediaData';
import SearchBar from '../Common/SearchBar';
import { Video, BookOpen, ExternalLink, Play, Clock } from 'lucide-react';

export default function VideoAndDocsHub() {
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const filteredMedia = mediaData.filter(item => {
    const matchesCat = selectedCategory === 'All Resources' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.provider.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-devops">Curated Learning Engine</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Videos & Official Documentation</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          DevOps & Cloud <span style={{ color: '#ffffff', borderBottom: '2px solid #ffffff' }}>Video & Docs Hub</span>
        </h1>
        <p style={{ color: '#a1a1aa', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Hand-picked video tutorials, official cloud documentation guides, architecture reference manuals, and performance tuning handbooks for AWS, GCP, Azure, Kubernetes, and Linux.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {mediaCategories.map(cat => (
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
            placeholder="Search videos, docs, topics e.g. VPC, GKE..."
          />
        </div>
      </div>

      {/* Grid of Video & Doc Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredMedia.map(item => (
          <div key={item.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-devops" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                <span style={{ fontSize: '0.78rem', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {item.duration}
                </span>
              </div>

              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: '1.4' }}>
                {item.title}
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 700, marginBottom: '10px' }}>
                Provided by: {item.provider}
              </div>
              <p style={{ fontSize: '0.86rem', color: '#a1a1aa', lineHeight: '1.5', marginBottom: '16px' }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {item.type === 'video' ? (
              <button
                onClick={() => setActiveVideoModal(item)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Play size={15} fill="#000000" />
                <span>Watch Video Tutorial</span>
              </button>
            ) : (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <BookOpen size={15} />
                <span>Open Documentation</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Embedded Video Modal */}
      {activeVideoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '900px', padding: '24px', background: '#000000', border: '1px solid #ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                {activeVideoModal.title}
              </h2>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="btn-icon"
              >
                ✕
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '10px' }}>
              <iframe
                src={activeVideoModal.url}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
