import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image } from 'react-native';

export class AsyncBubbleView extends React.PureComponent<{ isOut: boolean, compact: boolean, appearance?: 'media' | 'text' }> {
    render() {
        const isMedia = this.props.appearance === 'media';
        const compact = this.props.compact;
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
            <ASFlex marginRight={isMedia ? 8 : (compact ? 4 : 0)} marginLeft={isMedia ? 8 : (compact ? 4 : 0)} flexDirection="column" alignItems="stretch">
                <ASFlex backgroundPatch={{ source: Image.resolveAssetSource(image).uri, top: 20, left: 29, right: 29, bottom: 20 }} flexDirection="column" alignItems="stretch">
                    <ASFlex marginTop={contentInsets.top} marginBottom={contentInsets.bottom} marginLeft={contentInsets.left} marginRight={contentInsets.right} flexDirection="column" alignItems="stretch">
                        {this.props.children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}