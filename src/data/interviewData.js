export const interviewCategories = [
  'All Levels',
  'Junior DevOps',
  'Mid DevOps / Cloud',
  'Senior DevOps / SRE',
  'Lead Cloud Architect'
];

export const interviewQuestionsData = [
  {
    id: 'q-k8s-pod-lifecycle',
    level: 'Mid DevOps / Cloud',
    category: 'Kubernetes',
    question: 'What happens step-by-step when you run "kubectl apply -f deployment.yaml"?',
    answer: `1. **Client Side & Authentication**: \`kubectl\` parses the YAML, validates client schema, authenticates using kubeconfig credentials, and sends an HTTP POST/PUT request to \`kube-apiserver\`.
2. **APIServer Validation & Admission Control**:
   - Authentication & Authorization (RBAC check).
   - Mutating Admission Webhooks (e.g. injecting sidecars like Istio/Vault).
   - Validating Admission Webhooks (verifying policy compliance).
   - Persists object spec to **etcd** data store.
3. **Deployment Controller**: The \`kube-controller-manager\` notices the updated Deployment object in etcd, creates or updates the **ReplicaSet**.
4. **ReplicaSet Controller**: Creates the specified number of **Pod** objects in "Pending" status.
5. **Scheduler**: \`kube-scheduler\` inspects unassigned pods, evaluates node filtering (taints/tolerations, affinity, resource requests), and assigns each Pod to a target Worker Node (nodeName).
6. **Kubelet & Container Runtime**: Kubelet on the selected worker node detects the pod binding, calls CNI to allocate Pod IP, pulls container images from registry, and invokes Containerd/CRI-O to start containers.
7. **Probes**: Kubelet runs Readiness & Liveness probes. Once Readiness passes, Kubelet updates EndpointSlice so Service/Ingress begins routing live traffic.`,
    codeSnippet: `# Trace K8s API events live
kubectl get events -w --sort-by='.metadata.creationTimestamp'`
  },
  {
    id: 'q-terraform-drift',
    level: 'Senior DevOps / SRE',
    category: 'Terraform',
    question: 'How do you detect and handle Terraform State Drift in automated CI/CD pipelines?',
    answer: `**State Drift** occurs when cloud resources are modified outside of Terraform (via Cloud Console, AWS CLI, or manual hotfixes).

**Detection Strategy**:
1. Schedule a daily cron job running \`terraform plan -detailed-exitcode\`:
   - Exit code 0: No changes.
   - Exit code 1: Error during planning.
   - Exit code 2: State drift detected!
2. Pipe alerts to Slack / PagerDuty with the drift diff output.

**Resolution Workflow**:
- **Option A (Revert Manual Changes)**: Run \`terraform apply\` to enforce the declared state and overwrite manual console changes.
- **Option B (Import / Adopt Drift)**: Update local \`.tf\` code to match reality, then run \`terraform refresh\` or \`terraform import\` so state reflects the update without destroying resources.`,
    codeSnippet: `# GitHub Actions Cron Workflow for Terraform Drift Detection
name: Daily Drift Check
on:
  schedule:
    - cron: '0 4 * * *' # Every day at 4 AM
jobs:
  drift-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: terraform init
      - run: |
          terraform plan -detailed-exitcode -no-color || exit_code=$?
          if [ $exit_code -eq 2 ]; then
            echo "DRIFT DETECTED!" | mail -s "Alert: TF State Drift" ops@company.com
          fi`
  },
  {
    id: 'q-multi-cloud-vpc-peering',
    level: 'Lead Cloud Architect',
    category: 'Architecture',
    question: 'How do you architect secure private cross-cloud networking between AWS VPC, GCP VPC, and Azure VNet?',
    answer: `Connecting AWS, GCP, and Azure privately without traversing the public internet:

1. **Option 1: Cloud-Exchange Equinix / Megaport Direct Cross-Connect**:
   - Provision **AWS Direct Connect**, **GCP Partner Interconnect**, and **Azure ExpressRoute** into a neutral colocation meet-me room (e.g. Equinix Fabric).
   - Provides sub-5ms latency, encrypted BGP routing, and predictable bandwidth (1Gbps - 100Gbps).

2. **Option 2: High-Availability IPSec VPN Mesh with BGP**:
   - Deploy redundant VPN Gateways in each cloud (AWS Transit Gateway + GCP Cloud Router + Azure Virtual Network Gateway).
   - Configure active-active IPSec tunnels with IKEv2 and BGP dynamic routing.
   - Enforce IP CIDR non-overlapping design:
     - AWS VPC: \`10.100.0.0/16\`
     - GCP VPC: \`10.200.0.0/16\`
     - Azure VNet: \`10.300.0.0/16\`

3. **Security Controls**:
   - Enforce mTLS for intra-service communication via Service Mesh (Istio / Linkerd).
   - Inspect cross-cloud traffic through central firewall appliances (Palo Alto / Fortinet).`,
    codeSnippet: `# Non-overlapping CIDR Architecture Topology
AWS VPC   : 10.100.0.0/16  --- (IPSec / BGP) --- Equinix Fabric Hub
GCP VPC   : 10.200.0.0/16  --- (IPSec / BGP) --- Equinix Fabric Hub
Azure VNet: 10.300.0.0/16  --- (IPSec / BGP) --- Equinix Fabric Hub`
  }
];

export const certificationData = [
  {
    id: 'aws-saa',
    title: 'AWS Certified Solutions Architect – Associate / Professional',
    provider: 'Amazon Web Services',
    badge: 'badge-aws',
    examCode: 'SAA-C03 / SAP-C02',
    topics: [
      'Design Resilient Architectures (Multi-AZ, Auto Scaling, Aurora Global)',
      'Design High-Performing Architectures (S3 Transfer Acceleration, CloudFront)',
      'Design Secure Applications (IAM Least Privilege, KMS, WAF, Shield)',
      'Design Cost-Optimized Architectures (Savings Plans, Spot Instances, S3 Lifecycle)'
    ]
  },
  {
    id: 'gcp-pca',
    title: 'Google Cloud Professional Cloud Architect',
    provider: 'Google Cloud',
    badge: 'badge-gcp',
    examCode: 'GCP-PCA',
    topics: [
      'Designing & Planning Cloud Solution Architecture (GKE, Cloud Run, Spanner)',
      'Managing & Provisioning Cloud Infrastructure (Deployment Manager, Terraform)',
      'Designing for Security & Compliance (Shared Responsibility, Cloud IAM, KMS)',
      'Analyzing & Optimizing Technical & Business Processes (SLO/SLI, Error Budgets)'
    ]
  },
  {
    id: 'azure-solutions',
    title: 'Microsoft Certified: Azure Solutions Architect Expert',
    provider: 'Microsoft Azure',
    badge: 'badge-azure',
    examCode: 'AZ-305',
    topics: [
      'Design Identity, Governance, and Monitoring Solutions (Entra ID, Azure Monitor)',
      'Design Data Storage Solutions (Azure SQL, Cosmos DB, Blob Storage)',
      'Design Business Continuity Solutions (Site Recovery, Regional Failover)',
      'Design Infrastructure Solutions (VMSS, AKS, App Gateway, VNets)'
    ]
  },
  {
    id: 'cncf-cka',
    title: 'CKA (Certified Kubernetes Administrator) & CKS (Security)',
    provider: 'Linux Foundation / CNCF',
    badge: 'badge-k8s',
    examCode: 'CKA / CKS',
    topics: [
      'Storage & Networking (CNI plugins, PVC/PV, Ingress controllers)',
      'Cluster Architecture, Installation & Configuration (kubeadm, etcd backup/restore)',
      'Troubleshooting (Node failure, Pod CrashLoop, Control plane logs)',
      'CKS Security (Falco runtime security, Trivy image scan, RBAC, AppArmor)'
    ]
  }
];
