import * as React from 'react';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { View, Platform, Text, StyleSheet, TextStyle } from 'react-native';
import { XPImage } from './XPImage';
import { XPLinearGradient } from './XPLinearGradient';
import { XPStyles } from './XPStyles';
import { AndroidAliaser } from './AndroidAliaser';
import { createInterpolator } from 'openland-y-utils/createInterpolator';
import { YQuery } from 'openland-y-graphql/YQuery';
import { OnlineQuery } from 'openland-api';

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
    online?: boolean;
    userId?: string;
}

const placeholderSizeInterpolator = createInterpolator(
    [22, 28, 30, 36, 40, 56, 96],
    [12, 12, 13, 14, 16, 26, 28]
);

export class XPAvatarInner extends React.PureComponent<XPAvatarProps> {
    render() {
        let onlineSize = this.props.size / 4;
        if (this.props.src) {
            return (
                <View>
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
                    {this.props.online && <View style={{ position: 'absolute', zIndex: 100, width: onlineSize, height: onlineSize, left: this.props.size - onlineSize, top: this.props.size - onlineSize, borderRadius: onlineSize / 2, borderColor: '#fff', backgroundColor: 'rgb(92,212,81)', borderWidth: onlineSize / 10 }} />}
                </View>
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
        let textSize = Math.round(placeholderSizeInterpolator(this.props.size));
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
                    <View position="absolute" left={10} top={10} borderRadius={5} backgroundColor="#00ff22" />
                </XPLinearGradient>
                {this.props.online && <View style={{ position: 'absolute', width: onlineSize, height: onlineSize, bottom: 0, right: 0, borderRadius: onlineSize / 2, borderColor: '#fff', backgroundColor: 'rgb(92,212,81)', borderWidth: onlineSize / 10 }} />}

            </AndroidAliaser>
        );
    }
}

export class XPAvatar extends React.PureComponent<XPAvatarProps> {
    render() {
        return (
            <>
                {this.props.userId && <YQuery query={OnlineQuery} variables={{ userId: this.props.userId }}>
                    {online => (
                        < XPAvatarInner
                            {...this.props}
                            online={online.data && online.data.user && online.data.user.online}
                        />
                    )}

                </YQuery>}
                {!this.props.userId && < XPAvatarInner
                    {...this.props}
                />}
            </>
        );
    }
}