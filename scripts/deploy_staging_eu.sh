#!/bin/sh
set -e
./kubectl set image deployment/openland-web-eu-next openland-web-next=index.docker.io/openland/web:v${BITBUCKET_BUILD_NUMBER}
./kubectl rollout status deployments web