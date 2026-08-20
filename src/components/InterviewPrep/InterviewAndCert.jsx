import React, { useState } from 'react';
import { interviewQuestionsData, interviewCategories, certificationData } from '../../data/interviewData';
import CodeBlock from '../Common/CodeBlock';
import SearchBar from '../Common/SearchBar';
import { HelpCircle, Award, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export default function InterviewAndCert() {
  const [activeSection, setActiveSection] = useState('interview');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = interviewQuestionsData.filter(item => {
    const matchesLevel = selectedLevel === 'All Levels' || item.level === selectedLevel;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-devops">Career & Certification Prep</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Interview Q&A & Certification Guides</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          Interview Prep & <span style={{ color: '#ffffff', borderBottom: '2px solid #ffffff' }}>Cloud Certifications</span>
        </h1>
        <p style={{ color: '#a1a1aa', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Master technical interview questions from Junior to Principal Cloud Architect level, and prepare for industry gold-standard certifications (AWS, GCP, Azure, CKA/CKS, Terraform).
        </p>

        {/* Section Tabs Switcher */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveSection('interview')}
              className={activeSection === 'interview' ? 'btn-primary' : 'btn-secondary'}
            >
              <HelpCircle size={16} />
              <span>Interview Questions ({interviewQuestionsData.length})</span>
            </button>
            <button
              onClick={() => setActiveSection('certification')}
              className={activeSection === 'certification' ? 'btn-primary' : 'btn-secondary'}
            >
              <Award size={16} />
              <span>Certification Track Guides ({certificationData.length})</span>
            </button>
          </div>

          {activeSection === 'interview' && (
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search interview questions e.g. K8s lifecycle, Terraform drift..."
            />
          )}
        </div>
      </div>

      {/* SECTION 1: INTERVIEW QUESTIONS */}
      {activeSection === 'interview' && (
        <div>
          {/* Level Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {interviewCategories.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={selectedLevel === level ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Accordion Questions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredQuestions.map(item => {
              const isOpen = !!openQuestions[item.id];

              return (
                <div key={item.id} className="glass-panel" style={{ padding: '20px' }}>
                  <div
                    onClick={() => toggleQuestion(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span className="badge badge-devops" style={{ fontSize: '0.68rem' }}>{item.category}</span>
                        <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>{item.level}</span>
                      </div>
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                        {item.question}
                      </h2>
                    </div>

                    <button className="btn-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Collapsible Answer */}
                  {isOpen && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }} className="animate-fade-in">
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '8px' }}>
                        EXPERT ARCHITECT ANSWER:
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#e4e4e7', lineHeight: '1.7', whiteSpace: 'pre-line', marginBottom: '16px' }}>
                        {item.answer}
                      </div>

                      {item.codeSnippet && (
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                            Reference Command / Workflow:
                          </div>
                          <CodeBlock code={item.codeSnippet} language="bash" title="Interview Code Sample" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: CERTIFICATION TRACKS */}
      {activeSection === 'certification' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {certificationData.map(cert => (
            <div key={cert.id} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-devops">{cert.provider}</span>
                <span style={{ fontSize: '0.78rem', color: '#a1a1aa', fontWeight: 700 }}>Exam: {cert.examCode}</span>
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                {cert.title}
              </h2>

              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '10px' }}>
                KEY DOMAINS & EXAM WEIGHTS:
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '0.86rem', color: '#e4e4e7', lineHeight: '1.7', marginBottom: '20px' }}>
                {cert.topics.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>

              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <CheckCircle size={15} color="#ffffff" />
                <span>View Practice Study Checklist</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
