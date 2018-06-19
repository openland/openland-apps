#!/bin/bash
set -e
echo "Installing G Cloud Tools"
curl -o /tmp/google-cloud-sdk.tar.gz https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-200.0.0-linux-x86_64.tar.gz
tar -xvf /tmp/google-cloud-sdk.tar.gz -C /tmp/
/tmp/google-cloud-sdk/install.sh -q
source /tmp/google-cloud-sdk/path.bash.inc
echo "Installing Kubernetes Tools"
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
echo $GCLOUD_API_KEYFILE | base64 --decode --ignore-garbage > ./gcloud-api-key.json
echo "Activate Service Account"
gcloud auth activate-service-account --key-file gcloud-api-key.json
gcloud --quiet config set project statecraft-188615
gcloud --quiet config set compute/zone us-west1-a
gcloud --quiet container clusters get-credentials statekube