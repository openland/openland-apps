#!/bin/sh
set -e

./node_modules/@openland/spacex/node_modules/.bin/spacex-cli compile --path "./packages/openland-api/definitions/*.graphql" --schema ./schema.json --output ./packages/openland-api/ --name OpenlandClient

# Types
# yarn apollo codegen:generate --target=typescript --outputFlat=./packages/openland-api/spacex.types.ts --addTypename --tagName=gql

# SpaceX support data
./node_modules/@openland/spacex-cli/bin/spacex-cli generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target kotlin --package com.openland.react.graphql -output ./android/app/src/main/java/com/openland/react/graphql
./node_modules/@openland/spacex-cli/bin/spacex-cli generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target swift -output ./ios/Operations.swift
#  ./node_modules/@openland/spacex-cli/bin/spacex-cli generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target typescript -output ./packages/openland-api/spacex.web.ts
#  ./node_modules/@openland/spacex-cli/bin/spacex-cli generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target client -output ./packages/openland-api/spacex.ts --name OpenlandClient
