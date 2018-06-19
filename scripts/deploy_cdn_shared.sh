#!/bin/bash
set -e
gsutil rsync -r -c ./packages/openland-cdn/src/* gs://cdn.openland.com/shared/