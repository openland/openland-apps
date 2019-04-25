import * as React from 'react';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { View, Platform, Text, StyleSheet, TextStyle } from 'react-native';
import { createInterpolator } from 'openland-y-utils/createInterpolator';
import { ZImage } from './ZImage';
import { ZLinearGradient } from './visual/ZLinearGradient.native';
import { ZStyles } from './ZStyles';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    placeholderText: {
        maxWidth: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff'
    } as TextStyle
});
export interface ZAvatarProps {
    size: number;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
    online?: boolean;
    userId?: string;
}

const placeholderSizeInterpolator = createInterpolator(
    [22, 28, 30, 36, 40, 42, 56, 96],
    [12, 12, 13, 14, 16, 16, 26, 28]
);

const XPAvatarInner = XMemo<ZAvatarProps>((props) => {
    let theme = React.useContext(ThemeContext);
    let onlineSize = props.size / 4;
    if (props.src && !props.src.startsWith('ph://')) {
        return (
            <View>
                <View style={{ width: props.size, height: props.size, borderRadius: props.size / 2, backgroundColor: theme.backgroundColor }}>
                    <ZImage highPriority={true} imageSize={{ width: 256, height: 256 }} width={props.size} height={props.size} source={props.src} borderRadius={props.size / 2} />
                    {Platform.OS !== 'android' && <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: props.size / 2, borderColor: '#000', opacity: 0.03, borderWidth: 0.5 }} />}
                </View>
                {props.online && <View style={{ position: 'absolute', width: onlineSize, height: onlineSize, bottom: 0, right: 0, borderRadius: onlineSize / 2, borderColor: theme.backgroundColor, backgroundColor: theme.accentColor, borderWidth: onlineSize / 10 }} />}
            </View>
        );
    }
    let placeholderIndex = 0;
    if (props.placeholderKey) {
        placeholderIndex = doSimpleHash(props.placeholderKey);
    }
    let placeholderStyle = ZStyles.avatars[placeholderIndex % ZStyles.avatars.length];
    let placeholderText = '?';
    if (props.placeholderTitle) {
        placeholderText = extractPlaceholder(props.placeholderTitle);
    }
    let textSize = Math.round(placeholderSizeInterpolator(props.size));
    return (
        <View>
            <ZLinearGradient
                width={props.size}
                height={props.size}
                borderRadius={props.size / 2}
                fallbackColor={placeholderStyle.placeholderColor}
                colors={[placeholderStyle.placeholderColorStart, placeholderStyle.placeholderColorEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View alignItems="center" justifyContent="center" width={props.size} height={props.size}>
                    <Text style={[styles.placeholderText, { fontSize: textSize }]}>{placeholderText}</Text>
                </View>
            </ZLinearGradient>
            {props.online && <View style={{ position: 'absolute', width: onlineSize, height: onlineSize, bottom: 0, right: 0, borderRadius: onlineSize / 2, borderColor: theme.backgroundColor, backgroundColor: theme.accentColor, borderWidth: onlineSize / 10 }} />}
        </View>
    );
})

export const ZAvatar = XMemo<ZAvatarProps>((props) => {
    return (<XPAvatarInner {...props} />);
})