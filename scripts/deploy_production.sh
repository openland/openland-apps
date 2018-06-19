#!/bin/sh
set -e
./kubectl set image deployment/openland-web app=index.docker.io/openland/web:v${BITBUCKET_BUILD_NUMBER}
./kubectl rollout status deployments openland-web