import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';
import { messageBgColor } from './AsyncMessageView';

export const bubbleMaxWidth = Math.min(Dimensions.get('window').width - 50 - 10, 400);
export const bubbleMaxWidthIncoming = Math.min(Dimensions.get('window').width - 50 - 45, 400);
export class AsyncBubbleView extends React.PureComponent<{ isOut: boolean, compact: boolean, appearance?: 'media' | 'text', colorIn: string }> {
    render() {
        const isMedia = this.props.appearance === 'media';
        const compact = this.props.compact;
        const image = isMedia
            ? require('assets/chat-bubble-media.png')
            : (compact
                ? (this.props.isOut ? require('assets/bubble-outgoing.png') : require('assets/bubble-incoming.png'))
                : (this.props.isOut ? require('assets/bubble-outgoing-tail.png') : require('assets/bubble-incoming-tail.png')));

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            if (isMedia) {
                capInsets = { top: 12, left: 12, right: 12, bottom: 12 };
            } else {
                if (this.props.isOut) {
                    capInsets = { top: 18, left: 25, right: 24, bottom: 18 };
                } else {
                    capInsets = { top: 18, left: 23, right: 18, bottom: 18 };
                }
            }
        } else {
            if (isMedia) {
                capInsets = { top: 12, left: 12, right: 12, bottom: 12 };
            } else {
                if (this.props.isOut) {
                    capInsets = { top: 17, left: 24, right: 24, bottom: 17 };
                } else {
                    capInsets = { top: 17, left: 22, right: 17, bottom: 17 };
                }
            }
        }
        let contentInsets: { left: number, right: number, top: number, bottom: number };
        let contentInsetsHorizontal = 13;
        let contentInsetsTop = 8;
        let contentInsetsBottom = 9;
        if (isMedia) {
            contentInsets = { left: 2, right: 2, top: 2, bottom: 2 };
        } else {
            if (this.props.isOut) {
                contentInsets = { left: 6 + contentInsetsHorizontal, right: 6 + contentInsetsHorizontal, top: contentInsetsTop, bottom: contentInsetsBottom };
            } else {
                contentInsets = { left: 5 + contentInsetsHorizontal, right: contentInsetsHorizontal, top: contentInsetsTop, bottom: contentInsetsBottom };
            }
        }

        let resolved = Image.resolveAssetSource(image);
        return (
            <ASFlex flexDirection="column" alignItems="stretch" maxWidth={this.props.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming} backgroundColor={isMedia ? messageBgColor : undefined}>
                <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} flexDirection="column" alignItems="stretch" backgroundPatchTintColor={this.props.isOut ? undefined : this.props.colorIn}>
                    <ASFlex marginTop={contentInsets.top} marginBottom={contentInsets.bottom} marginLeft={contentInsets.left} marginRight={contentInsets.right} flexDirection="column" alignItems="stretch" >
                        {this.props.children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}