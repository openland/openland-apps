#!/bin/sh
set -e

get-graphql-schema https://api.openland.com/api > schema.graphql
get-graphql-schema https://api.openland.com/api --json > schema.json