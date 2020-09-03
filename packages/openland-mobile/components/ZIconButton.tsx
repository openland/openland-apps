import * as React from 'react';
import { View, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { SRouterContext } from 'react-native-s/SRouterContext';

type ZIconButtonStyle = 'default' | 'danger' | 'contrast';

export interface ZIconButtonProps {
    src: NodeRequire;
    onPress?: () => void;
    path?: string;
    pathParams?: any;
    style?: ZIconButtonStyle;
    highlight?: boolean;
}

export const ZIconButton = React.memo<ZIconButtonProps>((props) => {
    const { src, onPress, path, pathParams, style = 'default', highlight = false } = props;
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext)!;
    const handlePress = React.useCallback(async () => {
        if (onPress) {
            onPress();
        }
        if (path) {
            router.push(path, pathParams);
        }
    }, [onPress, path, pathParams]);

    const colors: { [key in ZIconButtonStyle]: string } = {
        'default': theme.foregroundSecondary,
        'danger': theme.accentNegative,
        'contrast': theme.foregroundContrast
    };

    const content = (
        <View width={48} height={48} alignItems="center" justifyContent="center">
            <Image
                source={src}
                style={{
                    width: 24,
                    height: 24,
                    tintColor: colors[style]
                }}
            />
        </View>
    );

    if (highlight) {
        return (
            <TouchableHighlight onPress={handlePress} underlayColor={theme.backgroundTertiary} style={{ borderRadius: 48 }}>
                {content}
            </TouchableHighlight>
        );
    }

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={HighlightAlpha}>
            {content}
        </TouchableOpacity>
    );
});