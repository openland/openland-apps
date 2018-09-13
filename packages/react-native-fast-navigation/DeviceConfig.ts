import { Platform, Dimensions } from 'react-native';

// Detect iPhoneX
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
const isIphoneX = Platform.OS === 'ios' && D_WIDTH === X_WIDTH && D_HEIGHT === X_HEIGHT;

const statusBarHeight = Platform.OS === 'ios' ? (isIphoneX ? 44 : 22) : 0;
const navigationBarBackWidth = Platform.OS === 'ios' ? 88 : 56;
const navigationBarHeight = Platform.OS === 'ios' ? 44 : 56;
const navigationBarHeightLarge = Platform.OS === 'ios' ? 96 : 96;
const navigationBarTransparent = Platform.OS === 'ios';
const navigationBarContentInset = navigationBarTransparent ? navigationBarHeightLarge + statusBarHeight : navigationBarHeightLarge - navigationBarHeight;
const navigationBarContentInsetSmall = navigationBarTransparent ? navigationBarHeight + statusBarHeight : 0;

const bottomNavigationBarInset = Platform.OS === 'ios' ? (isIphoneX ? 34 : 0) : 0;
const enableBlur = Platform.OS === 'ios';

export const DeviceConfig = {
    accentColor: '#000',
    titleColor: Platform.OS === 'ios' ? '#000' : '#fff',
    subtitleColor: Platform.OS === 'ios' ? '#000' : '#fff',
    statusBarHeight,
    navigationBarBackWidth,
    navigationBarBackgroundColor: Platform.OS === 'ios' ? '#fff' : '#49288f',
    navigationBarHeight,
    navigationBarHeightLarge,
    navigationBarContentInset,
    navigationBarContentInsetSmall,
    navigationBarTransparent,
    bottomNavigationBarInset,
    enableBlur,
    debugBackground: false
};