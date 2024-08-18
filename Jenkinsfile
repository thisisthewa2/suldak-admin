pipeline {
    agent any
    stages {
        stage('TEST') {
            steps {
                echo 'Hello!'
            }
        }
    }
    post {
        always {
            // Clean up actions that should always be performed after build, like sending notifications
            echo 'Cleaning up...'
        }
        success {
            // Actions to perform if the build succeeds
            echo 'Build succeeded!'
        }
        failure {
            // Actions to perform if the build fails
            echo 'Build failed!'
        }
    }
}