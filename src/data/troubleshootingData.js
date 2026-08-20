export const troubleshootingCategories = [
  'All Technologies',
  'Kubernetes',
  'Docker',
  'AWS',
  'GCP',
  'Azure',
  'Terraform',
  'Linux System',
  'CI/CD Pipelines'
];

export const troubleshootingData = [
  {
    id: 'k8s-crashloopbackoff',
    category: 'Kubernetes',
    severity: 'High',
    title: 'Pod Status: CrashLoopBackOff',
    symptom: 'Pod fails continuously shortly after startup, resulting in increasing restart backoff delays.',
    rootCause: 'Uncaught application panic/exception, missing environment variables, failing Liveness/Readiness probe, or incorrect entrypoint script permissions.',
    diagnostics: `# Step 1: Check Pod status & restart count
kubectl get pod <pod-name> -n <namespace>

# Step 2: Fetch previous crashed container logs
kubectl logs <pod-name> -n <namespace> --previous --tail=100

# Step 3: Inspect Pod event stream & exit code
kubectl describe pod <pod-name> -n <namespace> | grep -A 10 "Last State:"`,
    resolution: `1. Check Exit Code in "kubectl describe pod":
   - Exit Code 137: Pod killed by OOMKiller (Increase memory limits).
   - Exit Code 1: Application crash / uncaught exception (Check app logs).
   - Exit Code 126/127: Command or entrypoint binary not found in container.

2. Verify Environment Variables & Secrets:
   kubectl get configmap <cm-name> -o yaml
   kubectl get secret <secret-name> -o yaml

3. Test running container interactively (override entrypoint to sh):
   kubectl debug -it <pod-name> --image=busybox --target=<container-name>`,
    prevention: 'Set realistic livenessProbe initialDelaySeconds (e.g. 15s) and implement graceful shutdown handling for SIGTERM in your app.'
  },
  {
    id: 'k8s-oomkilled',
    category: 'Kubernetes',
    severity: 'Critical',
    title: 'Pod Status: OOMKilled (Exit Code 137)',
    symptom: 'Linux kernel Out-Of-Memory killer terminates the container because memory consumption exceeds the defined cgroup memory limit.',
    rootCause: 'Application memory leak, unoptimized heap allocations (Node.js/Java JVM default max heap > container memory limit), or insufficient cgroup memory limit.',
    diagnostics: `# Check if container was terminated with OOMKilled flag
kubectl get pod <pod-name> -o jsonpath='{.status.containerStatuses[*].lastState.terminated.reason}'

# View live node memory pressure
kubectl top pods -n <namespace> --sort-by=memory
kubectl top nodes`,
    resolution: `1. Increase container memory requests and limits in Deployment YAML:
   resources:
     requests:
       memory: "512Mi"
     limits:
       memory: "2Gi"

2. For Java applications: Set JVM explicit MaxRAMPercentage:
   env:
     - name: JAVA_TOOL_OPTIONS
       value: "-XX:MaxRAMPercentage=75.0"

3. For Node.js applications: Set V8 heap allocation limit:
   NODE_OPTIONS="--max-old-space-size=1536"`,
    prevention: 'Configure Horizontal Pod Autoscaler (HPA) based on memory/CPU metrics and run memory profilers during stress testing.'
  },
  {
    id: 'k8s-imagepullbackoff',
    category: 'Kubernetes',
    severity: 'High',
    title: 'Pod Status: ImagePullBackOff / ErrImagePull',
    symptom: 'Kubernetes kubelet cannot download the specified container image from the registry.',
    rootCause: 'Incorrect image tag/digest, private container registry requiring imagePullSecrets, expired registry credentials, or network firewall blocking registry domain.',
    diagnostics: `# View exact image pull failure reason
kubectl describe pod <pod-name> -n <namespace> | grep -A 5 "Events:"`,
    resolution: `1. Verify image exists in registry:
   docker pull ghcr.io/org/app:v1.2.3

2. Create Kubernetes docker-registry secret:
   kubectl create secret docker-registry regcred \
     --docker-server=https://index.docker.io/v1/ \
     --docker-username=<username> \
     --docker-password=<token> \
     --docker-email=<email> -n <namespace>

3. Reference imagePullSecrets in Deployment spec:
   spec:
     imagePullSecrets:
       - name: regcred`,
    prevention: 'Use immutable image tags (semantic versioning or Git SHA) instead of "latest".'
  },
  {
    id: 'aws-iam-access-denied',
    category: 'AWS',
    severity: 'High',
    title: 'AWS Error: AccessDenied (403 Forbidden)',
    symptom: 'AWS API CLI command or SDK call fails with "An error occurred (AccessDenied) when calling the Operation".',
    rootCause: 'Missing IAM permissions, explicit Deny policy in SCP/Permissions Boundary, missing KMS decrypt permission, or S3 bucket policy blocking traffic.',
    diagnostics: `# Decode encoded AWS authorization failure message (if encoded message provided)
aws sts decode-authorization-message --encoded-message <BASE64_MESSAGE> --query DecodedMessage --output text | jq .

# Test current caller identity
aws sts get-caller-identity`,
    resolution: `1. Verify attached IAM policies for user/role:
   aws iam list-attached-role-policies --role-name <RoleName>

2. Check if S3 bucket policy or KMS key policy contains explicit DENY:
   aws s3api get-bucket-policy --bucket <bucket-name>

3. Ensure IAM role trust policy allows the assuming principal:
   aws iam get-role --role-name <RoleName> --query 'Role.AssumeRolePolicyDocument'`,
    prevention: 'Use AWS IAM Policy Simulator before deploying IAM changes and adopt Workload Identity OIDC for pipelines.'
  },
  {
    id: 'gcp-quota-exceeded',
    category: 'GCP',
    severity: 'Medium',
    title: 'GCP Error: QUOTA_EXCEEDED',
    symptom: 'Creating GCE instance or GKE node pool fails with "Quota EXCEEDED for metric: CPUs / Disks / In-use IP addresses".',
    rootCause: 'Project regional resource quota limit reached.',
    diagnostics: `# List current quota usage in target GCP region
gcloud compute project-info describe --project=<project-id> --format="yaml(quotas)"`,
    resolution: `1. Identify unused resources to delete:
   gcloud compute instances list --filter="status=TERMINATED"
   gcloud compute disks list --filter="-users:*"

2. Request Quota Increase via GCP Console or CLI:
   gcloud alpha quotas requests create --service=compute.googleapis.com --metric=CPUS --unit=count --dimensions=region=us-central1 --value=100`,
    prevention: 'Set up GCP Quota alerts in Cloud Monitoring to notify SRE teams when usage reaches 80% of limit.'
  },
  {
    id: 'tf-state-lock-error',
    category: 'Terraform',
    severity: 'High',
    title: 'Terraform Error: Error acquiring the state lock',
    symptom: 'Terraform plan/apply fails with "Error acquiring the state lock: ConditionalCheckFailedException" (DynamoDB or GCS lock).',
    rootCause: 'Previous terraform run crashed unexpectedly, or another pipeline build is currently running on the same state file.',
    diagnostics: `# Check if another CI pipeline job is running
# Inspect lock details printed in Terraform output:
# Lock Info:
#   ID:        e4b5c7d8-1234-5678-90ab-cdef12345678
#   Path:      my-bucket/terraform.tfstate
#   Operation: OperationTypePlan
#   Who:       runner@github-actions`,
    resolution: `1. FIRST: Ensure NO other team member or pipeline job is currently running terraform.

2. Force unlock the state by ID (Use lock ID from error log):
   terraform force-unlock e4b5c7d8-1234-5678-90ab-cdef12345678

3. Verify state integrity:
   terraform state list`,
    prevention: 'Set appropriate pipeline timeouts and avoid cancelling running Terraform apply commands abruptly.'
  }
];
