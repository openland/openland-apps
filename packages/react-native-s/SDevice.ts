import { Platform, Dimensions } from 'react-native';

// Detect iPhoneX
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
const isIphoneX = Platform.OS === 'ios' && D_WIDTH === X_WIDTH && D_HEIGHT === X_HEIGHT;

//
// Library supports safe area, status bar height only for iOS since there are no reliable way to detect them on Android.
// Eventually we will add support for safe area api for androids.
//
const safeAreaTop = Platform.OS === 'ios' ? (isIphoneX ? 22 : 0) : 0;
const safeAreaBottom = Platform.OS === 'ios' ? (isIphoneX ? 34 : 0) : 0;

//
// Sizes of UINavigationController/AppBar
//
const navigationBarHeight = Platform.OS === 'ios' ? 44 : 56; // Default size of navigation bar
const navigationBarHeightExpanded = Platform.OS === 'ios' ? 96 : 96; // Size of expanded navigation bar

//
// Sizes of Status Bars
//
const statusBarHeight = Platform.OS === 'ios' ? 22 : 0;

//
// Rendering properties
// We are enabling blur only on iOS since it is implemented in a very efficient way comparing to the android
//
const renderBlurSupported = Platform.OS === 'ios';

export const SDevice = {
    safeArea: {
        top: safeAreaTop,
        bottom: safeAreaBottom
    },

    statusBarHeight,
    navigationBarHeight,
    navigationBarHeightExpanded,

    renderBlurSupported: renderBlurSupported
};