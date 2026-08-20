import React, { useState } from 'react';
import CodeBlock from '../Common/CodeBlock';
import { 
  GitBranch, Code2, Cpu, ShieldCheck, Box, Search, Cloud, FileCode, 
  RefreshCw, Layers, Rocket, CheckCircle2, AlertTriangle, Lightbulb, 
  Shield, Terminal, Sparkles, HelpCircle, ThumbsUp
} from 'lucide-react';

export const PIPELINE_STEPS = [
  {
    id: 'developer',
    stepNumber: 1,
    name: 'Developer',
    subtitle: 'Developer writes code and commits locally',
    icon: Code2,
    color: '#3b82f6',
    description: 'The lifecycle begins when a software engineer writes features or bug fixes locally, runs local linter/tests, and commits code to Git.',
    commands: `git checkout -b feature/auth-service
git add .
git commit -m "feat(auth): implement JWT token verification"`
  },
  {
    id: 'github-push',
    stepNumber: 2,
    name: 'GitHub / GitLab',
    subtitle: 'Code pushed to remote Git repository',
    icon: GitBranch,
    color: '#1e293b',
    description: 'Pushing code triggers a Git Webhook (or Pull Request event) that notifies the CI/CD pipeline automation controller.',
    commands: `git push origin feature/auth-service
# Triggers webhook event: pull_request.opened`
  },
  {
    id: 'jenkins-trigger',
    stepNumber: 3,
    name: 'Jenkins / GitHub Actions',
    subtitle: 'Pipeline controller triggers automated build',
    icon: RefreshCw,
    color: '#ea580c',
    description: 'The CI runner allocates an isolated build container, clones the code, and initializes environmental secrets.',
    commands: `# GitHub Actions Trigger
name: End-to-End DevSecOps Pipeline
on:
  push:
    branches: [ main, develop ]`
  },
  {
    id: 'build-test',
    stepNumber: 4,
    name: 'Build & Test',
    subtitle: 'Compile code and run automated unit/integration tests',
    icon: Cpu,
    color: '#16a34a',
    description: 'Compiles source code, installs dependencies, and runs unit test suites. Fast feedback halts broken builds early.',
    commands: `# Node.js / Go Test Command
npm ci
npm test -- --coverage`
  },
  {
    id: 'sonarqube',
    stepNumber: 5,
    name: 'SonarQube (SAST)',
    subtitle: 'Check code quality, code smells, and bugs',
    icon: Search,
    color: '#2563eb',
    description: 'Static Application Security Testing (SAST) checks cyclomatic complexity, code coverage, potential bugs, and security vulnerabilities.',
    commands: `sonar-scanner \\
  -Dsonar.projectKey=auth-service \\
  -Dsonar.sources=. \\
  -Dsonar.host.url=https://sonarqube.company.com \\
  -Dsonar.login=$SONAR_TOKEN`
  },
  {
    id: 'owasp-scan',
    stepNumber: 6,
    name: 'OWASP Dependency-Check (SCA)',
    subtitle: 'Scan third-party packages for known vulnerabilities',
    icon: ShieldCheck,
    color: '#dc2626',
    description: 'Software Composition Analysis (SCA) scans open-source libraries (`package.json`, `pom.xml`, `go.mod`) against NVD CVE databases.',
    commands: `dependency-check --project "AuthService" \\
  --scan . \\
  --format "ALL" \\
  --failOnCVSS 7`
  },
  {
    id: 'docker-build',
    stepNumber: 7,
    name: 'Docker Build',
    subtitle: 'Package application into OCI container image',
    icon: Box,
    color: '#0284c7',
    description: 'Builds a reproducible multi-stage Docker image packaging the compiled binary and minimal runtime dependencies.',
    commands: `docker buildx build -t ghcr.io/company/auth-service:v1.4.0 --platform linux/amd64 .`
  },
  {
    id: 'trivy-scan',
    stepNumber: 8,
    name: 'Trivy Image Scan',
    subtitle: 'Scan container image for OS & package CVEs',
    icon: Shield,
    color: '#15803d',
    description: 'Container image vulnerability scanner checks base OS packages (Debian/Alpine) and application layers before registry push.',
    commands: `trivy image --exit-code 1 --severity HIGH,CRITICAL ghcr.io/company/auth-service:v1.4.0`
  },
  {
    id: 'amazon-ecr',
    stepNumber: 9,
    name: 'Amazon ECR / GCP Registry',
    subtitle: 'Push validated container image to Cloud Registry',
    icon: Cloud,
    color: '#d97706',
    description: 'Authenticates via OIDC keyless identity and pushes the scanned, signed container image to Amazon ECR or GCP Artifact Registry.',
    commands: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/auth-service:v1.4.0`
  },
  {
    id: 'helm-update',
    stepNumber: 10,
    name: 'Update Helm values.yaml',
    subtitle: 'Update image tag in GitOps configuration',
    icon: FileCode,
    color: '#4f46e5',
    description: 'Automation updates the deployment image tag inside the GitOps repository (`values.yaml`), ensuring declarative state control.',
    commands: `# yq expression to update image tag
yq eval '.image.tag = "v1.4.0"' -i deployment/helm/values.yaml`
  },
  {
    id: 'git-commit-manifest',
    stepNumber: 11,
    name: 'GitOps Manifest Commit',
    subtitle: 'Commit and push manifest changes to Git',
    icon: GitBranch,
    color: '#0f172a',
    description: 'The updated Kubernetes manifest or Helm values file is committed back to the Git infrastructure repository.',
    commands: `git commit -am "chore(deps): bump auth-service to v1.4.0"
git push origin main`
  },
  {
    id: 'argo-cd',
    stepNumber: 12,
    name: 'Argo CD / Flux',
    subtitle: 'Argo CD detects changes & syncs cluster',
    icon: RefreshCw,
    color: '#ea580c',
    description: 'GitOps controller runs inside Kubernetes, detects drift between Git desired state and live cluster state, and triggers an automated sync.',
    commands: `argocd app sync auth-service-prod
argocd app wait auth-service-prod --health`
  },
  {
    id: 'kubernetes-deploy',
    stepNumber: 13,
    name: 'Kubernetes (EKS/GKE/AKS)',
    subtitle: 'Rolling update deployed to Kubernetes cluster',
    icon: Layers,
    color: '#2563eb',
    description: 'Kubernetes creates new Pods with zero downtime using RollingUpdate strategy, running readiness & liveness probes before terminating old pods.',
    commands: `kubectl rollout status deployment/auth-service -n production`
  },
  {
    id: 'production-live',
    stepNumber: 14,
    name: 'Production & Observability',
    subtitle: 'Application live & monitored in Production',
    icon: Rocket,
    color: '#dc2626',
    description: 'Traffic flows through Cloud Load Balancer / Ingress. Prometheus collects metrics, Grafana tracks HTTP rates, and SRE alerts remain active.',
    commands: `curl -I https://api.company.com/health`
  }
];

export default function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(PIPELINE_STEPS[0]);
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [pollVotes, setPollVotes] = useState({
    security: 42,
    testing: 38,
    gitops: 55,
    automation: 65
  });

  const handleVote = (option) => {
    setSelectedPollOption(option);
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
  };

  return (
    <div className="animate-fade-in">
      {/* Top Banner (Matching Handwritten Title Style from Diagram) */}
      <div className="indigo-banner" style={{ marginBottom: '30px', textAlign: 'center', padding: '36px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.15)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', color: '#ffffff' }}>
          <Sparkles size={14} /> Complete DevOps Workflow Architecture
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
          End-to-End <span style={{ textDecoration: 'underline decoration-wavy #6366f1' }}>DevOps CI/CD Pipeline</span> Visualizer
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '750px', margin: '0 auto', fontSize: '0.98rem', lineHeight: '1.6' }}>
          Step-by-step interactive breakdown of modern continuous integration, security scanning (SAST/SCA/CVE), containerization, GitOps deployment with Argo CD, and Kubernetes production observability.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '28px' }}>
        {/* Left Column: Interactive 14-Step Flow Timeline */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
              Pipeline Execution Flow ({PIPELINE_STEPS.length} Stages)
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Click any stage to inspect</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep.id === step.id;

              return (
                <React.Fragment key={step.id}>
                  <div
                    onClick={() => setActiveStep(step)}
                    className="glass-panel-interactive"
                    style={{
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderColor: isSelected ? '#2b3674' : undefined,
                      background: isSelected ? '#ffffff' : undefined,
                      boxShadow: isSelected ? '0 8px 25px rgba(43, 54, 116, 0.15)' : undefined
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.88rem'
                      }}>
                        <Icon size={18} />
                      </div>

                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                          {step.stepNumber}. {step.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2b3674', padding: '2px 8px', borderRadius: '12px', background: '#e0e7ff' }}>
                        ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Connecting Arrow Down */}
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0' }}>
                      <span style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 800 }}>↓</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stage Inspection + Side Cards from Image */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Active Stage Inspector Drawer */}
          <div className="glass-panel" style={{ padding: '24px', borderColor: '#2b3674', borderTopWidth: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="badge badge-devops">STAGE {activeStep.stepNumber} OF {PIPELINE_STEPS.length}</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Deep-Dive Inspector</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
              {activeStep.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', marginBottom: '16px' }}>
              {activeStep.description}
            </p>

            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2b3674', textTransform: 'uppercase', marginBottom: '8px' }}>
              CLI / CONFIGURATION FOR THIS STAGE:
            </div>
            <CodeBlock code={activeStep.commands} language="bash" title={`${activeStep.name} Command`} />
          </div>

          {/* Side Card 1: What I Learned (Matching Diagram Right Card) */}
          <div className="glass-panel" style={{ padding: '24px', background: '#ffffff', borderColor: '#cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>
              <Lightbulb size={20} color="#eab308" /> What I Learned Building This Pipeline
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
              Building an end-to-end CI/CD pipeline demonstrates that DevOps is not just about automated deployment — it encompasses:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#1e293b', lineHeight: '1.8', fontWeight: 600 }}>
              <li>⚡ <strong>Automation</strong>: Zero manual deployment steps</li>
              <li>🛡️ <strong>Shift-Left Security</strong>: SAST, SCA, and container scanning</li>
              <li>📊 <strong>Observability</strong>: Real-time Prometheus metrics & logs</li>
              <li>🔁 <strong>Reliability & Repeatability</strong>: GitOps declarativeness</li>
            </ul>
          </div>

          {/* Side Card 2: Best Practices (Matching Diagram Green Card) */}
          <div className="glass-panel" style={{ padding: '24px', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 800, color: '#166534', marginBottom: '14px' }}>
              <CheckCircle2 size={20} color="#16a34a" /> Pipeline Best Practices
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: '#14532d', fontWeight: 600 }}>
              <div style={{ paddingBottom: '8px', borderBottom: '1px dashed #bbf7d0' }}>
                ✅ <strong>Automate Every Deployment</strong>: No manual SSH or kubectl commands in production.
              </div>
              <div style={{ paddingBottom: '8px', borderBottom: '1px dashed #bbf7d0' }}>
                ✅ <strong>Fail Early</strong>: Halt the pipeline immediately when quality, SAST, or Trivy vulnerability scans fail.
              </div>
              <div style={{ paddingBottom: '8px', borderBottom: '1px dashed #bbf7d0' }}>
                ✅ <strong>GitOps Single Source of Truth</strong>: Store infrastructure and deployment configs directly in Git repositories.
              </div>
              <div>
                ✅ <strong>Monitor Everything</strong>: Alert proactively on error budget burn rates.
              </div>
            </div>
          </div>

          {/* Interactive Question / Poll (Matching Diagram Purple Card) */}
          <div className="glass-panel" style={{ padding: '24px', background: '#f5f3ff', borderColor: '#ddd6fe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 800, color: '#5b21b6', marginBottom: '10px' }}>
              <HelpCircle size={20} color="#7c3aed" /> Question for You ?
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4c1d95', fontWeight: 700, marginBottom: '14px' }}>
              Which stage do you think adds the most value in a CI/CD pipeline?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { key: 'automation', label: '1. Automated Build & Unit Tests' },
                { key: 'security', label: '2. DevSecOps (SonarQube & Trivy Security Scans)' },
                { key: 'gitops', label: '3. GitOps Continuous Deployment (Argo CD)' },
                { key: 'testing', label: '4. Production Observability & Monitoring' }
              ].map(opt => {
                const isVoted = selectedPollOption === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleVote(opt.key)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: isVoted ? '2px solid #7c3aed' : '1px solid #c4b5fd',
                      background: isVoted ? '#7c3aed' : '#ffffff',
                      color: isVoted ? '#ffffff' : '#4c1d95',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{opt.label}</span>
                    <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                      {pollVotes[opt.key]} votes
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
