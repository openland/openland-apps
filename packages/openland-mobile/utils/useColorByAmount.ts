import { useTheme } from 'openland-mobile/themes/ThemeContext';

export const useColorByAmount = (amount: number) => {
    const theme = useTheme();
    if (amount <= 4) {
        return theme.tintCyan;
    } else if (amount <= 9) {
        return theme.tintBlue;
    } else if (amount <= 24) {
        return theme.tintPurple;
    } else if (amount <= 49) {
        return theme.tintRed;
    } else {
        return theme.tintOrange;
    }
};
