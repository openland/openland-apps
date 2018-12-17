VERSION=`cat ./ios/VERSION`
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}.${BUILD_NUMBER}" ./ios/openland/Info.plist