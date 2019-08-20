import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';

export const bubbleMaxWidth = Math.min(Dimensions.get('window').width - 74 - 12, 360);
export const bubbleMaxWidthIncoming = Math.min(Dimensions.get('window').width - 56 - 36, 360);

export const contentInsetsHorizontal = 12;
export const contentInsetsTop = 7;
export const contentInsetsBottom = 7;

interface AsyncBubbleViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    color: string;
    width?: number;
}

export class AsyncBubbleView extends React.PureComponent<AsyncBubbleViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, color, width, children } = this.props;
        let bubbleRes = isOut ? 'outgoing' : 'incoming';

        if (attachTop && attachBottom) {
            bubbleRes += '-middle';
        } else if (!attachTop && attachBottom) {
            bubbleRes += '-top';
        } else if (attachTop && !attachBottom) {
            bubbleRes += '-bottom';
        }

        const image =
            bubbleRes === 'incoming' ? require('assets/bubbles/incoming.png') :
                bubbleRes === 'incoming-top' ? require('assets/bubbles/incoming_top.png') :
                    bubbleRes === 'incoming-middle' ? require('assets/bubbles/incoming_middle.png') :
                        bubbleRes === 'incoming-bottom' ? require('assets/bubbles/incoming_bottom.png') :

                            bubbleRes === 'outgoing' ? require('assets/bubbles/outgoing.png') :
                                bubbleRes === 'outgoing-top' ? require('assets/bubbles/outgoing_top.png') :
                                    bubbleRes === 'outgoing-middle' ? require('assets/bubbles/outgoing_middle.png') :
                                        bubbleRes === 'outgoing-bottom' ? require('assets/bubbles/outgoing_bottom.png') :

                                            require('assets/bubbles/incoming.png');

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
        } else {
            capInsets = { top: 17, left: 17, right: 17, bottom: 17 };
        }
        let contentInsets: { left: number, right: number, top: number, bottom: number };

        if (isOut) {
            contentInsets = { left: contentInsetsHorizontal, right: contentInsetsHorizontal, top: contentInsetsTop, bottom: contentInsetsBottom };
        } else {
            contentInsets = { left: contentInsetsHorizontal, right: contentInsetsHorizontal, top: contentInsetsTop, bottom: contentInsetsBottom };
        }

        let resolved = Image.resolveAssetSource(image);
        return (
            <ASFlex flexDirection="column" alignItems="stretch" width={width} maxWidth={(isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming)}>
                <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} flexDirection="column" alignItems="stretch" backgroundPatchTintColor={color}>
                    <ASFlex marginTop={contentInsets.top} marginBottom={contentInsets.bottom} marginLeft={contentInsets.left} marginRight={contentInsets.right} flexDirection="column" alignItems="stretch">
                        {children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}