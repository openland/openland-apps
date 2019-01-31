import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';

const bubbleMaxWidth = Math.min(Dimensions.get('window').width - 60, 400);
export class AsyncBubbleView extends React.PureComponent<{ isOut: boolean, compact: boolean, appearance?: 'media' | 'text' }> {
    render() {
        const isMedia = this.props.appearance === 'media';
        const compact = this.props.compact;
        const image = isMedia
            ? require('assets/chat-bubble-media.png')
            : (compact
                ? (this.props.isOut ? require('assets/bubble.png') : require('assets/chat-bubble-in-compact.png'))
                : (this.props.isOut ? require('assets/bubble_tail.png') : require('assets/chat-bubble-in.png')));

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            if (isMedia) {
                capInsets = { top: 12, left: 12, right: 12, bottom: 12 };
            } else {
                if (this.props.isOut) {
                    capInsets = { top: 22, left: 22, right: 22, bottom: 22 };
                } else {
                    capInsets = { top: 20, left: 29, right: 20, bottom: 20 };
                }
            }
        } else {
            if (isMedia) {
                capInsets = { top: 12, left: 12, right: 12, bottom: 12 };
            } else {
                if (this.props.isOut) {
                    capInsets = { top: 21, left: 21, right: 21, bottom: 21 };
                } else {
                    capInsets = { top: 19, left: 29, right: 19, bottom: 19 };
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
            <ASFlex flexDirection="column" alignItems="stretch" maxWidth={bubbleMaxWidth}>
                <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} flexDirection="column" alignItems="stretch" >
                    <ASFlex marginTop={contentInsets.top + (this.props.isOut ? 4 : 0)} marginBottom={contentInsets.bottom + (this.props.isOut ? 2 : 0)} marginLeft={contentInsets.left + (this.props.isOut ? 7 : 0)} marginRight={contentInsets.right + (this.props.isOut ? 3 : 0)} flexDirection="column" alignItems="stretch">
                        {this.props.children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}