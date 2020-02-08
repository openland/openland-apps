#!/bin/sh
set -e

get-graphql-schema http://localhost:9000/api > schema.graphql
get-graphql-schema http://localhost:9000/api --json > schema.json