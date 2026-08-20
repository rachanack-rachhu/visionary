import React, { useState } from 'react';
import CodeBlock from '../Common/CodeBlock';
import { Cpu, Plus, Trash2, ShieldAlert, DollarSign, Server, Database, HardDrive, Layers, Globe } from 'lucide-react';

const NODE_TYPES = [
  { type: 'vpc', name: 'Virtual Private Cloud (VPC/VNet)', icon: Globe, defaultProvider: 'aws', cost: 0 },
  { type: 'compute', name: 'Virtual Machine / EC2 / GCE / VM', icon: Server, defaultProvider: 'aws', cost: 35 },
  { type: 'k8s', name: 'Kubernetes Cluster (EKS / GKE / AKS)', icon: Layers, defaultProvider: 'gcp', cost: 72 },
  { type: 'database', name: 'Managed SQL DB (RDS / Cloud SQL)', icon: Database, defaultProvider: 'aws', cost: 50 },
  { type: 'storage', name: 'Object Storage (S3 / GCS / Blob)', icon: HardDrive, defaultProvider: 'aws', cost: 15 },
  { type: 'alb', name: 'Load Balancer (ALB / Cloud Load Balancer)', icon: Cpu, defaultProvider: 'aws', cost: 22 }
];

export default function CloudCanvas() {
  const [nodes, setNodes] = useState([
    { id: 'node-1', type: 'vpc', name: 'Production-VPC', provider: 'aws', isPublic: false, count: 1 },
    { id: 'node-2', type: 'k8s', name: 'Production-GKE-Cluster', provider: 'gcp', isPublic: false, count: 3 },
    { id: 'node-3', type: 'database', name: 'PostgreSQL-CloudSQL', provider: 'gcp', isPublic: false, count: 1 },
    { id: 'node-4', type: 'storage', name: 'Assets-Bucket', provider: 'aws', isPublic: false, count: 1 }
  ]);

  const addNode = (template) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: template.type,
      name: `${template.name.split(' ')[0]}-${nodes.length + 1}`,
      provider: template.defaultProvider,
      isPublic: false,
      count: 1
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const updateNode = (id, field, value) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  const calculateCost = () => {
    return nodes.reduce((total, node) => {
      const meta = NODE_TYPES.find(t => t.type === node.type);
      const baseCost = meta ? meta.cost : 20;
      return total + (baseCost * (node.count || 1));
    }, 0);
  };

  const securityWarnings = [];
  nodes.forEach(node => {
    if (node.isPublic && node.type === 'database') {
      securityWarnings.push(`WARNING: Database "${node.name}" has Public Access enabled! Put DB in private subnets.`);
    }
  });

  const generateTerraform = () => {
    let tf = `# Auto-Generated Multi-Cloud Infrastructure (Terraform HCL)
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
    google = { source = "hashicorp/google", version = "~> 5.0" }
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.0" }
  }
}

provider "aws" { region = "us-east-1" }
provider "google" { project = "my-gcp-project", region = "us-central1" }

`;

    nodes.forEach(node => {
      if (node.type === 'vpc') {
        if (node.provider === 'aws') {
          tf += `# AWS VPC Resource
resource "aws_vpc" "${node.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "${node.name}" }
}\n\n`;
        } else if (node.provider === 'gcp') {
          tf += `# GCP VPC Network
resource "google_compute_network" "${node.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}" {
  name                    = "${node.name.toLowerCase()}"
  auto_create_subnetworks = false
}\n\n`;
        }
      } else if (node.type === 'k8s') {
        if (node.provider === 'gcp') {
          tf += `# GCP GKE Autopilot Cluster
resource "google_container_cluster" "${node.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}" {
  name             = "${node.name.toLowerCase()}"
  location         = "us-central1"
  enable_autopilot = true
}\n\n`;
        } else {
          tf += `# AWS EKS Cluster
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "${node.name.toLowerCase()}"
  cluster_version = "1.29"
}\n\n`;
        }
      } else if (node.type === 'database') {
        tf += `# Managed Database
resource "google_sql_database_instance" "${node.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}" {
  name             = "${node.name.toLowerCase()}"
  database_version = "POSTGRES_15"
  region           = "us-central1"
  settings {
    tier = "db-custom-2-7680"
  }
}\n\n`;
      } else if (node.type === 'storage') {
        tf += `# AWS S3 Storage Bucket
resource "aws_s3_bucket" "${node.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}" {
  bucket = "${node.name.toLowerCase()}-bucket-2026"
}\n\n`;
      }
    });

    return tf;
  };

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-devops">Interactive Playground</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Visual Cloud Builder & IaC Compiler</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          Cloud Architecture Builder <span style={{ color: '#ffffff', borderBottom: '2px solid #ffffff' }}>& IaC Generator</span>
        </h1>
        <p style={{ color: '#a1a1aa', maxWidth: '800px', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Add AWS, GCP, and Azure cloud resources to your topology, configure instance parameters, audit security vulnerabilities, estimate monthly cloud cost, and compile ready-to-deploy Terraform code in real time!
        </p>
      </div>

      {/* Top Toolbar: Add Node Palette */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '12px' }}>
          ADD CLOUD RESOURCE TO ARCHITECTURE:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {NODE_TYPES.map(template => {
            const Icon = template.icon;
            return (
              <button
                key={template.type}
                onClick={() => addNode(template)}
                className="btn-secondary"
                style={{ fontSize: '0.84rem' }}
              >
                <Plus size={14} color="#ffffff" />
                <Icon size={16} />
                <span>{template.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 500px', gap: '24px' }}>
        {/* Left Column: Active Topology Nodes */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
              Active Cloud Infrastructure ({nodes.length} Components)
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                <DollarSign size={18} /> Est. ${calculateCost()}/mo
              </div>
            </div>
          </div>

          {/* Security Alert Warnings */}
          {securityWarnings.length > 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '20px'
            }}>
              {securityWarnings.map((warn, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={16} /> {warn}
                </div>
              ))}
            </div>
          )}

          {/* Nodes Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {nodes.map(node => {
              const meta = NODE_TYPES.find(t => t.type === node.type) || NODE_TYPES[0];
              const Icon = meta.icon;

              return (
                <div key={node.id} style={{
                  background: 'rgba(18, 18, 18, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} color="#000000" />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={node.name}
                        onChange={(e) => updateNode(node.id, 'name', e.target.value)}
                        style={{
                          background: 'none',
                          border: 'none',
                          borderBottom: '1px dashed rgba(255, 255, 255, 0.4)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <div style={{ fontSize: '0.76rem', color: '#a1a1aa', marginTop: '2px' }}>
                        Type: {meta.name}
                      </div>
                    </div>
                  </div>

                  {/* Provider & Parameter Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <select
                      value={node.provider}
                      onChange={(e) => updateNode(node.id, 'provider', e.target.value)}
                      className="input-dark"
                      style={{ padding: '4px 8px', fontSize: '0.8rem', width: '90px' }}
                    >
                      <option value="aws">AWS</option>
                      <option value="gcp">GCP</option>
                      <option value="azure">Azure</option>
                    </select>

                    <label style={{ fontSize: '0.78rem', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={node.isPublic}
                        onChange={(e) => updateNode(node.id, 'isPublic', e.target.checked)}
                      />
                      <span>Public Access</span>
                    </label>

                    <button
                      onClick={() => removeNode(node.id)}
                      className="btn-icon"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Terraform Code Output */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '12px' }}>
            LIVE TERRAFORM HCL CODE GENERATOR
          </div>

          <CodeBlock code={generateTerraform()} language="hcl" title="main.tf Generator" />
        </div>
      </div>
    </div>
  );
}
