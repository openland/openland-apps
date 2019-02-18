import { StatusBarStyle, Platform, StatusBar, NativeModules } from 'react-native';
const Native = NativeModules.RNSWindowManager;

class SStatusBarImpl {
    setBarStyle(style: StatusBarStyle) {
        if (Platform.OS === 'android') {
            if (style === 'default' || style === 'dark-content') {
                Native.setStatusBarColor('light')
            } else {
                Native.setStatusBarColor('dark')
            }
        } else {
            StatusBar.setBarStyle(style);
        }
    }
}

export const SStatusBar = new SStatusBarImpl();