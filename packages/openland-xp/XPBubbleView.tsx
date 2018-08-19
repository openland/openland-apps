import * as React from 'react';
import { View } from 'react-native';
import { XPNinePatch } from './XPNinePatch';

export interface XPBubbleViewProps {
    isOut: boolean;
    appearance?: 'text' | 'media';
    attach?: 'bottom' | 'top' | 'both';
}

export class XPBubbleView extends React.PureComponent<XPBubbleViewProps> {
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

        // Buble 9-patch config
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

        // Rendering
        return (
            <View
                style={{
                    paddingTop: topPadding,
                    paddingBottom: bottomPadding,
                    paddingRight: isMedia ? 8 : (compact ? 4 : 0),
                    paddingLeft: isMedia ? 8 : (compact ? 4 : 0),
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
                            marginBottom: contentInsets.bottom,
                            marginTop: contentInsets.top,
                            marginLeft: contentInsets.left,
                            marginRight: contentInsets.right
                        }}
                    >
                        {this.props.children}
                    </View>
                </View>
            </View>
        );
    }
}