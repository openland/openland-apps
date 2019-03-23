#!/bin/sh
set -e

# Export manifest
yarn apollo client:extract

# Generate types index
rimraf ./node_modules/apollo/node_modules/graphql
yarn apollo codegen:generate --target=typescript --outputFlat=./packages/openland-api/Types.ts --addTypename --tagName=gql

# Generate openland types wrappers
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/generator.ts
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/generateNativeApi.ts

# Export fragments for fragment matcher
node ./fetch-fragments.js

# Android Schemas
rimraf ./android/app/src/main/graphql
mkdir -p ./android/app/src/main/graphql/com/openland/api
cp ./schema.json ./android/app/src/main/graphql/com/openland/api/
./node_modules/.bin/ts-node --compilerOptions '{"module":"commonjs"}' ./packages/openland-y-graphql-gen/exportQueries.ts

# iOS Schemas
yarn apollo codegen:generate --queries="$(find . -name './android/app/src/main/graphql/com/openland/api/*.graphql')" --target swift ./ios/API.swift