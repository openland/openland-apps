#!/bin/sh

# Symlinks not working...
# ln -sf `pwd`/packages/openland-api `pwd`/packages/openland-mobile/api/sources
rm -fr `pwd`/packages/openland-api
cp -r `pwd`/../openland-api `pwd`/packages/openland-api/

rm -fr `pwd`/packages/openland-x-graphql
mkdir `pwd`/packages/openland-x-graphql/
cp -r `pwd`/../openland-x-graphql/typed.ts `pwd`/packages/openland-x-graphql/
# mkdir `pwd`/packages/openland-mobile/api/typed/
# ln -sf `pwd`/packages/openland-x-graphql/typed.ts `pwd`/packages/openland-mobile/api/typed/typed.ts