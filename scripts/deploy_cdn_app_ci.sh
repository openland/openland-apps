#!/bin/bash
set -e
BUILD_ID=$(cat "./dist/.next/BUILD_ID")
gsutil -m -h "Cache-Control:public, max-age=31536000" cp -r -n ./dist/.next/static/* "gs://cdn.openland.com/app/_next/static/"
gsutil -m -h "Cache-Control:public, max-age=31536000" cp -r -n ./dist/.next/static/* "gs://cdn-eu.openland.com/app/_next/static/"