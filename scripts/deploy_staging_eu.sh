#!/bin/sh
set -e
./kubectl set image deployment/openland-web-eu-next web=index.docker.io/openland/web:v${BITBUCKET_BUILD_NUMBER}
./kubectl rollout status deployments openland-web-eu-next