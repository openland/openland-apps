import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';

export interface ZLabelButtonProps {
    label: string;
    onPress?: () => void;
    path?: string;
    pathParams?: any;
    style?: 'danger' | 'default';
}

const ZLabelButtonComponent = React.memo<ZLabelButtonProps & { router: SRouter }>((props) => {
    const { label, onPress, path, pathParams, router, style = 'default' } = props;
    const theme = React.useContext(ThemeContext);
    const handlePress = React.useCallback(async () => {
        if (onPress) {
            onPress();
        }
        if (path) {
            router.push(path, pathParams);
        }
    }, [onPress, path, pathParams]);

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={HighlightAlpha}>
            <View paddingVertical={2} paddingHorizontal={8} alignItems="center" justifyContent="center">
                <Text
                    style={{
                        ...TextStyles.Label2,
                        color: style === 'danger' ? theme.accentNegative : theme.foregroundTertiary
                    }}
                    allowFontScaling={false}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
});

export const ZLabelButton = withRouter<ZLabelButtonProps>(ZLabelButtonComponent);