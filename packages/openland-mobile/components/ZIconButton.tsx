import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ZIconButtonProps {
    src: NodeRequire;
    onPress?: () => void;
    path?: string;
}

const ZIconButtonComponent = React.memo<ZIconButtonProps & { router: SRouter }>((props) => {
    const theme = React.useContext(ThemeContext);
    const handlePress = React.useCallback(async () => {
        if (props.onPress) {
            props.onPress();
        }
        if (props.path) {
            props.router.push(props.path);
        }
    }, [props.onPress, props.path]);

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
            <View width={44} height={44} alignItems="center" justifyContent="center">
                <Image source={props.src} style={{ width: 24, height: 24, tintColor: theme.foregroundSecondary }} />
            </View>
        </TouchableOpacity>
    );
});

export const ZIconButton = withRouter<ZIconButtonProps>(ZIconButtonComponent);