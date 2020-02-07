#!/bin/sh
set -e

#
# Exporting
#

# Folders
rimraf ./packages/openland-api/exported
mkdir -p ./packages/openland-api/exported

# Export manifest
yarn apollo client:extract ./packages/openland-api/manifest.json

# Export .graphql files
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/exportQueries.ts

# Export queries.json
yarn apollo codegen:generate --queries="$(find . -name './packages/openland-api/exported/*.graphql')" --target json ./packages/openland-api/queries.json

#
# Generate Types
#
rimraf ./node_modules/apollo/node_modules/graphql
yarn apollo codegen:generate --target=typescript --outputFlat=./packages/openland-api/Types.ts --addTypename --tagName=gql
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/generateApi.ts

# SpaceX support data
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/exported/ --schema ./schema.json --target kotlin --package com.openland.react.graphql -output ./android/app/src/main/java/com/openland/react/graphql
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/exported/ --schema ./schema.json --target swift -output ./ios/Operations.swift
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/exported/ --schema ./schema.json --target typescript -output ./packages/openland-api/spacex.web.ts
 ./node_modules/.bin/spacex generate --queries ./packages/openland-api/exported/ --schema ./schema.json --target client -output ./packages/openland-api