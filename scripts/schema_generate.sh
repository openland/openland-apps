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

# Export fragments for fragment matcher
node ./fetch-fragments.js

#
# Generate Types
#
rimraf ./node_modules/apollo/node_modules/graphql
yarn apollo codegen:generate --target=typescript --outputFlat=./packages/openland-api/Types.ts --addTypename --tagName=gql
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/generateTypes.ts

#
# Native
#

# Android Schemas
rimraf ./android/app/src/main/graphql
mkdir -p ./android/app/src/main/graphql/com/openland/api
cp ./schema.json ./android/app/src/main/graphql/com/openland/api/
cp ./packages/openland-api/exported/*.graphql ./android/app/src/main/graphql/com/openland/api/

# iOS Schemas
yarn apollo codegen:generate --queries="$(find . -name './packages/openland-api/exported/*.graphql')" --target swift ./ios/API.swift

# Native Bindings
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/generateNativeApi.ts