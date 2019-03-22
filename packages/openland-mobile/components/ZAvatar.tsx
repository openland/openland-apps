import * as React from 'react';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { View, Platform, Text, StyleSheet, TextStyle } from 'react-native';
import { createInterpolator } from 'openland-y-utils/createInterpolator';
import { ZImage } from './ZImage';
import { ZLinearGradient } from './visual/ZLinearGradient.native';
import { ZStyles } from './ZStyles';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

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

class XPAvatarInner extends React.PureComponent<ZAvatarProps> {
    render() {
        let onlineSize = this.props.size / 4;
        if (this.props.src && !this.props.src.startsWith('ph://')) {
            return (
                <View>
                    <View style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2, backgroundColor: '#fff' }}>
                        <ZImage highPriority={true} imageSize={{ width: 256, height: 256 }} width={this.props.size} height={this.props.size} source={this.props.src} borderRadius={this.props.size / 2} />
                        {Platform.OS !== 'android' && <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: this.props.size / 2, borderColor: '#000', opacity: 0.03, borderWidth: 0.5 }} />}
                    </View>
                    {this.props.online && <View style={{ position: 'absolute', width: onlineSize, height: onlineSize, bottom: 0, right: 0, borderRadius: onlineSize / 2, borderColor: '#fff', backgroundColor: '#0084fe', borderWidth: onlineSize / 10 }} />}
                </View>
            );
        }
        let placeholderIndex = 0;
        if (this.props.placeholderKey) {
            placeholderIndex = doSimpleHash(this.props.placeholderKey);
        }
        let placeholderStyle = ZStyles.avatars[placeholderIndex % ZStyles.avatars.length];
        let placeholderText = '?';
        if (this.props.placeholderTitle) {
            placeholderText = extractPlaceholder(this.props.placeholderTitle);
        }
        let textSize = Math.round(placeholderSizeInterpolator(this.props.size));
        return (
            <View>
                <ZLinearGradient
                    width={this.props.size}
                    height={this.props.size}
                    borderRadius={this.props.size / 2}
                    fallbackColor={placeholderStyle.placeholderColor}
                    colors={[placeholderStyle.placeholderColorStart, placeholderStyle.placeholderColorEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View alignItems="center" justifyContent="center" width={this.props.size} height={this.props.size}>
                        <Text style={[styles.placeholderText, { fontSize: textSize }]}>{placeholderText}</Text>
                    </View>
                </ZLinearGradient>
                {this.props.online && <View style={{ position: 'absolute', width: onlineSize, height: onlineSize, bottom: 0, right: 0, borderRadius: onlineSize / 2, borderColor: '#fff', backgroundColor: '#0084fe', borderWidth: onlineSize / 10 }} />}
            </View>
        );
    }
}

export const ZAvatar = XMemo<ZAvatarProps>((props) => {
    return (<XPAvatarInner {...props} />);
})