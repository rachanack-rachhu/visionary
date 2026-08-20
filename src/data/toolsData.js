export const toolsCategories = [
  'All Categories',
  'Containers',
  'Orchestration',
  'IaC',
  'CI/CD',
  'Config & Secrets',
  'Observability',
  'Security'
];

export const toolsData = [
  {
    id: 'docker',
    name: 'Docker & BuildKit',
    category: 'Containers',
    badge: 'Docker',
    description: 'Enterprise containerization engine for packaging applications into lightweight isolated containers.',
    install: `# Ubuntu / Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# macOS via Brew
brew install --cask docker

# Windows PowerShell
winget install Docker.DockerDesktop`,
    cheatSheet: `# Build & Run container on port 8080
docker build -t app:v1 .
docker run -d -p 8080:8080 --name myapp app:v1

# Inspect container logs in real time
docker logs -f myapp

# Execute bash inside container
docker exec -it myapp /bin/sh`,
    templateTitle: 'Production Multi-Stage Dockerfile',
    templateLanguage: 'dockerfile',
    templateCode: `# Stage 1: Build Application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Distroless Minimal Execution Runtime
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER nonroot:nonroot
EXPOSE 3000
CMD ["dist/server.js"]`
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes (kubectl)',
    category: 'Orchestration',
    badge: 'K8s',
    description: 'Production-grade container orchestration system for automating deployment, scaling, and management.',
    install: `# Install kubectl CLI
# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# macOS
brew install kubectl`,
    cheatSheet: `# Fast resource status check
kubectl get pods -A -o wide
kubectl get nodes -o wide

# Port-forward service to local machine
kubectl port-forward svc/my-service 8080:80 -n prod

# Scale deployment replicas
kubectl scale deployment/web-app --replicas=5 -n prod`,
    templateTitle: 'Kubernetes Deployment & Service Manifest',
    templateLanguage: 'yaml',
    templateCode: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-api
  namespace: production
  labels:
    app: web-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-api
  template:
    metadata:
      labels:
        app: web-api
    spec:
      containers:
      - name: api
        image: ghcr.io/company/api:v1.4.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "200m"
            memory: "256Mi"
          limits:
            cpu: "1000m"
            memory: "1Gi"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: web-api-service
  namespace: production
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: web-api`
  },
  {
    id: 'terraform',
    name: 'Terraform & OpenTofu',
    category: 'IaC',
    badge: 'Terraform',
    description: 'Declarative Infrastructure as Code tool for provisioning resources across AWS, GCP, Azure, and Kubernetes.',
    install: `# Ubuntu / Debian (HashiCorp repo)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform`,
    cheatSheet: `# Standard Terraform Workflow
terraform init
terraform fmt -recursive
terraform validate
terraform plan -out=main.tfplan
terraform apply main.tfplan`,
    templateTitle: 'AWS Multi-AZ VPC & EC2 Cluster Terraform Module',
    templateLanguage: 'hcl',
    templateCode: `terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "prod-vpc"
    Environment = "production"
  }
}`
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions CI/CD',
    category: 'CI/CD',
    badge: 'DevOps',
    description: 'Automate, customize, and execute software development workflows right in your GitHub repository.',
    install: '# No installation required - built into GitHub. For local testing use act:\nbrew install act',
    cheatSheet: `# Run GitHub Actions locally with act
act -l
act push -j build-and-test`,
    templateTitle: 'Production GitHub Actions Workflow',
    templateLanguage: 'yaml',
    templateCode: `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test

  deploy-prod:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to EKS
        run: |
          aws eks update-kubeconfig --name prod-cluster
          kubectl rollout restart deployment/web-api -n production`
  },
  {
    id: 'prometheus-grafana',
    name: 'Prometheus & Grafana',
    category: 'Observability',
    badge: 'K8s',
    description: 'Metrics collection engine and high-performance visualization analytics platform.',
    install: `# Install Prometheus via Helm on Kubernetes
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --create-namespace`,
    cheatSheet: `# Useful PromQL Queries:
# HTTP 5xx Error Rate % over 5m
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100

# Pod CPU usage in cores
sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod)`,
    templateTitle: 'Prometheus Operator ServiceMonitor Spec',
    templateLanguage: 'yaml',
    templateCode: `apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: web-api-monitor
  namespace: production
  labels:
    release: kube-prometheus-stack
spec:
  selector:
    matchLabels:
      app: web-api
  endpoints:
  - port: metrics
    path: /metrics
    interval: 15s`
  }
];
