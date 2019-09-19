import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

type ZIconButtonStyle = 'default' | 'danger' | 'contrast';

export interface ZIconButtonProps {
    src: NodeRequire;
    onPress?: () => void;
    path?: string;
    pathParams?: any;
    style?: ZIconButtonStyle;
}

const ZIconButtonComponent = React.memo<ZIconButtonProps & { router: SRouter }>((props) => {
    const { src, onPress, path, pathParams, style = 'default', router } = props;
    const theme = React.useContext(ThemeContext);
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

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
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
        </TouchableOpacity>
    );
});

export const ZIconButton = withRouter<ZIconButtonProps>(ZIconButtonComponent);