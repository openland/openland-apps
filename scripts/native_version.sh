#!/bin/sh
set -e
VERSION=$1
echo "{\"bundleVersion\":\"${VERSION}\"}" > ./packages/openland-mobile/version.json