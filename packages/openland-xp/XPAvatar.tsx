import * as React from 'react';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { View, Platform, Text, StyleSheet, TextStyle } from 'react-native';
import { XPImage } from './XPImage';
import { XPLinearGradient } from './XPLinearGradient';
import { XPStyles } from './XPStyles';
import { XPRoundedMask } from './XPRoundedMask';
import { AndroidAliaser } from './AndroidAliaser';

const styles = StyleSheet.create({
    placeholderText: {
        maxWidth: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff'
    } as TextStyle
});
export interface XPAvatarProps {
    size: number;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
}
export class XPAvatar extends React.PureComponent<XPAvatarProps> {
    render() {
        if (this.props.src) {
            return (
                <AndroidAliaser
                    width={this.props.size}
                    height={this.props.size}
                    borderRadius={this.props.size / 2}
                >
                    <View style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2, backgroundColor: '#fff' }}>
                        <XPImage highPriority={true} imageSize={{ width: 256, height: 256 }} width={this.props.size} height={this.props.size} source={this.props.src} borderRadius={this.props.size / 2} />
                        {Platform.OS !== 'android' && <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: this.props.size / 2, borderColor: '#000', opacity: 0.03, borderWidth: 0.5 }} />}
                    </View>
                </AndroidAliaser>
            );
        }
        let placeholderIndex = 0;
        if (this.props.placeholderKey) {
            placeholderIndex = doSimpleHash(this.props.placeholderKey);
        }
        let placeholderStyle = XPStyles.avatars[placeholderIndex % XPStyles.avatars.length];
        let placeholderText = '?';
        if (this.props.placeholderTitle) {
            placeholderText = extractPlaceholder(this.props.placeholderTitle);
        }
        let textSize = 28;
        if (this.props.size === 40) {
            textSize = 16;
        }
        if (this.props.size === 32) {
            textSize = 14;
        }
        if (this.props.size === 28) {
            textSize = 12;
        }
        if (this.props.size === 30) {
            textSize = 13;
        }
        if (this.props.size === 56) {
            textSize = 26;
        }
        if (this.props.size === 96) {
            textSize = 28;
        }
        if (this.props.size === 36) {
            textSize = 14;
        }

        return (
            <AndroidAliaser
                width={this.props.size}
                height={this.props.size}
                borderRadius={this.props.size / 2}
            >
                <XPLinearGradient
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
                </XPLinearGradient>
            </AndroidAliaser>
        );
    }
}