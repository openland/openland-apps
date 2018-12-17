VERSION=`/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' ./ios/openland/Info.plist`
echo "##teamcity[buildNumber '$VERSION']"