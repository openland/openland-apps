import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform } from 'react-native';

export class AsyncBubbleView extends React.PureComponent<{ isOut: boolean, compact: boolean, appearance?: 'media' | 'text' }> {
    render() {
        const isMedia = this.props.appearance === 'media';
        const compact = this.props.compact;
        const image = isMedia
            ? require('assets/chat-bubble-media.png')
            : (compact
                ? (this.props.isOut ? require('assets/chat-bubble-out-compact.png') : require('assets/chat-bubble-in-compact.png'))
                : (this.props.isOut ? require('assets/chat-bubble-out.png') : require('assets/chat-bubble-in.png')));

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            if (isMedia) {
                capInsets = { top: 12, left: 12, right: 12, bottom: 12 };
            } else {
                if (this.props.isOut) {
                    capInsets = { top: 20, left: 20, right: 29, bottom: 20 };
                } else {
                    capInsets = { top: 20, left: 29, right: 20, bottom: 20 };
                }
            }
        } else {
            if (isMedia) {
                capInsets = { top: 12, left: 12, right: 12, bottom: 12 };
            } else {
                if (this.props.isOut) {
                    capInsets = { top: 5, left: 5, bottom: 5, right: 10 };
                } else {
                    capInsets = { top: 5, left: 10, bottom: 5, right: 5 };
                }
            }
        }

        let contentInsets: { left: number, right: number, top: number, bottom: number };
        if (isMedia) {
            contentInsets = { left: 2, right: 2, top: 2, bottom: 2 };
        } else {
            if (this.props.isOut) {
                contentInsets = { left: 1, right: 5, top: 1, bottom: 1 };
            } else {
                contentInsets = { left: 5, right: 1, top: 1, bottom: 1 };
            }
        }

        let resolved = Image.resolveAssetSource(image);
        return (
            <ASFlex marginRight={isMedia ? 5 : 0} marginLeft={isMedia ? 5 : 0} flexDirection="column" alignItems="stretch">
                <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} flexDirection="column" alignItems="stretch">
                    <ASFlex marginTop={contentInsets.top} marginBottom={contentInsets.bottom} marginLeft={contentInsets.left} marginRight={contentInsets.right} flexDirection="column" alignItems="stretch">
                        {this.props.children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}