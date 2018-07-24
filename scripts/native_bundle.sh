#!/bin/sh
set -e
yarn native:build
rm -fr ./build/bundle-ios
rm -fr ./build/bundle-android 
mkdir ./build/bundle-ios
mkdir ./build/bundle-android
./node_modules/.bin/react-native bundle --platform ios --entry-file index.js --bundle-output ./build/bundle-ios/main.jsbundle --assets-dest ./build/bundle-ios/ --dev false
./node_modules/.bin/react-native bundle --platform android --entry-file index.js --bundle-output ./build/bundle-android/main.jsbundle --assets-dest ./build/bundle-android/ --dev false