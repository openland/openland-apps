#!/bin/sh
set -e
./kubectl set image deployment/openland-web-dev openland-web-dev=index.docker.io/openland/web:${1}
./kubectl rollout status deployments openland-web-dev