import * as React from 'react';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { View, Platform, Text, StyleSheet, TextStyle } from 'react-native';
import { ZImage } from './ZImage';
import { ZLinearGradient } from './visual/ZLinearGradient.native';
import { ZStyles } from './ZStyles';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export type ZAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

const styles = StyleSheet.create({
    placeholderText: {
        maxWidth: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff'
    } as TextStyle
});

export interface ZAvatarProps {
    size: ZAvatarSize;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
    online?: boolean;
}

export const avatarSizes: { [key in ZAvatarSize]: { size: number, placeholder: number, dotSize: number, dotPosition: number, dotBorderWidth: number }} = {
    'x-small': { size: 16, placeholder: 8, dotSize: 6, dotPosition: 0, dotBorderWidth: 1 },
    'small': { size: 32, placeholder: 16, dotSize: 10, dotPosition: 0, dotBorderWidth: 2 },
    'medium': { size: 40, placeholder: 20, dotSize: 12, dotPosition: 0, dotBorderWidth: 2 },
    'large': { size: 56, placeholder: 24, dotSize: 12, dotPosition: 2, dotBorderWidth: 2 },
    'x-large': { size: 72, placeholder: 32, dotSize: 14, dotPosition: 4, dotBorderWidth: 2 },
    'xx-large': { size: 96, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
};

const ZAvatarInner = XMemo<ZAvatarProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { size, placeholder: textSize, dotSize, dotPosition, dotBorderWidth } = avatarSizes[props.size];

    if (props.src && !props.src.startsWith('ph://')) {
        return (
            <View>
                <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.backgroundPrimary }}>
                    <ZImage highPriority={true} imageSize={{ width: 256, height: 256 }} width={size} height={size} source={props.src} borderRadius={size / 2} />
                    {Platform.OS !== 'android' && <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: size / 2, borderColor: '#000', opacity: 0.03, borderWidth: 0.5 }} />}
                </View>
                {props.online && <View style={{ position: 'absolute', width: dotSize, height: dotSize, bottom: dotPosition, right: dotPosition, borderRadius: dotSize / 2, borderColor: theme.backgroundPrimary, backgroundColor: theme.accentPrimary, borderWidth: dotBorderWidth }} />}
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

    return (
        <View>
            <ZLinearGradient
                width={size}
                height={size}
                borderRadius={size / 2}
                fallbackColor={placeholderStyle.placeholderColor}
                colors={[placeholderStyle.placeholderColorStart, placeholderStyle.placeholderColorEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View alignItems="center" justifyContent="center" width={size} height={size}>
                    <Text style={[styles.placeholderText, { fontSize: textSize }]}>{placeholderText}</Text>
                </View>
            </ZLinearGradient>
            {props.online && <View style={{ position: 'absolute', width: dotSize, height: dotSize, bottom: dotPosition, right: dotPosition, borderRadius: dotSize / 2, borderColor: theme.backgroundPrimary, backgroundColor: theme.accentPrimary, borderWidth: dotBorderWidth }} />}
        </View>
    );
});

export const ZAvatar = XMemo<ZAvatarProps>((props) => {
    return (<ZAvatarInner {...props} />);
});