pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        sh 'rm yarn.lock && yarn install'
      }
    }
  }
}