import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface ThemeSwitcherProps {
    label: string;
    onPress: () => void;
    selected: boolean;
}

export const ThemeSwitcher = React.memo((props: ThemeSwitcherProps) => {
    const { label, onPress, selected } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <View flexGrow={1}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View
                    backgroundColor={selected ? theme.backgroundTertiary : theme.backgroundPrimary}
                    alignItems="center"
                    justifyContent="center"
                    height={36}
                    borderRadius={RadiusStyles.Large}
                >
                    <Text style={[TextStyles.Label1, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                        {label}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});