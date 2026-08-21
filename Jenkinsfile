pipeline {
    agent { label 'docker' }

    environment {
        PROJECT_ID = 'project-903506bd-f865-4325-92d'
        REGION = 'asia-south1'
        ARTIFACT_REPO = 'visionary'
        IMAGE_NAME = 'devops-cloud-hub'
        GITHUB_REPO = 'rachanack-rachhu/visionary'
        GIT_BRANCH = 'dev'
        GCP_KEY_CREDENTIAL = 'gcp-sa-key'
        GITHUB_CREDENTIAL = 'github-token'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate application') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
                sh 'npm run lint'
            }
        }

        stage('Build and push image') {
            steps {
                script {
                    env.IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
                    def image = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${ARTIFACT_REPO}/${IMAGE_NAME}:${env.IMAGE_TAG}"

                    withCredentials([file(credentialsId: GCP_KEY_CREDENTIAL, variable: 'GCP_KEY')]) {
                        sh """
                            set -eu
                            gcloud auth activate-service-account --key-file=\"\$GCP_KEY\"
                            gcloud config set project \"${PROJECT_ID}\"
                            gcloud auth configure-docker \"${REGION}-docker.pkg.dev\" --quiet
                            docker build --tag \"${image}\" .
                            docker push \"${image}\"
                        """
                    }
                }
            }
        }

        stage('Update Helm image tag') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: GITHUB_CREDENTIAL,
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_PASS'
                    )]) {
                        sh '''
                            set -eu
                            git config user.email "jenkins@visionary.work.gd"
                            git config user.name "Jenkins CI"
                            sed -i -E "s|^  tag:.*|  tag: \\\"${IMAGE_TAG}\\\"|" charts/devops-cloud-hub/values.yaml
                            git add charts/devops-cloud-hub/values.yaml
                            git commit -m "ci: update image to ${IMAGE_TAG} [skip ci]" || exit 0
                            AUTH=$(printf '%s:%s' "$GIT_USER" "$GIT_PASS" | base64 | tr -d '\\n')
                            git -c "http.extraheader=Authorization: Basic $AUTH" \\
                                push "https://github.com/${GITHUB_REPO}.git" "HEAD:${GIT_BRANCH}"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Image pushed and Helm values updated. ArgoCD should deploy the new revision.'
        }
        failure {
            echo 'Jenkins pipeline failed.'
        }
    }
}
