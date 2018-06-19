#!/bin/bash
set -e
BUILD_ID=$(cat "./packages/openland-web/.next/BUILD_ID")
gsutil -m rsync -r -c ./packages/openland-web/.next/bundles/pages/* "gs://cdn.openland.com/app/_next/${BUILD_ID}/page/"
gsutil -m rsync -r -c ./packages/openland-web/.next/static/commons/main-* "gs://cdn.openland.com/app/_next/static/commons/"
gsutil -m rsync -r -c ./packages/openland-web/.next/chunks/* "gs://cdn.openland.com/app/_next/webpack/chunks/"
gsutil -m setmeta -r -h "Cache-Control:public, max-age=31536000" gs://cdn.openland.com/app/_next/static/commons/
gsutil -m setmeta -r -h "Cache-Control:public, max-age=31536000" "gs://cdn.openland.com/app/_next/${BUILD_ID}/page/"
gsutil -m setmeta -r -h "Cache-Control:public, max-age=31536000" "gs://cdn.openland.com/app/_next/webpack/chunks/"