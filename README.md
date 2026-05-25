# CI/CD Deployment of Flask Backend and Express Frontend on AWS EC2 Using Jenkins

## Project Overview

This project demonstrates the deployment of a Flask backend and an Express frontend on a single Amazon EC2 instance. Jenkins is used to implement a Continuous Integration and Continuous Deployment (CI/CD) pipeline that automatically deploys the latest code whenever changes are pushed to the GitHub repository.

The project includes:

- Flask Backend Application
- Express Frontend Application
- Jenkins CI/CD Pipeline
- GitHub Webhook Integration
- PM2 Process Management
- AWS EC2 Deployment

---

## Architecture

```text
Developer
    |
    v
GitHub Repository
    |
    v
GitHub Webhook
    |
    v
Jenkins Server (Port 8080)
    |
    +------------------------+
    |                        |
    v                        v
Flask Backend           Express Frontend
Port 5000               Port 3000
    |
    +------------------------+
             |
             v
        AWS EC2 Instance
```

---

## Repository Structure

```text
CICD_pipeline_project/
│
├── Flask-backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── Express-frontend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

## Technologies Used

### Cloud Platform
- AWS EC2 (Ubuntu 22.04 LTS)

### Backend
- Python 3
- Flask

### Frontend
- Node.js
- Express.js

### DevOps Tools
- Jenkins
- Git
- GitHub
- PM2

### Operating System
- Ubuntu Linux

---

## EC2 Configuration

### Instance Details

- Instance Type: t2.micro
- Operating System: Ubuntu 22.04 LTS
- Storage: 20 GB

### Security Group Rules

| Port | Service |
|--------|----------|
| 22 | SSH |
| 80 | HTTP |
| 3000 | Express Frontend |
| 5000 | Flask Backend |
| 8080 | Jenkins |

---

## Deployment Steps

### 1. Launch EC2 Instance

- Create an Ubuntu EC2 instance on AWS.
- Configure the required security group ports.
- Connect using SSH.

```bash
ssh -i key.pem ubuntu@<PUBLIC_IP>
```

---

### 2. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

---

### 3. Install Git

```bash
sudo apt install git -y
```

Verify:

```bash
git --version
```

---

### 4. Install Python

```bash
sudo apt install python3 python3-pip python3-venv -y
```

Verify:

```bash
python3 --version
pip3 --version
```

---

### 5. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
```

Verify:

```bash
node -v
npm -v
```

---

### 6. Install PM2

```bash
sudo npm install -g pm2
```

Verify:

```bash
pm2 -v
```

---

## Application Deployment

### Clone Repository

```bash
git clone https://github.com/<your-username>/CICD_pipeline_project.git
```

Move to project directory:

```bash
cd CICD_pipeline_project
```

---

## Flask Backend Deployment

Move to backend directory:

```bash
cd Flask-backend
```

Install dependencies:

```bash
pip3 install -r requirements.txt
```

Start application using PM2:

```bash
pm2 start app.py --interpreter python3 --name flask-backend
```

Verify:

```text
http://<PUBLIC_IP>:5000
```

---

## Express Frontend Deployment

Move to frontend directory:

```bash
cd ../Express-frontend
```

Install dependencies:

```bash
npm install
```

Start application using PM2:

```bash
pm2 start server.js --name express-frontend
```

Verify:

```text
http://<PUBLIC_IP>:3000
```

---

## Jenkins Installation

### Install Java

```bash
sudo apt install openjdk-17-jdk -y
```

Verify:

```bash
java -version
```

---

### Install Jenkins

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update

sudo apt install jenkins -y
```

Start Jenkins:

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

Access Jenkins:

```text
http://<PUBLIC_IP>:8080
```

Retrieve administrator password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## Jenkins Plugins

Installed plugins:

- Git Plugin
- Pipeline Plugin
- NodeJS Plugin
- SSH Agent Plugin

---

## CI/CD Pipeline

### Pipeline Stages

1. Clone Repository
2. Install Flask Dependencies
3. Install Express Dependencies
4. Deploy Flask Backend
5. Deploy Express Frontend

### Jenkinsfile

```groovy
pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/<your-username>/CICD_pipeline_project.git'
            }
        }

        stage('Install Flask Dependencies') {
            steps {
                dir('Flask-backend') {
                    sh 'pip3 install -r requirements.txt'
                }
            }
        }

        stage('Install Express Dependencies') {
            steps {
                dir('Express-frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy Flask') {
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

        stage('Deploy Express') {
            steps {
                dir('Express-frontend') {
                    sh '''
                    pm2 restart express-frontend || \
                    pm2 start server.js \
                    --name express-frontend
                    '''
                }
            }
        }
    }
}
```

---

## GitHub Webhook Configuration

Navigate to:

GitHub Repository → Settings → Webhooks → Add Webhook

### Payload URL

```text
http://<PUBLIC_IP>:8080/github-webhook/
```

### Content Type

```text
application/json
```

### Event

```text
Just the push event
```

Whenever code is pushed to GitHub, Jenkins automatically triggers the deployment pipeline.

---

## CI/CD Workflow

```text
Developer Pushes Code
          |
          v
       GitHub
          |
          v
    GitHub Webhook
          |
          v
       Jenkins
          |
          v
 Clone Latest Repository
          |
          v
 Install Dependencies
          |
          v
 Restart Applications
          |
          v
 Deployment Complete
```

---

## Verification

### Verify Flask Backend

```text
http://<PUBLIC_IP>:5000
```

Expected Output:

```text
Flask Backend Running
```

### Verify Express Frontend

```text
http://<PUBLIC_IP>:3000
```

Expected Output:

```text
Express Frontend Running
```

### Verify PM2 Processes

```bash
pm2 list
```

---

## Screenshots Included

links : https://docs.google.com/document/d/1WzWsH_RI1tVyfW1xaNG5Oo58hhMQgLyEbMeF3Dk6JaM/edit?tab=t.wrz9m7vyus06


### AWS
- Running EC2 Instance

### Application Deployment
- Flask Application Running
- Express Application Running

### Jenkins
- Jenkins Dashboard
- Successful Build Execution
- Pipeline Logs

### GitHub
- Successful Webhook Delivery

### PM2
- Active Process List

---

## Repository

GitHub Repository:

[https://github.com/<your-username>/CICD_pipeline_project](https://github.com/21Rushi/CICD_pipeline_project)

---

## Conclusion

The Flask backend and Express frontend were successfully deployed on a single AWS EC2 instance. Jenkins was configured to automate deployments through a CI/CD pipeline triggered by GitHub webhooks. PM2 ensures both applications remain running and automatically restart when required.

---

## Author

Name: Rushi

Project: CI/CD Deployment Assignment

Date: May 2026
