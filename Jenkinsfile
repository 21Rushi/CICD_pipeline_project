pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/21Rushi/CICD_pipeline_project.git'
            }
        }

        stage('Install Backend Dependencies') {
    steps {
        dir('Flask-backend') {
            sh '''
            pip3 install --break-system-packages -r requirements.txt
            '''
        }
    }
}

        stage('Install Frontend Dependencies') {
            steps {
                dir('Express-frontend') {
                    sh '''
                    npm install
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir('Flask-backend') {
                    sh '''
                    pm2 restart flask-backend || \
                    pm2 start app.py \
                    --interpreter python3 \
                    --name flask-backend
                    '''
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                dir('Express-frontend') {
                    sh '''
                    pm2 restart express-frontend || \
                    pm2 start npm \
                    --name express-frontend \
                    -- start
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
