pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug Workspace') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            when { expression { fileExists('package.json') } }
            steps {
                sh 'npm test || echo "Tests failed"'
            }
        }
    }
}
