import * as React from 'react';
import { View, Platform, Image } from 'react-native';
import { XPRoundedMask } from './XPRoundedMask';
import { XPNinePatch } from './XPNinePatch';

export function resolveCorners(isOut: boolean, attach?: 'bottom' | 'top' | 'both') {
    let topRightRadius = 18;
    let topLeftRadius = 18;
    let bottomRightRadius = 18;
    let bottomLeftRadius = 18;
    if (isOut) {
        if (attach === 'top' || attach === 'both') {
            topRightRadius = 4;
        }
        if (attach === 'bottom' || attach === 'both') {
            bottomRightRadius = 4;
        }
        if (attach !== 'bottom' && attach !== 'both') {
            bottomRightRadius = 0;
        }
    } else {
        if (attach === 'top' || attach === 'both') {
            topLeftRadius = 4;
        }
        if (attach === 'bottom' || attach === 'both') {
            bottomLeftRadius = 4;
        }
        if (attach !== 'bottom' && attach !== 'both') {
            bottomLeftRadius = 0;
        }
    }
    return {
        topRight: topRightRadius,
        topLeft: topLeftRadius,
        bottomRight: bottomRightRadius,
        bottomLeft: bottomLeftRadius
    };
}

export class XPBubbleView extends React.PureComponent<{ appearance?: 'text' | 'media', isOut: boolean, attach?: 'bottom' | 'top' | 'both' }> {
    render() {

        // Padding between bubbles
        let topPadding = 4;
        let bottomPadding = 4;
        if (this.props.attach === 'top' || this.props.attach === 'both' && this.props.appearance !== 'media') {
            topPadding = 0;
        }
        if (this.props.attach === 'bottom' || this.props.attach === 'both' && this.props.appearance !== 'media') {
            bottomPadding = 0;
        }

        // Content paddings
        let innerPaddingHorizontal = 0;
        let innerPaddingTop = 0;
        let innerPaddingBottom = 0;
        if (this.props.appearance === 'text') {
            innerPaddingHorizontal = 14;
            innerPaddingTop = 7;
            innerPaddingBottom = 7;
        }

        // Buble config
        const isMedia = this.props.appearance === 'media';
        const compact = (this.props.attach === 'bottom' || this.props.attach === 'both');
        const image = isMedia
            ? require('assets/chat-bubble-media.png')
            : (compact
                ? (this.props.isOut ? require('assets/chat-bubble-out-compact.png') : require('assets/chat-bubble-in-compact.png'))
                : (this.props.isOut ? require('assets/chat-bubble-out.png') : require('assets/chat-bubble-in.png')));
        const contentInsets = isMedia
            ? { left: 2, right: 2, top: 2, bottom: 2 }
            : compact
                ? { left: 4, right: 4, top: 2, bottom: 4 }
                : this.props.isOut ? { left: 4, right: 8, top: 2, bottom: 4 } : { left: 8, right: 4, top: 2, bottom: 4 };
        return (
            <View
                style={{
                    paddingTop: topPadding,
                    paddingBottom: bottomPadding,
                    paddingRight: isMedia ? 8 : (compact ? 4 : 0),
                    paddingLeft: isMedia ? 8 : (compact ? 4 : 0),
                    // paddingLeft: !this.props.isOut && (attachedBottom || this.props.appearance === 'media') ? 8 : 0,
                    // paddingRight: this.props.isOut && (attachedBottom || this.props.appearance === 'media') ? 8 : 0,
                    flexDirection: 'row'
                }}
            >
                <View style={{ marginBottom: -2 }}>
                    <XPNinePatch
                        source={image}
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        capInsets={{ top: 20, left: 29, right: 29, bottom: 20 }}
                    />
                    <View
                        style={{
                            marginBottom: innerPaddingBottom + contentInsets.bottom,
                            marginTop: innerPaddingTop + contentInsets.top,
                            marginLeft: innerPaddingHorizontal + contentInsets.left,
                            marginRight: innerPaddingHorizontal + contentInsets.right
                        }}
                    >
                        {this.props.children}
                    </View>
                </View>

                {/* {!this.props.isOut && !attachedBottom && this.props.appearance !== 'media' && <Image source={require('assets/bubble-corner.png')} style={{ alignSelf: 'flex-end' }} />}
                <XPRoundedMask
                    radius={radius}
                    backgroundColor={backgroundColor}
                    borderColor={(!this.props.isOut || this.props.appearance === 'media') ? 'rgba(220, 224, 231, 0.45)' : undefined}
                >
                    <View style={{ marginBottom: innerPaddingBottom, marginTop: innerPaddingTop, marginHorizontal: innerPaddingHorizontal, backgroundColor: (Platform.OS === 'macos' && this.props.appearance !== 'media') ? backgroundColor : undefined }}>
                        {this.props.children}
                        <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, borderColor: 'rgba(220, 224, 231, 0.45)' }} pointerEvents="none" />
                    </View>
                </XPRoundedMask>
                {this.props.isOut && !attachedBottom && this.props.appearance !== 'media' && <Image source={require('assets/bubble-corner-my.png')} style={{ alignSelf: 'flex-end' }} />} */}
            </View>
        );
    }
}