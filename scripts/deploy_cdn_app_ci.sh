#!/bin/bash
set -e
BUILD_ID=$(cat "./dist/.next/BUILD_ID")
gsutil -m -h "Cache-Control:public, max-age=31536000" cp -r -n ./dist/.next/bundles/pages/* "gs://cdn.openland.com/app/_next/${BUILD_ID}/page/"
gsutil -m -h "Cache-Control:public, max-age=31536000" cp -r -n ./dist/.next/static/commons/main-* "gs://cdn.openland.com/app/_next/static/commons/"
gsutil -m -h "Cache-Control:public, max-age=31536000" cp -r -n ./dist/.next/chunks/* "gs://cdn.openland.com/app/_next/webpack/chunks/"