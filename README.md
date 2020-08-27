# Requirements
* Mobile SVG converter: `brew install librsvg`

## web: `openland-web`
Run `yarn install` to install dependencies \
Run `yarn dev` and open [localhost:3000](localhost:3000) to start dev-server

## mobile: `openland-mobile`
### iOS: installation and run via XCode
Requirements:
* XCode
* cocoapods (run `sudo gem install cocoapods` to install it)

Run `yarn native:pods` to install dependencies

Run `yarn native` to start dev-server \
Open `openland-app/ios` in XCode and run `Development` build

### android: installation and run via Android Studio
Requirements:
* Android Studio
* JDK 1.8 (run `brew tap adoptopenjdk/openjdk & brew cask install adoptopenjdk8` to install it)
* SDK `Android 9.0 (Pie)` for Android Studio and for your virtual device

Open `openland-app/android` in Android Studio \
Sync project with Gradle files \
Start your virtual device \
Run `yarn native:android`
