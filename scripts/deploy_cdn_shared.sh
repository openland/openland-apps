#!/bin/bash
set -e
gsutil -m -h "Cache-Control:public, max-age=31536000"  cp -r -n ./packages/openland-cdn/src/* gs://cdn.openland.com/shared/