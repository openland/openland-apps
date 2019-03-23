import { Platform, Dimensions, PixelRatio, StatusBar, NativeModules } from 'react-native';

// Detect iPhoneX
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

const isNewIPadPro = (() => {
    if (Platform.OS !== 'ios') { return false; }
    return (
        (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH) ||
        (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT) ||
        ((D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) ||
            (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT))
    );
})();

const isIphoneX = Platform.OS === 'ios' && D_WIDTH === X_WIDTH && D_HEIGHT === X_HEIGHT;
const isIphoneXSMAX = Platform.OS === 'ios' && D_WIDTH === XSMAX_WIDTH && D_HEIGHT === XSMAX_HEIGHT;

//
// Library supports safe area, status bar height only for iOS since there are no reliable way to detect them on Android.
// Eventually we will add support for safe area api for androids.
//
const safeAreaTop = Platform.OS === 'ios' ? ((isIphoneX || isIphoneXSMAX) ? 22 : 0) : 0;
let safeAreaBottom = Platform.OS === 'ios' ? ((isIphoneX || isIphoneXSMAX) ? 34 : (isNewIPadPro ? 20 : 0)) : NativeModules.RNSWindowManager.NAVIGATION_BAR; // DimensionsAndroid.get('SOFT_MENU_BAR_HEIGHT'); // - (Platform.Version < 28 ? 0 : DimensionsAndroid.get('STATUS_BAR_HEIGHT'));
// console.log('SOFT: ' + DimensionsAndroid.get('SOFT_MENU_BAR_HEIGHT'));

//
// Sizes of UINavigationController/AppBar
//
const navigationBarHeight = Platform.OS === 'ios' ? 44 : 56; // Default size of navigation bar
const navigationBarHeightExpanded = Platform.OS === 'ios' ? 96 : 96; // Size of expanded navigation bar

//
// Sizes of Status Bars
//
const statusBarHeight = Platform.OS === 'ios' ? 22 : StatusBar.currentHeight!;

//
// Rendering properties
// We are enabling blur only on iOS since it is implemented in a very efficient way comparing to the android
//
const renderBlurSupported = Platform.OS === 'ios';

const pixel = 1 / PixelRatio.get();

export let SDevice = {
    safeArea: {
        top: safeAreaTop,
        bottom: safeAreaBottom
    },

    statusBarHeight,
    navigationBarHeight,
    navigationBarHeightExpanded,

    renderBlurSupported: renderBlurSupported,
    pixel: pixel
};