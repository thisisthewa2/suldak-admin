pipeline {
    agent any

    environment {
        PATH = "C:\\Windows\\System32;%PATH%;C:\\Program Files\\nodejs;C:\\Users\\cms\\AppData\\Roaming\\npm\\node_modules\\yarn\\bin"
        BUILD_FILE_PATH = "C:\\suldak\\admin"
    }

    stages {
        // 필요 없나....
        // stage('Install') {
        //     steps {
        //         script {
        //             bat "npm install -g yarn"
        //             bat "yarn install"
        //         }
        //     }
        // }
        stage('Build') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        bat 'yarn build'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        def buildFilePath = "${WORKSPACE}\\build"
                        bat "xcopy /s /e /y ${buildFilePath}\\* ${BUILD_FILE_PATH}"
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            script {
                archiveArtifacts artifacts: 'log.txt', allowEmptyArchive: true
            }
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
            script {
                // Capture the error log (if generated)
                def errorLog = readFile('log.txt')
                
                // Send the error log via email
                mail(
                    to: 'jimrayder3701@gmail.com',
                    subject: "Jenkins Job '${env.JOB_NAME}' Failed",
                    body: """<p>Build ${env.BUILD_NUMBER} failed.</p>
                             <p>Error log:</p>
                             <pre>${errorLog}</pre>""",
                    mimeType: 'text/html'
                )
            }
        }
    }
}