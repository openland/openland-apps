import { Platform, Dimensions } from 'react-native';

// Detect iPhoneX
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
const isIphoneX = Platform.OS === 'ios' && D_WIDTH === X_WIDTH && D_HEIGHT === X_HEIGHT;

export const ZAppConfig = {
    accentColor: '#000',
    titleColor: '#000',
    
    statusBarHeight: Platform.OS === 'ios' ? (isIphoneX ? 44 : 22) : 0,
    
    navigationBarBackWidth: Platform.OS === 'ios' ? 44 : 56,
    navigationBarBackgroundColor: '#ff00ff',
    navigationBarHeight: Platform.OS === 'ios' ? 44 : 56,
    navigationBarHeightLarge: Platform.OS === 'ios' ? 44 : 56,

    navigationBarTransparent: Platform.OS === 'ios'
};