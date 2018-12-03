pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'rm yarn.lock && yarn install'
        sh 'yarn bundle'
      }
    }
  }
}