#!/bin/sh
set -e

# Types
yarn apollo codegen:generate --target=typescript --outputFlat=./packages/openland-api/spacex.types.ts --addTypename --tagName=gql

# SpaceX support data
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target kotlin --package com.openland.react.graphql -output ./android/app/src/main/java/com/openland/react/graphql
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target swift -output ./ios/Operations.swift
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target typescript -output ./packages/openland-api/spacex.web.ts
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target client -output ./packages/openland-api/spacex.ts --name OpenlandClient
