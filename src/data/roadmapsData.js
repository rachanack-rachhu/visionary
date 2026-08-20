export const roadmapsData = [
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer Roadmap',
    subtitle: 'From Linux & Networking fundamentals to CI/CD, Containerization, K8s, and Multi-Cloud Mastery.',
    icon: 'Terminal',
    color: '#00f2fe',
    badge: 'Core Career Track',
    nodes: [
      {
        id: 'linux-networking',
        title: '1. Linux OS & Networking Essentials',
        category: 'Fundamentals',
        description: 'System calls, process management, file permissions, shell scripting, TCP/IP, DNS, SSH, systemctl.',
        concepts: [
          'Process Isolation & System Signals (SIGTERM, SIGKILL)',
          'Linux File Permissions (chmod, chown, SUID/SGID)',
          'Networking: Subnetting, CIDR, Ports, DNS resolution (/etc/hosts, resolvectl)',
          'Systemd & Journald logs (systemctl status, journalctl -u)'
        ],
        commands: `# View open ports and active connections
netstat -tulpn || ss -tulpn

# Inspect live process resources & thread load
top -b -n 1 | head -n 20
htop

# Check systemd service logs in real time
journalctl -u nginx.service -f --since "10 min ago"

# DNS resolution troubleshooting
dig +trace api.devopscloud.io @8.8.8.8`,
        snippet: `#!/bin/bash
# High CPU & Disk Usage Monitor Script
THRESHOLD=85
CURRENT_DISK=$(df / | grep / | awk '{ print $5 }' | sed 's/%//g')

if [ "$CURRENT_DISK" -gt "$THRESHOLD" ]; then
    echo "ALERT: Disk usage on root filesystem exceeded \${THRESHOLD}%! Current: \${CURRENT_DISK}%" | mail -s "Disk Alert" ops@company.com
fi`,
        docLink: 'https://www.linux.org/docs/'
      },
      {
        id: 'git-version-control',
        title: '2. Version Control & Git Workflows',
        category: 'VCS & Collaboration',
        description: 'Git branching strategies (GitFlow, Trunk-Based Development), rebasing, cherry-picking, hooks, submodules.',
        concepts: [
          'Trunk-Based Development vs GitFlow in DevOps pipelines',
          'Interactive Rebasing & Merging without merge commits',
          'Git Hooks (pre-commit, pre-push) for linting and security scanning',
          'Resolving merge conflicts in shared Terraform & Helm repositories'
        ],
        commands: `# Interactive rebase last 4 commits
git rebase -i HEAD~4

# Cherry-pick hotfix commit to production branch
git checkout release/v2.1
git cherry-pick a1b2c3d4

# Undo last commit without losing local changes
git reset --soft HEAD~1

# Clean untracked files & directories recursively
git clean -fd`,
        snippet: `# .pre-commit-config.yaml for Terraform & Security
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.86.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_tsec`,
        docLink: 'https://git-scm.com/doc'
      },
      {
        id: 'cicd-pipelines',
        title: '3. CI/CD Pipeline Automation',
        category: 'Automation',
        description: 'GitHub Actions, GitLab CI/CD, Jenkins pipelines, matrix builds, artifact caching, security scanning.',
        concepts: [
          'Continuous Integration (Lint -> Test -> Scan -> Build -> Publish)',
          'Continuous Deployment (GitOps, Canary, Blue/Green, Rolling)',
          'Secrets Management in Pipelines (Vault, OIDC, Environment Secrets)',
          'Build Caching & Parallel Matrix Workflows'
        ],
        commands: `# Validate GitHub Actions workflow syntax locally
act -l

# Trigger GitLab pipeline manually via API
curl --request POST --header "PRIVATE-TOKEN: <your_access_token>" \
     "https://gitlab.com/api/v4/projects/12345/pipeline?ref=main"`,
        snippet: `# .github/workflows/deploy-k8s.yml
name: Build & Deploy to EKS / GKE

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Build & Push Docker Image
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/org/app:\${{ github.sha }}
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/web-app app=ghcr.io/org/app:\${{ github.sha }} -n prod`,
        docLink: 'https://docs.github.com/en/actions'
      },
      {
        id: 'docker-containers',
        title: '4. Docker & Containerization',
        category: 'Containers',
        description: 'Multi-stage Dockerfiles, distroless images, image optimization, cgroups, namespaces, Docker Compose.',
        concepts: [
          'Linux Kernel Namespaces (PID, NET, IPC, MNT) & Control Groups (cgroups)',
          'Multi-Stage Builds to reduce image size from 1GB to <25MB',
          'Non-root user execution & read-only file systems for security',
          'Docker Compose multi-container dev environments'
        ],
        commands: `# Build multi-architecture image (amd64, arm64)
docker buildx build --platform linux/amd64,linux/arm64 -t org/app:v1.0 --push .

# Inspect running container resource consumption
docker stats --no-stream

# Clean up dangling images, unused volumes, and stopped containers
docker system prune -a --volumes`,
        snippet: `# Multi-Stage Production Dockerfile (Go / Node.js)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER 10001
EXPOSE 3000
CMD ["dist/index.js"]`,
        docLink: 'https://docs.docker.com/'
      },
      {
        id: 'kubernetes-orchestration',
        title: '5. Kubernetes Container Orchestration',
        category: 'Orchestration',
        description: 'Pods, Deployments, StatefulSets, DaemonSets, Services, Ingress, RBAC, Helm, HPA, Custom Resource Definitions (CRDs).',
        concepts: [
          'Control Plane (kube-apiserver, etcd, kube-scheduler, controller-manager)',
          'Worker Nodes (kubelet, kube-proxy, Container Runtime)',
          'Networking: CNI Plugins (Flannel, Calico, Cilium, AWS VPC CNI)',
          'Resource Requests/Limits, QoS classes (Guaranteed, Burstable, BestEffort)'
        ],
        commands: `# Get all pods across all namespaces with node mapping
kubectl get pods -A -o wide

# Detailed debug of failing pod
kubectl describe pod <pod-name> -n prod
kubectl logs <pod-name> --previous -n prod

# Port-forward service to localhost
kubectl port-forward svc/prometheus-k8s 9090:9090 -n monitoring`,
        snippet: `# Production Kubernetes Deployment Spec
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
  namespace: prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payment
    spec:
      containers:
      - name: api
        image: ghcr.io/org/payment:v2.4.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "250m"
            memory: "512Mi"
          limits:
            cpu: "1000m"
            memory: "1Gi"
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10`,
        docLink: 'https://kubernetes.io/docs/'
      },
      {
        id: 'terraform-iac',
        title: '6. Infrastructure as Code (Terraform & OpenTofu)',
        category: 'IaC',
        description: 'HCL syntax, modules, remote state locking (S3/DynamoDB, GCS), workspaces, state manipulation, drift detection.',
        concepts: [
          'Terraform State Architecture & Concurrency Lock',
          'Reusable Modules & Variable Validations',
          'Terraform Import & State Migration (moved blocks)',
          'Multi-Cloud Providers (AWS, GCP, Azure, Kubernetes, Vault)'
        ],
        commands: `# Initialize with backend configuration
terraform init -backend-config="bucket=my-company-tf-state"

# Generate execution plan & save to file
terraform plan -out=tfplan

# Apply saved execution plan
terraform apply tfplan

# Force release locked state (Use with extreme caution!)
terraform force-unlock <LOCK-ID>`,
        snippet: `# main.tf - Production Remote State & AWS S3/GCP GCS Backend
terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket         = "prod-terraform-state-us-east-1"
    key            = "core-infrastructure/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}`,
        docLink: 'https://developer.hashicorp.com/terraform/docs'
      },
      {
        id: 'monitoring-observability',
        title: '7. Observability (Prometheus, Grafana, OpenTelemetry)',
        category: 'Monitoring',
        description: 'Metrics collection, PromQL, Alertmanager, Grafana dashboards, OpenTelemetry distributed tracing, Log aggregation (Loki/ELK).',
        concepts: [
          'The 4 Golden Signals: Latency, Traffic, Errors, Saturation',
          'Prometheus Architecture (Pull model, TSDB, Exporters)',
          'PromQL Aggregations (rate, histogram_quantile, sum by)',
          'OpenTelemetry Collector & Distributed Context Propagation'
        ],
        commands: `# Test PromQL query via HTTP API
curl -s 'http://localhost:9090/api/v1/query?query=sum(rate(http_requests_total[5m]))' | jq .

# Check Prometheus alert targets status
curl -s 'http://localhost:9090/api/v1/targets' | jq '.data.activeTargets[].health'`,
        snippet: `# Prometheus AlertRule for Kubernetes High Error Rate
groups:
- name: k8s-alerts
  rules:
  - alert: HighHttp5xxErrorRate
    expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100 > 5
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "High 5xx HTTP Error Rate on {{ $labels.service }}"
      description: "Service HTTP 5xx error rate is above 5% over 5 minutes."`,
        docLink: 'https://prometheus.io/docs/'
      }
    ]
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect Roadmap (AWS, GCP, Azure)',
    subtitle: 'Master enterprise multi-cloud design, hybrid cloud, high availability, security controls, and cost optimization.',
    icon: 'Cloud',
    color: '#ff9900',
    badge: 'Architecture Track',
    nodes: [
      {
        id: 'multi-cloud-iam',
        title: '1. Multi-Cloud Identity & Security Governance',
        category: 'Security & IAM',
        description: 'AWS IAM Roles, GCP Service Accounts, Azure Entra ID (Azure AD), Workload Identity Federation, OIDC.',
        concepts: [
          'Principle of Least Privilege (PoLP) and Just-in-Time (JIT) Access',
          'Keyless Authentication with Workload Identity (GitHub Actions to AWS/GCP without hardcoded keys)',
          'Cross-Account IAM Roles and SCPs (Service Control Policies)',
          'Identity Federation with SAML 2.0 and Azure Entra ID'
        ],
        commands: `# Assume AWS IAM Role via CLI
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/DevOpsAdminRole --role-session-name CLI-Session

# GCP Workload Identity test authentication
gcloud auth print-access-token --impersonate-service-account=sa-deployer@my-project.iam.gserviceaccount.com`,
        snippet: `# AWS IAM Policy with Condition Keys (Least Privilege)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::company-prod-data",
        "arn:aws:s3:::company-prod-data/*"
      ],
      "Condition": {
        "Bool": { "aws:SecureTransport": "true" },
        "IpAddress": { "aws:SourceIp": "192.0.2.0/24" }
      }
    }
  ]
}`,
        docLink: 'https://docs.aws.amazon.com/iam/'
      },
      {
        id: 'vpc-cloud-networking',
        title: '2. Enterprise Virtual Networking & Hybrid Connectivity',
        category: 'Networking',
        description: 'VPC/VNet Peering, AWS Transit Gateway, GCP Shared VPC, Azure ExpressRoute / Direct Connect, VPN IPSec.',
        concepts: [
          'Subnet Design & CIDR Overlap Avoidance across Multi-Region',
          'Private Link / Private Endpoints for S3/GCS/Azure Storage',
          'Transit Gateway / Cloud Router Hub-and-Spoke Architecture',
          'BGP Dynamic Routing over AWS Direct Connect / Azure ExpressRoute'
        ],
        commands: `# Check AWS VPC Route Table entries
aws ec2 describe-route-tables --filters "Name=vpc-id,Values=vpc-0a1b2c3d"

# GCP Cloud Router BGP peer status
gcloud compute routers get-status my-router --region=us-central1`,
        snippet: `# Terraform AWS VPC Module with Multi-AZ Subnets
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.0"

  name = "prod-vpc"
  cidr = "10.100.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.100.1.0/24", "10.100.2.0/24", "10.100.3.0/24"]
  public_subnets  = ["10.100.101.0/24", "10.100.102.0/24", "10.100.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false
  enable_dns_hostnames = true
}`,
        docLink: 'https://aws.amazon.com/vpc/'
      },
      {
        id: 'high-availability-dr',
        title: '3. High Availability, Disaster Recovery & Multi-Region',
        category: 'Resilience',
        description: 'Active-Active vs Active-Passive DR, RTO/RPO metrics, Global Load Balancing (Route53, Cloud DNS, Traffic Manager).',
        concepts: [
          'Recovery Time Objective (RTO) vs Recovery Point Objective (RPO)',
          'Database Multi-Region Replication (Aurora Global Database, Spanner, Cosmos DB Multi-Master)',
          'Global DNS Failover Routing with Health Checks',
          'Cross-Region S3 / Blob Replication & Backup Vault Policies'
        ],
        commands: `# Force AWS Route53 Failover Health Check status test
aws route53 get-health-check-status --health-check-id 12345678-1234-1234-1234-123456789012`,
        snippet: `# AWS Aurora Global Database Cluster Config (Terraform)
resource "aws_rds_global_cluster" "global_db" {
  global_cluster_identifier = "global-ecommerce-db"
  engine                    = "aurora-postgresql"
  engine_version            = "15.4"
  database_name             = "ecommerce"
}`,
        docLink: 'https://aws.amazon.com/disaster-recovery/'
      }
    ]
  },
  {
    id: 'sre-track',
    title: 'Site Reliability Engineering (SRE) Roadmap',
    subtitle: 'Focus on reliability, error budgets, chaos engineering, incident response, and performance tuning.',
    icon: 'ShieldCheck',
    color: '#10b981',
    badge: 'Reliability Track',
    nodes: [
      {
        id: 'slos-error-budgets',
        title: '1. SLOs, SLIs & Error Budgets',
        category: 'Service Standards',
        description: 'Defining 99.99% availability goals, measuring HTTP latency & success ratios, managing release velocity with error budget burn rates.',
        concepts: [
          'SLI (Service Level Indicator) = Good Requests / Total Requests',
          'SLO (Service Level Objective) Target = e.g., 99.9% over 30 days',
          'Error Budget Burn Rate Alerts (Fast Burn vs Slow Burn)',
          'Freezing deployments when Error Budget is depleted'
        ],
        commands: `# Query PromQL to calculate 30-day availability SLI
100 * (sum(rate(http_requests_total{status=~"2..|3.."}[30d])) / sum(rate(http_requests_total[30d])))`,
        snippet: `# Sloth Prometheus SLO Definition YAML
version: "prometheus/v1"
service: "payment-api"
slos:
  - name: "requests-availability"
    objective: 99.9
    description: "Successful HTTP status responses (non-5xx)"
    sli:
      events:
        error_query: sum(rate(http_requests_total{job="payment-api",status=~"5.."}[{{.window}}]))
        total_query: sum(rate(http_requests_total{job="payment-api"}[{{.window}}]))
    alerting:
      name: "PaymentApiAvailabilitySLO"
      labels:
        tier: "critical"`,
        docLink: 'https://sre.google/sre-book/table-of-contents/'
      },
      {
        id: 'chaos-engineering',
        title: '2. Chaos Engineering & Incident Post-Mortems',
        category: 'Resilience Testing',
        description: 'Chaos Mesh, LitmusChaos, Gremlin, injecting network latency, pod kills, region outages, writing blameless post-mortems.',
        concepts: [
          'Hypothesis-driven resilience experiments',
          'Simulating Random Pod Deletions & High Memory Pressure',
          'Blameless Post-Mortem Templates & Root Cause Analysis (5 Whys)',
          'Action Items & Remediation tracking'
        ],
        commands: `# LitmusChaos - Inject random network packet loss on target pod
kubectl apply -f https://hub.litmuschaos.io/api/chaos/1.7.0?file=charts/generic/pod-network-loss/experiment.yaml`,
        snippet: `# Blameless Post-Mortem Incident Template
# Incident Summary: [2026-08-14] Payment Gateway 504 Gateway Timeout
## Timeline (UTC)
- 14:02 - Alert triggered: Payment API HTTP 5xx rate > 8%
- 14:05 - On-call SRE paged via PagerDuty
- 14:12 - Identified DB connection pool exhaustion due to slow query
- 14:20 - Hotfix deployed: Scaled DB connections & restarted app pods
- 14:25 - Recovery confirmed. Error rate back to 0.01%

## Root Cause
A missing database index on 'transactions.user_id' caused full table scans under spike traffic.

## Action Items
- [ ] Add missing composite index to DB schema (Owner: DB Team, Due: Aug 16)
- [ ] Implement Circuit Breaker pattern with Sentinel / Resilience4j (Owner: App Team)`,
        docLink: 'https://chaos-mesh.org/docs/'
      }
    ]
  }
];
