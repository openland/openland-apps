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
        thin: '100',
        light: '300',
        regular: '400',
        medium: Platform.OS === 'ios' ? '600' : '500',
        bold: '700',
        black: '900',
    }
}