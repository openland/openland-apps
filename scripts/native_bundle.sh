#!/bin/sh
set -e
yarn native:build
rm -fr ./build/bundle-ios
rm -fr ./build/bundle-android 
mkdir -p ./build/bundle-ios
mkdir -p ./build/bundle-ios/threads
mkdir -p ./build/bundle-android
mkdir -p ./build/bundle-android/threads
BABEL_ENV=production ./node_modules/.bin/react-native bundle --platform ios --entry-file index.js --bundle-output ./build/bundle-ios/main.jsbundle --assets-dest ./build/bundle-ios/ --dev false
BABEL_ENV=production ./node_modules/.bin/react-native bundle --platform android --entry-file index.js --bundle-output ./build/bundle-android/main.jsbundle --assets-dest ./build/bundle-android/ --dev false