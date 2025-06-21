pipeline {
  agent {
    kubernetes {
      defaultContainer 'jnlp'
      inheritFrom 'pod-template-m pod-template-sonar-cli-m'
      yamlFile 'pipeline/KubernetesPod.yaml'
      yamlMergeStrategy merge()
    }
  }

  environment {
    ARTIFACTORY_CREDS = credentials('jenkins-artifactory-credentials')
    GITLAB_CREDS      = credentials('jenkins-gitlab-credentials')
    SONARQUBE_CREDS   = credentials('jenkins-sonarqube-credentials')
    SONARQUBE_URL     = "https://tdo-sonarqube.group.echonet"
    QGC_API_URL       = "https://eaas.itg.echonet/"
    GITLAB_HOST       = ""
    VERSION           = ""
    RELEASE_BRANCH    = "master"
    APP_NAME          = ""
    IS_RELEASE        = ""
    REPOSITORY_SUFFIX = ""
    APPLICATION_CODE  = "API2208"
    SONAR_PROJECT_KEY = "p-3009-myaccess_reporting_front"
    PROJECT_ID        = "3009"
    SCAN_BUILD_NBR    = "${currentBuild.startTimeInMillis}"
  }

  triggers {
    gitlab(triggerOnPush: true, branchFilterType: 'All')
  }

  libraries {
    lib('common-shared-lib')
  }

  options {
    skipDefaultCheckout(true)
    buildDiscarder(logRotator(numToKeepStr: '5'))
    disableConcurrentBuilds()
  }

  stages {
    stage('checkout') {
      steps {
        script {
          sh(returnStdout: false, script: "git config --global http.sslVerify false")
          deleteDir()
        checkout scm
IS_RELEASE = false
REPOSITORY_SUFFIX = "SNAPSHOT"
GITLAB_HOST = sh(returnStdout: true, script: "git config remote.origin.url | sed 's/https\\:\/\/\\|\\/\\///g'").trim()
CURRENT_VERSION = sh(returnStdout: true, script: "grep version package.json | cut -d '\"' -f4 | cut -d '-' -f1,2").trim()
APP_NAME = sh(returnStdout: true, script: "grep name package.json | cut -d '\"' -f4 | cut -d '-' -f1,2").trim()
VERSION = getNextVersion(CURRENT_VERSION)
if (BRANCH_NAME == RELEASE_BRANCH) {
  IS_RELEASE = true
  REPOSITORY_SUFFIX = "RELEASE"
}
  }
  }
}

stage('compile') {
  steps {
    container('node') {
      sh """
      ARTIFACTORY_HOSTNAME=\$(echo https://repo.artifactory-dogen.group.echonet/artifactory | awk -F[/:] '{print \$4}')
      curl -k -u \$ARTIFACTORY_CREDS_USR:\$ARTIFACTORY_CREDS_PSW https://repo.artifactory-dogen.group.echonet/artifactory/api/npm/auth/ > ~/.npmrc
      npm config set registry https://repo.artifactory-dogen.group.echonet/artifactory/api/npm/npm/
      npm set sass-binary-site https://\$ARTIFACTORY_CREDS_USR:\$ARTIFACTORY_CREDS_PSW@repo.artifactory-dogen.group.echonet/artifactory/node-sass
      npm set strict-ssl false
      npm --no-git-tag-version version \${VERSION} --allow-same-version
      # npm install --production
      """
    }
  }
}

stage('Test') {
  steps {
    container('node') {
      sh ""
    }
  }
}

stage('Quality') {
  steps {
    container('sonar') {
      script {
def sonarProjectKey=getSonarProjectKey("${SONAR_PROJECT_KEY}")
sh "
  sonar-scanner -Dsonar.host.url=${SONARQUBE_URL} \
  -Dsonar.login=${SONARQUBE_CREDS_USR} \
  -Dsonar.password=${SONARQUBE_CREDS_PSW} \
  -Dproject.settings=sonar-project.properties \
  -Dsonar.projectKey=${sonarProjectKey}"
  env.SONAR_TASK_ID=findTaskId()
def status = waitForSonarQualityGate("${SONARQUBE_URL}", "${SONARQUBE_CREDS_USR}","${SONARQUBE_CREDS_PSW}")
if (status == 'ERROR') {
  error("Sonarqube analysing failed.")
}
 }
  }
}
}

stage('Package') {
  steps {
    container('node') {
      sh """
      chmod +x ./scripts/build_tarball.sh
      ./scripts/build_tarball.sh ${APP_NAME} ${VERSION}
      """
    }
  }
}

stage('Tag') {
  when {
    branch "${RELEASE_BRANCH}"
  }
  steps {
    script {
      encodedPwd = java.net.URLEncoder.encode("${GITLAB_CREDS_PSW}", "UTF-8")
      sh """
      git config --global http.sslVerify false
      git tag v${VERSION}
      git push https://${GITLAB_CREDS_USR}:${encodedPwd}@${GITLAB_HOST} v${VERSION}
      """
    }
  }
}

stage('Publish') {
  steps {
    container('jfrog') {
              sh "chmod +x ./scripts/deploy_release.sh"
      sh "./scripts/deploy_release.sh ${APP_NAME} ${ARTIFACTORY_CREDS_USR} ${ARTIFACTORY_CREDS_PSW} ${REPOSITORY_SUFFIX} ${VERSION} ${SCAN_BUILD_NBR}"
    }
  }
}
        }

post {
  always {
    echo "********************Call logstash"
    script {
      logstashApi("""{
        "source": "portail",
        "url_build": "${BUILD_URL}",
        "code_api": "${APPLICATION_CODE}",
        "custom_field": "trigram",
        "buildNumber": "${SCAN_BUILD_NBR}",
        "project_id": "${PROJECT_ID}",
        "artifactory": "${APP_NAME}",
        "release": "${VERSION}"
      }""")
    }
    echo "Finished!"
  }
  success {
    echo "Successed Pipeline: ${currentBuild.fullDisplayName}."
  }
  unstable {
    echo "Unstable Pipeline: ${currentBuild.fullDisplayName}."
  }
  failure {
    echo "Failed Pipeline: ${currentBuild.fullDisplayName} ; Something is wrong with ${env.BUILD_URL}"
  }
}
 }