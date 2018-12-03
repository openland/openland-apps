pipeline {
  agent any
  stages {
    stage('Build and Test') {
      parallel {
        stage('Build') {
          steps {
            sh 'yarn install'
            sh 'yarn bundle'
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