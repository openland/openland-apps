#!/bin/bash
set -e
echo "Installing G Cloud Tools"
curl -o /tmp/google-cloud-sdk.tar.gz https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-200.0.0-linux-x86_64.tar.gz >/dev/null
tar -xvf /tmp/google-cloud-sdk.tar.gz -C /tmp/ >/dev/null
/tmp/google-cloud-sdk/install.sh -q >/dev/null
source /tmp/google-cloud-sdk/path.bash.inc >/dev/null
echo "Installing Kubernetes Tools"
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl >/dev/null
chmod +x ./kubectl >/dev/null
if [ ! -f ./gcloud-api-key.json ]; then
    echo $GCLOUD_API_KEYFILE | base64 --decode --ignore-garbage > ./gcloud-api-key.json
fi
echo "Activate Service Account"
gcloud auth activate-service-account --key-file gcloud-api-key.json >/dev/null
gcloud --quiet config set project statecraft-188615 >/dev/null
gcloud --quiet config set compute/zone us-west1-a >/dev/null
gcloud --quiet container clusters get-credentials statekube >/dev/null
# echo "Download Sentry CLI"
# curl -sL https://sentry.io/get-cli/ | bash