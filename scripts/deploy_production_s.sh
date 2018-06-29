#!/bin/sh
set -e
./kubectl set image deployment/openland-web app=index.docker.io/openland/web:${1}
./kubectl rollout status deployments openland-web