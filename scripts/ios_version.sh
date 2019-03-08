VERSION=`cat ./ios/VERSION`
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}.${BUILD_NUMBER}" ./ios/openland/Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${BUILD_NUMBER}" ./ios/openland/Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}.${BUILD_NUMBER}" ./ios/openland-share-ex/Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${BUILD_NUMBER}" ./ios/openland-share-ex/Info.plist