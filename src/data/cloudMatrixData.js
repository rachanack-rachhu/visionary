export const cloudCategories = [
  'All Categories',
  'Compute & VMs',
  'Kubernetes Engine',
  'Serverless Functions',
  'Serverless Containers',
  'Object Storage',
  'Relational Databases',
  'NoSQL Databases',
  'Virtual Networks',
  'Identity & Access (IAM)',
  'Infrastructure as Code',
  'Load Balancing',
  'Monitoring & Logging',
  'Secrets & Key Vault',
  'Container Registry'
];

export const cloudMatrixData = [
  {
    id: 'compute-vms',
    category: 'Compute & VMs',
    title: 'Virtual Machine Instances',
    description: 'General-purpose, compute-optimized, and memory-optimized virtual machine compute resources.',
    aws: {
      name: 'Amazon EC2',
      badge: 'AWS',
      cli: 'aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name dev-key',
      features: ['Spot Instances (up to 90% discount)', 'Nitro System hardware acceleration', 'Auto Scaling Groups (ASG)']
    },
    gcp: {
      name: 'Google Compute Engine (GCE)',
      badge: 'GCP',
      cli: 'gcloud compute instances create dev-vm --zone=us-central1-a --machine-type=e2-medium --image-family=debian-11',
      features: ['Spot VMs with preemptible discounts', 'Custom Machine Types (exact CPU/RAM choice)', 'Live Migration during host updates']
    },
    azure: {
      name: 'Azure Virtual Machines',
      badge: 'Azure',
      cli: 'az vm create --resource-group myRG --name myVM --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys',
      features: ['Azure Spot Virtual Machines', 'Virtual Machine Scale Sets (VMSS)', 'Accelerated Networking with SR-IOV']
    },
    terraform: `resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = { Name = "WebWorker" }
}`
  },
  {
    id: 'kubernetes-engine',
    category: 'Kubernetes Engine',
    title: 'Managed Kubernetes Service',
    description: 'Fully managed Kubernetes control plane and node pool lifecycle management.',
    aws: {
      name: 'Amazon EKS',
      badge: 'AWS',
      cli: 'aws eks update-kubeconfig --name prod-cluster --region us-east-1',
      features: ['Fargate serverless pod execution', 'AWS VPC CNI for native pod IP addressing', 'Karpenter autoscaler support']
    },
    gcp: {
      name: 'Google Kubernetes Engine (GKE)',
      badge: 'GCP',
      cli: 'gcloud container clusters get-credentials prod-cluster --region=us-central1',
      features: ['GKE Autopilot (fully managed pods & nodes)', 'Native Multi-Cluster Services', 'Integrated Binary Authorization']
    },
    azure: {
      name: 'Azure Kubernetes Service (AKS)',
      badge: 'Azure',
      cli: 'az aks get-credentials --resource-group myRG --name prodAKS',
      features: ['Azure CNI overlay & Cilium integration', 'Azure Entra ID Workload Identity', 'Keda event-driven autoscaling']
    },
    terraform: `# GKE Cluster Example
resource "google_container_cluster" "primary" {
  name     = "gke-production"
  location = "us-central1"
  enable_autopilot = true
}`
  },
  {
    id: 'serverless-functions',
    category: 'Serverless Functions',
    title: 'Event-Driven Serverless Code Execution',
    description: 'Run code without provisioning or managing servers, billed down to the millisecond.',
    aws: {
      name: 'AWS Lambda',
      badge: 'AWS',
      cli: 'aws lambda invoke --function-name MyHandler output.json',
      features: ['Lambda SnapStart for fast Java cold starts', 'Function URLs for direct HTTP endpoints', 'Event Source Mapping (SQS, DynamoDB, Kinesis)']
    },
    gcp: {
      name: 'Google Cloud Functions (2nd Gen)',
      badge: 'GCP',
      cli: 'gcloud functions deploy my-fn --gen2 --runtime=nodejs20 --entry-point=helloWorld --trigger-http',
      features: ['Built on Cloud Run infrastructure', 'Up to 60 minute execution limit', 'Eventarc integrations with 90+ GCP services']
    },
    azure: {
      name: 'Azure Functions',
      badge: 'Azure',
      cli: 'az functionapp create --resource-group myRG --consumption-plan-location eastus --runtime node --functions-version 4 --name myFnApp',
      features: ['Durable Functions for stateful workflows', 'Rich triggers & bindings (Blob, Cosmos, Service Bus)', 'Flex Consumption Plan']
    },
    terraform: `resource "aws_lambda_function" "test_lambda" {
  filename      = "lambda_function_payload.zip"
  function_name = "api_handler"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
}`
  },
  {
    id: 'serverless-containers',
    category: 'Serverless Containers',
    title: 'Serverless Container Applications',
    description: 'Deploy stateless HTTP containerized microservices directly from container images without managing Kubernetes clusters.',
    aws: {
      name: 'AWS Fargate / ECS App Runner',
      badge: 'AWS',
      cli: 'aws ecs run-task --cluster prod-cluster --task-definition web-app:1 --launch-type FARGATE',
      features: ['No server management required', 'Seamless IAM Role for Tasks', 'Integrated ALB auto-scaling']
    },
    gcp: {
      name: 'Google Cloud Run',
      badge: 'GCP',
      cli: 'gcloud run deploy web-service --image=gcr.io/my-proj/app:v1 --platform=managed --region=us-central1 --allow-unauthenticated',
      features: ['Scale to 0 instances instantly', 'Automatic HTTPS domain provision', 'WebSockets and gRPC support out of the box']
    },
    azure: {
      name: 'Azure Container Apps (ACA)',
      badge: 'Azure',
      cli: 'az containerapp create --name my-app --resource-group myRG --environment myAppEnv --image mcr.microsoft.com/azuredocs/aci-helloworld:latest',
      features: ['Built on Kubernetes + KEDA + Dapr', 'Microservice revision management', 'Internal ingress routing']
    },
    terraform: `resource "google_cloud_run_v2_service" "default" {
  name     = "cloudrun-service"
  location = "us-central1"
  template {
    containers {
      image = "gcr.io/google-samples/hello-app:1.0"
    }
  }
}`
  },
  {
    id: 'object-storage',
    category: 'Object Storage',
    title: 'Scalable Blob & Object Storage',
    description: 'Store static assets, backups, data lakes, and media files with 99.999999999% (11 9s) durability.',
    aws: {
      name: 'Amazon S3',
      badge: 'AWS',
      cli: 'aws s3 sync ./assets s3://my-bucket-name/assets --acl private',
      features: ['S3 Intelligent-Tiering auto-cost reduction', 'S3 Object Lock for WORM compliance', 'Multi-Region Access Points']
    },
    gcp: {
      name: 'Google Cloud Storage (GCS)',
      badge: 'GCP',
      cli: 'gsutil rsync -r ./dist gs://my-gcp-bucket/',
      features: ['Dual-region & Multi-region bucket replication', 'Bucket Lock retention policies', 'Autoclass lifecycle rules']
    },
    azure: {
      name: 'Azure Blob Storage',
      badge: 'Azure',
      cli: 'az storage blob upload-batch -d mycontainer -s ./localpath --account-name mystorageaccount',
      features: ['Immutable Blob Storage', 'Blob lifecycle management (Hot, Cool, Cold, Archive)', 'Azure Data Lake Storage Gen2 (ADLS)']
    },
    terraform: `resource "aws_s3_bucket" "b" {
  bucket = "company-prod-media-assets-2026"
}

resource "aws_s3_bucket_versioning" "versioning_example" {
  bucket = aws_s3_bucket.b.id
  versioning_configuration {
    status = "Enabled"
  }
}`
  },
  {
    id: 'relational-db',
    category: 'Relational Databases',
    title: 'Managed SQL Databases (PostgreSQL, MySQL, SQL Server)',
    description: 'Fully managed relational database engines with automated backups, multi-AZ failover, and point-in-time recovery.',
    aws: {
      name: 'Amazon RDS / Aurora',
      badge: 'AWS',
      cli: 'aws rds describe-db-instances --db-instance-identifier prod-db',
      features: ['Aurora Serverless v2 auto-scaling', 'Global Database cross-region replication', 'RDS Multi-AZ with 2 readable standbys']
    },
    gcp: {
      name: 'Google Cloud SQL / Cloud Spanner',
      badge: 'GCP',
      cli: 'gcloud sql instances create prod-pg --database-version=POSTGRES_15 --cpu=4 --memory=16GiB --region=us-central1',
      features: ['Cloud Spanner globally distributed SQL with strong consistency', 'Cloud SQL Insights query performance analyzer', 'Automatic failover replicas']
    },
    azure: {
      name: 'Azure SQL Database / DB for PostgreSQL',
      badge: 'Azure',
      cli: 'az postgres flexible-server create --resource-group myRG --name mypgserver --location eastus',
      features: ['Serverless compute tier with auto-pause', 'Hyper-scale tier up to 100TB', 'Azure Defender for SQL threat detection']
    },
    terraform: `resource "google_sql_database_instance" "main" {
  name             = "prod-db-instance"
  database_version = "POSTGRES_15"
  region           = "us-central1"
  settings {
    tier = "db-custom-4-16384"
  }
}`
  }
];
