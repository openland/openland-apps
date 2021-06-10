#!/bin/sh
set -e

./node_modules/.bin/spacex-cli compile --path "./packages/openland-api/definitions/*.graphql" --schema ./schema.json --output ./packages/openland-api/ --name OpenlandClient