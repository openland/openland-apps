#!/bin/bash
set -e
RELEASE_ID=${1}
sentry-cli releases -o openland -p openland-app new $RELEASE_ID
sentry-cli releases -o openland -p openland-app-next new $RELEASE_ID
sentry-cli releases -o openland -p openland-app set-commits $RELEASE_ID --auto
sentry-cli releases -o openland -p openland-app-next set-commits $RELEASE_ID --auto