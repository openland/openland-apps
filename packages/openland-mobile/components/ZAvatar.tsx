import * as React from 'react';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { View, Text, StyleSheet, TextStyle, Image } from 'react-native';
import { ZImage } from './ZImage';
import { ZLinearGradient } from './visual/ZLinearGradient.native';
import { ZStyles } from './ZStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { PlaceholderOrange } from 'openland-y-utils/themes/placeholders';

export type ZAvatarSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large';

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
    photo?: string | null;
    id?: string | null;
    title?: string | null;
    online?: boolean;
    savedMessages?: boolean;
}

export const avatarSizes: { [key in ZAvatarSize]: { size: number, placeholder: number, dotSize: number, dotPosition: number, dotBorderWidth: number, iconSize: number } } = {
    'x-small': { size: 24, placeholder: 12, dotSize: 6, dotPosition: 0, dotBorderWidth: 1, iconSize: 8 },
    'small': { size: 32, placeholder: 14, dotSize: 10, dotPosition: 0, dotBorderWidth: 2, iconSize: 16 },
    'medium': { size: 40, placeholder: 17, dotSize: 12, dotPosition: 0, dotBorderWidth: 2, iconSize: 20 },
    'large': { size: 56, placeholder: 24, dotSize: 12, dotPosition: 2, dotBorderWidth: 2, iconSize: 24 },
    'x-large': { size: 72, placeholder: 34, dotSize: 14, dotPosition: 4, dotBorderWidth: 2, iconSize: 32 },
    'xx-large': { size: 96, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2, iconSize: 40 },
    'xxx-large': { size: 128, placeholder: 64, dotSize: 16, dotPosition: 10, dotBorderWidth: 2, iconSize: 64 },
    // legacy
    'xx-small': { size: 16, placeholder: 8, dotSize: 6, dotPosition: 0, dotBorderWidth: 1, iconSize: 8 },
};

export const getPlaceholderColors = (id: string) => {
    let placeholderIndex = 0;
    if (id) {
        placeholderIndex = doSimpleHash(id);
    }
    return ZStyles.avatars[placeholderIndex % ZStyles.avatars.length];
};

const ZAvatarInner = React.memo((props: ZAvatarProps) => {
    const theme = React.useContext(ThemeContext);
    const { size, placeholder: textSize, dotSize, dotPosition, dotBorderWidth, iconSize } = avatarSizes[props.size];

    if (props.savedMessages) {
        return (
            <View>
                <ZLinearGradient
                    width={size}
                    height={size}
                    borderRadius={size / 2}
                    fallbackColor={PlaceholderOrange.start}
                    colors={[PlaceholderOrange.start, PlaceholderOrange.end]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View alignItems="center" justifyContent="center" width={size} height={size}>
                        <Image source={require('assets/ic-bookmark-filled-16.png')} style={{ tintColor: theme.foregroundContrast, width: iconSize, height: iconSize }} />
                    </View>
                </ZLinearGradient>
            </View>
        );
    }

    if (props.photo && !props.photo.startsWith('ph://')) {
        return (
            <View>
                <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.backgroundTertiaryTrans }}>
                    <ZImage highPriority={true} imageSize={{ width: 256, height: 256 }} width={size} height={size} source={props.photo} borderRadius={size / 2} />
                    <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: size / 2, borderColor: theme.border, borderWidth: 0.5 }} />
                </View>
                {props.online && (
                    <View position="absolute" width={dotSize} height={dotSize} bottom={dotPosition} right={dotPosition} borderRadius={dotSize / 2} padding={dotBorderWidth} backgroundColor={theme.backgroundPrimary}>
                        <View flexGrow={1} borderRadius={(dotSize - (dotBorderWidth * 2)) / 2} backgroundColor={theme.accentPrimary} />
                    </View>
                )}
            </View>
        );
    }

    let placeholderText = '?';
    if (props.title) {
        placeholderText = extractPlaceholder(props.title);
    }
    let placeholderColors = getPlaceholderColors(props.id || '');
    return (
        <View>
            <ZLinearGradient
                width={size}
                height={size}
                borderRadius={size / 2}
                fallbackColor={placeholderColors.placeholderColor}
                colors={[placeholderColors.placeholderColorStart, placeholderColors.placeholderColorEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View alignItems="center" justifyContent="center" width={size} height={size}>
                    <Text style={[styles.placeholderText, { fontSize: textSize }]} allowFontScaling={false}>{placeholderText}</Text>
                </View>
            </ZLinearGradient>
            {props.online && (
                <View position="absolute" width={dotSize} height={dotSize} bottom={dotPosition} right={dotPosition} borderRadius={dotSize / 2} padding={dotBorderWidth} backgroundColor={theme.backgroundPrimary}>
                    <View flexGrow={1} borderRadius={(dotSize - (dotBorderWidth * 2)) / 2} backgroundColor={theme.accentPrimary} />
                </View>
            )}
        </View>
    );
});

export const ZAvatar = React.memo((props: ZAvatarProps) => {
    return (<ZAvatarInner {...props} />);
});