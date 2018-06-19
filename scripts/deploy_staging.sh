#!/bin/sh
set -e
./kubectl set image deployment/openland-web-dev openland-web-dev=index.docker.io/openland/web:v${BITBUCKET_BUILD_NUMBER}
./kubectl set image deployment/openland-web-next openland-web-next=index.docker.io/openland/web:v${BITBUCKET_BUILD_NUMBER}
./kubectl rollout status deployments openland-web-next