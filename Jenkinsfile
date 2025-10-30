pipeline {
    agent any

    environment {
        DHURL = "http://34.50.82.137"     // tanpa /dmadminweb
        DHUSER = "admin"
        DHPASS = "admin"

        APP_NAME = "GLOBAL.LoubiShop"
        APP_VERSION = "v1.0.0"
        FRONT_COMPONENT = "GLOBAL.LoubiShop.Frontend"
        BACK_COMPONENT = "GLOBAL.LoubiShop.Backend"
        BUILD_NUM = "${env.BUILD_NUMBER}"

        DOCKERREPO = "ghcr.io/koojennie/loubishop"
        IMAGE_TAG = "v1.${env.BUILD_NUMBER}"

        PATH = "/usr/local/bin:${env.PATH}"

        GITHUB_AUTH_TOKEN = credentials('github-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/koojennie/loubilux.git'
            }
        }

        stage('Install Tools') {
            steps {
                sh '''
                echo "📦 Installing Ortelius CLI v10.0.5584..."
                curl -L https://github.com/ortelius/ortelius-cli/releases/download/v9.3.283/ortelius-linux-amd64.tar.gz -o dh.tar.gz
                tar -xvf dh.tar.gz
                chmod +x ortelius
                mv ortelius dh
                ./dh version || echo "✅ Ortelius CLI installed"
        
                echo "📦 Installing Syft (SBOM)..."
                curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b $PWD
                ./syft version || echo "✅ Syft installed"
        
                echo "📊 Installing OpenSSF Scorecard..."
                curl -L https://github.com/ossf/scorecard/releases/download/v5.3.0/scorecard_5.3.0_linux_amd64.tar.gz -o scorecard.tar.gz
                tar -xzf scorecard.tar.gz && chmod +x scorecard
                ./scorecard version || echo "✅ Scorecard installed"
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    echo "🧱 Building Next.js frontend..."
                    npm ci
                    npm run build
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                    echo "⚙️ Building Express.js backend..."
                    npm ci
                    '''
                }
            }
        }

        stage('Generate SBOMs & Scorecard') {
            steps {
                sh '''
                syft ./frontend -o cyclonedx-json > frontend-sbom.json || true
                syft ./backend -o cyclonedx-json > backend-sbom.json || true

                echo "🔑 Using GitHub token for Scorecard..."
                export GITHUB_AUTH_TOKEN=${GITHUB_AUTH_TOKEN}   # ← penting!
                ./scorecard --repo=https://github.com/koojennie/loubilux --format json --show-details > scorecard.json
                cat scorecard.json | jq '.score' || echo "⚠️ Unable to parse scorecard score"
                '''
            }
        }

        stage('Prepare Metadata') {
            steps {
                writeFile file: 'frontend.toml', text: """
Application = "${APP_NAME}"
Application_Version = "${APP_VERSION}"
Name = "${FRONT_COMPONENT}"
Variant = "frontend-main"
Version = "v${APP_VERSION}.${BUILD_NUM}"

[Attributes]
  DockerTag = "${IMAGE_TAG}"
  ServiceOwner = "${DHUSER}"
  ServiceOwnerEmail = "jenkins@loubishop.site"
"""

                writeFile file: 'backend.toml', text: """
Application = "${APP_NAME}"
Application_Version = "${APP_VERSION}"
Name = "${BACK_COMPONENT}"
Variant = "backend-main"
Version = "v${APP_VERSION}.${BUILD_NUM}"

[Attributes]
  DockerTag = "${IMAGE_TAG}"
  ServiceOwner = "${DHUSER}"
  ServiceOwnerEmail = "jenkins@loubishop.site"
"""
            }
        }

        stage('Publish Components to Ortelius') {
            steps {
                sh '''
                export DHURL=${DHURL}
                export DHUSER=${DHUSER}
                export DHPASS=${DHPASS}

                echo "🚀 Uploading Frontend Component..."
                ./dh updatecomp --rsp frontend.toml \
                  --deppkg "cyclonedx@frontend-sbom.json" \
                  --deppkg "scorecard@scorecard.json" \
                  --deploydatasave frontend.json

                echo "🚀 Uploading Backend Component..."
                ./dh updatecomp --rsp backend.toml \
                  --deppkg "cyclonedx@backend-sbom.json" \
                  --deploydatasave backend.json
                '''
            }
        }

        stage('Deploy Components to Application') {
            steps {
                sh '''
                echo "📦 Linking components into Ortelius App..."
                ./dh deploy \
                  --dhurl ${DHURL} \
                  --dhuser ${DHUSER} \
                  --dhpass ${DHPASS} \
                  --appname ${APP_NAME} \
                  --appversion ${APP_VERSION} \
                  --deployenv "GLOBAL.LoubiShop.Dev" \
                  --deploydata frontend.json \
                  --logdeployment
        
                ./dh deploy \
                  --dhurl ${DHURL} \
                  --dhuser ${DHUSER} \
                  --dhpass ${DHPASS} \
                  --appname ${APP_NAME} \
                  --appversion ${APP_VERSION} \
                  --deployenv "GLOBAL.LoubiShop.Dev" \
                  --deploydata backend.json \
                  --logdeployment
                '''
            }
        }

        stage('Upload Scorecard to Dashboard (Optional)') {
            steps {
                sh '''
                echo "📤 Uploading OpenSSF Scorecard to Ortelius dashboard..."
                curl -X POST -u ${DHUSER}:${DHPASS} \
                -H "Content-Type: application/json" \
                -d @scorecard.json \
                ${DHURL}/api/catalog/scorecards || true
                '''
            }
        }

    }
}
