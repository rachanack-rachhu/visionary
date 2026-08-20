export const mediaCategories = [
  'All Resources',
  'AWS Cloud',
  'GCP Cloud',
  'Azure Cloud',
  'Kubernetes',
  'Terraform & IaC',
  'Linux & Shell',
  'CI/CD & GitOps'
];

export const mediaData = [
  {
    id: 'aws-architecture-video',
    title: 'AWS Certified Solutions Architect & Multi-Region Design',
    category: 'AWS Cloud',
    type: 'video',
    provider: 'AWS Official & Cloud Mastery',
    duration: '45 mins',
    url: 'https://www.youtube.com/embed/SOTamWNgDKc',
    description: 'Comprehensive walkthrough of AWS VPC design, ALB, Auto-Scaling, Aurora Global DB, and Disaster Recovery.',
    tags: ['AWS', 'EC2', 'VPC', 'Architecture', 'Solutions Architect']
  },
  {
    id: 'gcp-cloud-architect-video',
    title: 'GCP Professional Cloud Architect Fundamentals',
    category: 'GCP Cloud',
    type: 'video',
    provider: 'Google Cloud Tech',
    duration: '38 mins',
    url: 'https://www.youtube.com/embed/jpIz0S4B8tE',
    description: 'Learn GKE Autopilot, Cloud Run, BigQuery, IAM Workload Identity, and VPC Service Controls.',
    tags: ['GCP', 'GKE', 'Cloud Run', 'BigQuery', 'Google Cloud']
  },
  {
    id: 'azure-solutions-video',
    title: 'Azure Master Class: Virtual Networks, AKS & Entra ID',
    category: 'Azure Cloud',
    type: 'video',
    provider: 'Microsoft Azure Learning',
    duration: '52 mins',
    url: 'https://www.youtube.com/embed/3E_a51oN2wM',
    description: 'Deep dive into Azure Virtual Machine Scale Sets, Azure Kubernetes Service, Key Vault, and Entra ID.',
    tags: ['Azure', 'AKS', 'Entra ID', 'VNet', 'Microsoft']
  },
  {
    id: 'k8s-zero-to-hero-video',
    title: 'Kubernetes Crash Course for DevOps Engineers',
    category: 'Kubernetes',
    type: 'video',
    provider: 'CNCF & DevOps Master',
    duration: '60 mins',
    url: 'https://www.youtube.com/embed/d6WC5n9G_sM',
    description: 'Master Pods, Deployments, Services, Ingress Controllers, Helm charts, and CNI networking.',
    tags: ['Kubernetes', 'kubectl', 'Pods', 'Containers', 'CNCF']
  },
  {
    id: 'terraform-up-and-running',
    title: 'Terraform & OpenTofu Production Patterns Guide',
    category: 'Terraform & IaC',
    type: 'doc',
    provider: 'HashiCorp Docs',
    duration: 'Reading Guide',
    url: 'https://developer.hashicorp.com/terraform/docs',
    description: 'Official HashiCorp documentation on state management, multi-environment modules, and sentinel policy enforcement.',
    tags: ['Terraform', 'HCL', 'IaC', 'HashiCorp', 'Automation']
  },
  {
    id: 'linux-kernel-guide',
    title: 'Linux Performance Optimization & Sysadmin Handbook',
    category: 'Linux & Shell',
    type: 'doc',
    provider: 'Brendan Gregg / Linux Kernel',
    duration: 'Cheat Sheet',
    url: 'https://www.brendangregg.com/linuxperf.html',
    description: 'Industry standard reference for debugging Linux CPU, Memory, Disk IO, and Network bottlenecks.',
    tags: ['Linux', 'Sysadmin', 'htop', 'perf', 'Kernel']
  }
];
