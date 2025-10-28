pipeline {
    agent any

    environment {
        // 🔧 Ortelius Credentials
        DHURL = "http://10.171.3.36/dmadminweb"   // ganti sesuai URL Ortelius kamu
        DHUSER = "admin"
        DHPASS = "admin"

        // 🧱 Component / App Info
        APP_NAME = "GLOBAL.LoubiShop"           // Application name di Ortelius
        APP_VERSION = "1.0.0"
        FRONT_COMPONENT = "GLOBAL.LoubiShop.Frontend"
        BACK_COMPONENT = "GLOBAL.LoubiShop.Backend"
        BUILD_NUM = "${env.BUILD_NUMBER}"

        // 📦 Docker / SBOM
        DOCKERREPO = "ghcr.io/koojennie/loubishop" // contoh repo container
        IMAGE_TAG = "v1.${env.BUILD_NUMBER}"

        // CLI paths
        PATH = "/usr/local/bin:${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/koojennie/loubilux.git'
            }
        }

        stage('Install Ortelius CLI & Tools') {
            steps {
                sh '''
                echo "📦 Installing Ortelius CLI (v10.0.5584)..."
                curl -L https://github.com/Ortelius/ortelius-cli/releases/download/v10.0.5584/ortelius-linux-amd64.tar.gz -o dh.tar.gz
                tar -xvf dh.tar.gz
                chmod +x ortelius
                mv ortelius dh
                mv dh /usr/local/bin/
                dh version || echo "✅ Ortelius CLI installed successfully."
        
                echo "📦 Installing Syft (for SBOM)..."
                curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
        
                echo "📊 Installing OpenSSF Scorecard..."
                curl -L https://github.com/ossf/scorecard/releases/download/v5.3.0/scorecard_5.3.0_linux_amd64.tar.gz -o scorecard.tar.gz
                tar -xzf scorecard.tar.gz && chmod +x scorecard
                mv scorecard /usr/local/bin/
                scorecard version || echo "✅ Scorecard installed successfully."
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
                    npm run build
                    '''
                }
            }
        }

        stage('Generate SBOMs') {
            steps {
                sh '''
                echo "📦 Generating SBOMs for frontend and backend..."
                syft ./frontend -o cyclonedx-json > frontend-sbom.json || true
                syft ./backend -o cyclonedx-json > backend-sbom.json || true
                '''
            }
        }

        stage('Run OSSF Scorecard') {
            steps {
                sh '''
                echo "🔍 Running OpenSSF Scorecard..."
                scorecard --repo=https://github.com/koojennie/loubilux --format json > scorecard.json || true
                '''
            }
        }

        stage('Prepare Component Metadata') {
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

        stage('Publish to Ortelius') {
            steps {
                sh '''
                echo "🚀 Publishing components and SBOMs to Ortelius..."

                # Export credentials for dh CLI
                export DHURL=${DHURL}
                export DHUSER=${DHUSER}
                export DHPASS=${DHPASS}

                # Frontend component upload
                ./dh updatecomp --rsp frontend.toml --deppkg "cyclonedx@frontend-sbom.json"

                # Backend component upload
                ./dh updatecomp --rsp backend.toml --deppkg "cyclonedx@backend-sbom.json"

                echo "✅ Components registered in Ortelius!"
                '''
            }
        }

        stage('Publish Scorecard Results (optional)') {
            steps {
                sh '''
                echo "📊 Uploading OSSF Scorecard data to Ortelius..."
                curl -X POST -u ${DHUSER}:${DHPASS} \
                    -H "Content-Type: application/json" \
                    -d @scorecard.json \
                    ${DHURL}/api/catalog/scorecard || true
                '''
            }
        }
    }
}
