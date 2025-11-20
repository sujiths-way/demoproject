pipeline {
    agent any

    environment {
        GIT_REPO = "https://github.com/sujiths-way/demoproject.git"
        DOCKER_IMAGE = "sujithway/demoproject"
    }

    stages {

        stage('Checkout Code') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', 
                                                 usernameVariable: 'GIT_USERNAME', 
                                                 passwordVariable: 'GIT_PASSWORD')]) {
                    git url: GIT_REPO, branch: 'main', credentialsId: 'github-token'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'USERNAME',
                                                 passwordVariable: 'PASSWORD')]) {
                    sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh "docker push ${DOCKER_IMAGE}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Stop & remove old container if exists
                    sh "docker rm -f demoproject || true"

                    // Run latest container
                    sh "docker run -d --name demoproject -p 3000:3000 ${DOCKER_IMAGE}"
                }
            }
        }
    }
}
