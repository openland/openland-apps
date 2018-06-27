#!/bin/sh
set -e
source /tmp/google-cloud-sdk/path.bash.inc &>/dev/null
./kubectl set image deployment/openland-web-dev openland-web-dev=index.docker.io/openland/web:git-${CIRCLE_SHA1}
./kubectl set image deployment/openland-web-next openland-web-next=index.docker.io/openland/web:git-${CIRCLE_SHA1}
./kubectl rollout status deployments openland-web-next