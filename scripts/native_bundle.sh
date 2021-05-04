#!/bin/sh
set -e
rm -fr ./build/expo
BABEL_ENV=production expo export --asset-url https://updates.openland.com/mobile/ --public-url https://updates.openland.com/mobile/v1.1 --output-dir ./build/expo