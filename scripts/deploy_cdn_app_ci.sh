#!/bin/bash
set -e
BUILD_ID=$(cat "./dist/.next/BUILD_ID")
gsutil -m -h "Cache-Control:public, max-age=31536000" cp -r -n ./dist/.next/* "gs://cdn.openland.com/app/_next/${BUILD_ID}/"