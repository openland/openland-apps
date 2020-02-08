#!/bin/sh
set -e

# # Generate API
echo "Schema"
yarn apollo codegen:generate --queries="$(find . -name './packages/openland-api/exported/*.graphql')" --target json ./packages/openland-api/queries.json
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/generateApi.ts

# # Generate Types (osbolete)
echo "Apollo"
rimraf ./node_modules/apollo/node_modules/graphql
yarn apollo codegen:generate --target=typescript --outputFlat=./packages/openland-api/Types.ts --addTypename --tagName=gql

# SpaceX support data
echo "SpaceX"
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target kotlin --package com.openland.react.graphql -output ./android/app/src/main/java/com/openland/react/graphql
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target swift -output ./ios/Operations.swift
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target typescript -output ./packages/openland-api/spacex.web.ts
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/definitions/ --schema ./schema.json --target client -output ./packages/openland-api