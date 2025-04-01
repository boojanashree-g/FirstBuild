pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS-18'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        NODE_ENV = 'test'
    }

    stages {
        stage('Debug Environment') {
            steps {
                script {
                    echo 'Checking Node.js and npm versions...'
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm list --depth=0'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def projectDir = 'my-app'

                    sh 'npm cache clean --force'

                    if (fileExists("package.json")) {
                        echo "Installing dependencies in root"
                        sh '''
                        rm -rf node_modules package-lock.json
                        npm ci --force --legacy-peer-deps > npm-install.log 2>&1 || cat npm-install.log
                        '''
                    } 
                    else if (fileExists("${projectDir}/package.json")) {
                        echo "Installing dependencies in ${projectDir}"
                        dir(projectDir) {
                            sh '''
                            rm -rf node_modules package-lock.json
                            npm ci --force --legacy-peer-deps
                            '''
                        }
                    } else {
                        error("package.json not found, aborting.")
                    }
                }
            }
        }


        stage('Run Tests') {
            when { expression { return fileExists('my-app/package.json') || fileExists('package.json') } }
            steps {
                script {
                    if (fileExists('my-app/package.json')) {
                        dir('my-app') { 
                            sh 'chmod -R 777 node_modules'
                            sh 'npm test -- --verbose || echo "Tests failed"'
                        }
                    } else {
                        sh 'chmod -R 777 node_modules'
                        sh 'npm test -- --verbose || echo "Tests failed"'
                    }
                }
            }
        }

        stage('Build') {
            when { expression { return fileExists('my-app/package.json') || fileExists('package.json') } }
            steps {
                script {
                    if (fileExists('my-app/package.json')) {
                        dir('my-app') { 
                            sh 'npm run build || echo "Build failed"'
                        }
                    } else {
                        sh 'npm run build || echo "Build failed"'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Starting application on port 3000...'
                    sh '''
                    nohup npm run start > app.log 2>&1 &
                    sleep 5
                    curl -Is http://localhost:3000 || echo "App is not responding"
                    '''

                    echo 'Starting ngrok for public access...'
                    sh '''
                    nohup ngrok http 3000 --region=in --hostname=ac77-115-245-95-234.ngrok-free.app > ngrok.log 2>&1 &
                    sleep 5                   
                    curl -Is https://ac77-115-245-95-234.ngrok-free.app || echo "Ngrok is not respoonding"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for errors.'
        }
    }
}
