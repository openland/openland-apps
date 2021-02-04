import { Platform, Dimensions } from 'react-native';

// Detect iPhoneX
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XR_WIDTH = 414;
const XR_HEIGHT = 896;
const X12PRO_WIDTH = 390;
const X12PRO_HEIGHT = 844;
const X12PROMAX_WIDTH = 428;
const X12PROMAX_HEIGHT = 926;

const isIphoneX = Platform.OS === 'ios' && D_WIDTH === X_WIDTH && D_HEIGHT === X_HEIGHT;
const isIphoneXR = Platform.OS === 'ios' && D_WIDTH === XR_WIDTH && D_HEIGHT === XR_HEIGHT;
const isIphone12PRO = Platform.OS === 'ios' && D_WIDTH === X12PRO_WIDTH && D_HEIGHT === X12PRO_HEIGHT;
const isIphone12PROMAX = Platform.OS === 'ios' && D_WIDTH === X12PROMAX_WIDTH && D_HEIGHT === X12PROMAX_HEIGHT;
const iPhoneWithNotch = isIphoneX || isIphoneXR || isIphone12PRO || isIphone12PROMAX;

const statusBarHeight = Platform.OS === 'ios' ? (iPhoneWithNotch ? 44 : 22) : 0;
const navigationBarBackWidth = Platform.OS === 'ios' ? 88 : 56;
const navigationBarHeight = Platform.OS === 'ios' ? 44 : 56;
const navigationBarHeightLarge = Platform.OS === 'ios' ? 96 : 96;
const navigationBarTransparent = Platform.OS === 'ios';
const navigationBarContentInset = navigationBarTransparent ? navigationBarHeightLarge + statusBarHeight : navigationBarHeightLarge - navigationBarHeight;
const navigationBarContentInsetSmall = navigationBarTransparent ? navigationBarHeight + statusBarHeight : 0;

const bottomNavigationBarInset = Platform.OS === 'ios' ? (iPhoneWithNotch ? 34 : 0) : 0;
const enableBlur = Platform.OS === 'ios';

export const DeviceConfig = {
    accentColor: '#000',
    titleColor: Platform.OS === 'ios' ? '#000' : '#49288f',
    subtitleColor: Platform.OS === 'ios' ? '#000' : '#49288f',
    statusBarHeight,
    navigationBarBackWidth,
    navigationBarBackgroundColor: '#fff',
    navigationBarHeight,
    navigationBarHeightLarge,
    navigationBarContentInset,
    navigationBarContentInsetSmall,
    navigationBarTransparent,
    bottomNavigationBarInset,
    enableBlur,
    debugBackground: false
};
