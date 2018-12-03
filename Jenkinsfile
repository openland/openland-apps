pipeline {
  agent any
  stages {
    stage('Build and Test') {
      parallel {
        stage('Build') {
          steps {
            sh 'yarn install'
            sh 'yarn bundle'
            sh 'sudo docker build -f Dockerfile.runner'
          }
        }
        stage('Test') {
          steps {
            sh 'yarn install'
            sh 'yarn test'
          }
        }
      }
    }
  }
  triggers {
    pollSCM('H */4 * * 1-5')
  }
}