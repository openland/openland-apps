import * as React from 'react';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { View, TouchableHighlight, Image } from 'react-native';
import { hexToRgba } from 'openland-y-utils/hexToRgba';

type ZIconActionStyle = 'primary' | 'pay';

interface ZIconActionProps {
    source: NodeRequire;
    onPress: () => void;
    style?: ZIconActionStyle;
}

export const ZIconAction = React.memo<ZIconActionProps>((props) => {
    const style = props.style || 'primary';
    const theme = useTheme();
    const foregroundInvertedTrans = hexToRgba(theme.foregroundInverted, 0.08);

    const bgColors: {[s in ZIconActionStyle]: string} = {
        primary: theme.accentPrimary,
        pay: foregroundInvertedTrans,
    };
    const tintColors: {[s in ZIconActionStyle]: string} = {
        primary: theme.foregroundInverted,
        pay: theme.foregroundContrast,
    };
    const underlayColors: {[s in ZIconActionStyle]: string} = {
        primary: theme.accentPrimaryActive,
        pay: foregroundInvertedTrans,
    };
    const backgroundColor = bgColors[style];
    const tintColor = tintColors[style];
    const underlayColor = underlayColors[style];

    return (
        <View style={{ borderRadius: 100 }}>
            <TouchableHighlight
                style={{backgroundColor, width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}
                onPress={props.onPress}
                underlayColor={underlayColor}
                delayPressIn={0}
            >
                <Image source={props.source} style={{tintColor, width: 24, height: 24}} />
            </TouchableHighlight>
        </View>
    );
});
