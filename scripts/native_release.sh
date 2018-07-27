#!/bin/sh
set -e
IOS_VERSION=`cat ./ios/VERSION`
./node_modules/.bin/appcenter codepush release -a ex3ndr/Openland-iOS -d Staging --update-contents-path ./build/bundle-ios -t $IOS_VERSION --description "CI Build: $1"
ANDROID_VERSION=`cat ./android/VERSION`
./node_modules/.bin/appcenter codepush release -a ex3ndr/Openland-Android -d Staging --update-contents-path ./build/bundle-android -t $ANDROID_VERSION --description "CI Build: $1"