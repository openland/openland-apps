#!/bin/sh
set -e
./kubectl set image deployment/openland-web-dev openland-web-next=index.docker.io/openland/web:${1}
./kubectl rollout status deployments openland-web-dev