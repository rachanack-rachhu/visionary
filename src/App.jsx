import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoadmapViewer from './components/Roadmaps/RoadmapViewer';
import ServiceComparison from './components/CloudMatrix/ServiceComparison';
import ProblemResolver from './components/Troubleshooting/ProblemResolver';
import ToolsDirectory from './components/Tools/ToolsDirectory';
import CloudCanvas from './components/ArchitectureBuilder/CloudCanvas';
import VideoAndDocsHub from './components/Resources/VideoAndDocsHub';
import InterviewAndCert from './components/InterviewPrep/InterviewAndCert';
import PipelineVisualizer from './components/Pipeline/PipelineVisualizer';

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmaps');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roadmaps':
        return <RoadmapViewer />;
      case 'cloud-matrix':
        return <ServiceComparison />;
      case 'troubleshooting':
        return <ProblemResolver />;
      case 'tools':
        return <ToolsDirectory />;
      case 'architecture':
        return <CloudCanvas />;
      case 'resources':
        return <VideoAndDocsHub />;
      case 'interview':
        return <InterviewAndCert />;
      case 'pipeline':
        return <PipelineVisualizer />;
      default:
        return <RoadmapViewer />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '30px 20px 0' }}>
        {renderTabContent()}
      </main>

      <Footer />
    </div>
  );
}
