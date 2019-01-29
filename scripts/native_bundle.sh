#!/bin/sh
set -e
yarn native:build
rm -fr ./build/bundle-ios
rm -fr ./build/bundle-android 
mkdir -p ./build/bundle-ios
mkdir -p ./build/bundle-ios/threads
mkdir -p ./build/bundle-android
mkdir -p ./build/bundle-android/threads
./node_modules/.bin/react-native bundle --platform ios --entry-file index.js --bundle-output ./build/bundle-ios/main.jsbundle --assets-dest ./build/bundle-ios/ --dev false
./node_modules/.bin/react-native bundle --platform ios --entry-file index.thread.js --bundle-output ./build/bundle-ios/threads/index.thread.jsbundle --assets-dest ./build/bundle-ios/ --dev false
./node_modules/.bin/react-native bundle --platform android --entry-file index.js --bundle-output ./build/bundle-android/main.jsbundle --assets-dest ./build/bundle-android/ --dev false
./node_modules/.bin/react-native bundle --platform android --entry-file index.thread.js --bundle-output ./build/bundle-android/threads/index.thread.bundle --assets-dest ./build/bundle-android/ --dev false

# Copy Android
mkdir -p ./android/app/src/main/assets/threads
cp -f ./build/bundle-android/threads/index.thread.bundle ./android/app/src/main/assets/threads/index.thread.bundle

# Copy iOS
cp -f ./build/bundle-ios/threads/index.thread.jsbundle ./ios/index.thread.jsbundle