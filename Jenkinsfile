pipeline {
    agent any

    environment {
        PROJECT_ID          = 'project-903506bd-f865-4325-92d'
        REGION              = 'asia-south1'
        ARTIFACT_REPO       = 'visionary'
        IMAGE_NAME          = 'devops-cloud-hub'
        GITHUB_REPO         = 'rachanack-rachhu/visionary'
        GIT_BRANCH          = 'dev'

        FULL_IMAGE          = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${ARTIFACT_REPO}/${IMAGE_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    def imageTag = "${env.BUILD_NUMBER}"
                    env.IMAGE_TAG = imageTag

                    withCredentials([file(credentialsId: 'gcp-sa-key', variable: 'GCP_KEY')]) {
                        sh """
                            gcloud auth activate-service-account --key-file=\$GCP_KEY
                            gcloud config set project ${PROJECT_ID}
                            gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet
                        """
                    }

                    sh """
                        docker build -t ${FULL_IMAGE}:${IMAGE_TAG} .
                        docker push ${FULL_IMAGE}:${IMAGE_TAG}
                        echo "✅ Image pushed successfully → ${FULL_IMAGE}:${IMAGE_TAG}"
                    """
                }
            }
        }

        stage('Update Helm values.yaml') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                        sh """
                            git config user.email "jenkins@visionary.work.gd"
                            git config user.name "Jenkins CI"

                            # Update image tag
                            sed -i 's|tag:.*|tag: "${IMAGE_TAG}"|' charts/devops-cloud-hub/values.yaml

                            git add charts/devops-cloud-hub/values.yaml
                            git commit -m "ci: update image to ${IMAGE_TAG} [skip ci]" || echo "No changes to commit"
                            git push https://x-access-token:\${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git HEAD:${GIT_BRANCH}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully! ArgoCD will now deploy the new version."
        }
        failure {
            echo "❌ Pipeline failed. Please check the logs."
        }
    }
}
