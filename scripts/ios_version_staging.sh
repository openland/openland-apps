VERSION=`cat ./ios/VERSION`
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}.${BUILD_NUMBER}-dev" ./ios/openland/Info.plist