import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface ZTabProps {
    children: any;
    onPress: () => void;
    selected: boolean;
}

export const ZTab = React.memo((props: ZTabProps) => {
    const { children, onPress, selected } = props;
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
                        {children}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});