import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    box: {
        width: 80,
        height: 68,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    title: {
        ...TextStyles.Label2,
        marginTop: 8
    } as TextStyle,
});

export interface ZHeroActionProps {
    icon: NodeRequire;
    title: string;
    onPress: () => void;
}

export const ZHeroAction = React.memo<ZHeroActionProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { icon, title, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={HighlightAlpha}>
            <View style={styles.box}>
                <Image source={icon} style={{ tintColor: theme.foregroundSecondary }} />
                <Text style={[{ color: theme.foregroundPrimary }, styles.title]} allowFontScaling={false}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
});