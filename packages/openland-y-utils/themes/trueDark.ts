import { ThemeGlobal } from './ThemeGlobal';
import { ThemeDark } from './dark';

export const ThemeTrueDark: ThemeGlobal = {
    ...ThemeDark,

    type: 'TrueDark',

    backgroundPrimary: '#000000',
    backgroundPrimaryHover: '#242629',
    backgroundPrimaryActive: '#242629',
};
