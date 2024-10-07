pipeline {
    agent any

    environment {
        registry = "sumit246/sumit-aws"
        registryCredential = 'DockerHub_ID'  // Jenkins credential ID for Docker Hub
        dockerImage = ''  // Will store the Docker image reference
        containerName = 'sumit'  // App container name
        appPort = '3000'  // Application port mapping
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Clone the specified branch from GitHub
                    git branch: 'main', url: 'https://github.com/sumit-linearloop/CI-CD.git'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image and tag it with both the BUILD_NUMBER and latest
                    dockerImage = docker.build("${registry}:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push Docker image to Docker Hub using Jenkins credentials
                    docker.withRegistry('https://index.docker.io/v1/', registryCredential) {
                        dockerImage.push()  // Push with BUILD_NUMBER tag
                        dockerImage.push('latest')  // Push with 'latest' tag
                    }
                }
            }
        }

        stage('Cleanup Old Containers and Images') {
            steps {
                script {
                    // Stop and remove old container if it exists
                    sh """
                    if [ \$(docker ps -q -f name=${containerName}) ]; then
                        echo "Stopping and removing old container..."
                        docker stop ${containerName}
                        docker rm ${containerName}
                    fi
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Run the newly built Docker image
                    sh """
                    docker run -d --name ${containerName} -p ${appPort}:${appPort} ${registry}:${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Clean Up Old Docker Images') {
            steps {
                script {
                    // Clean up dangling or old images to free up space
                    sh """
                    docker image prune -f
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Post-build actions for cleanup
                sh """
                docker system prune -f --volumes
                """
            }
        }
    }
}
