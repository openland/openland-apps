#!/bin/bash
set -e
RELEASE_ID=${1}
sentry-cli releases -o openland -p openland-app files $RELEASE_ID upload-sourcemaps --url-prefix=~/ ./dist/
sentry-cli releases -o openland -p openland-app-next files $RELEASE_ID upload-sourcemaps --url-prefix=~/ ./dist/
sentry-cli releases -p openland-app files $RELEASE_ID upload-sourcemaps --url-prefix=~/.next ./dist/.next
sentry-cli releases -o openland -p openland-app-next files $RELEASE_ID upload-sourcemaps --url-prefix=~/.next ./dist/.next