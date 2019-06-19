import { Platform } from 'react-native';

export const AppStyles = {
    primaryColor: '#0084fe',
    primaryColorLight: '#BDBDE4',
    separatorColor: Platform.OS === 'android' ? '#ebebeb' : '#eaeaea',
    backyardColor: '#f3f3f3',
    backgroundColor: '#fff',
    dangerColor: '#d75454',
};

export const TextStyles = {
    weight: {
        thin: '100' as '100',
        light: '300' as '300',
        regular: '400' as '400',
        medium: Platform.OS === 'ios' ? '600' : '500' as ('600' | '500'),
        bold: '700' as '700',
        black: '900' as '900',
    },
    family: {
        monospace: Platform.OS === 'ios' ? 'CourierNewPSMT' : 'monospace'
    }
}