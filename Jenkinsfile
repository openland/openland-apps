pipeline {
  agent any
  triggers {
    pollSCM('H */4 * * 1-5')
  }
  stages {
    stage('Build') {
      steps {
        sh 'yarn install'
        sh 'yarn bundle'
      }
    }
  }
}