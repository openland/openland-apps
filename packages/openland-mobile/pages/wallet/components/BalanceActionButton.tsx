import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, TouchableHighlight, Image } from 'react-native';

interface BalanceActionButtonProps {
    source: NodeRequire;
    onPress: () => void;
}

export const BalanceActionButton = React.memo<BalanceActionButtonProps>((props) => {
    const theme = React.useContext(ThemeContext);

    const backgroundColor = theme.accentPrimary;
    const tintColor = theme.foregroundInverted;
    const underlayColor = theme.accentPrimaryActive;

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
