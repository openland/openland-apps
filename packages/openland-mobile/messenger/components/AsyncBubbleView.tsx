import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';

export const bubbleMaxWidth = Math.min(Dimensions.get('window').width - 74 - 12, 360);
export const bubbleMaxWidthIncoming = Math.min(Dimensions.get('window').width - 56 - 36, 360);

export const contentInsetsHorizontal = 12;
export const contentInsetsTop = Platform.OS === 'ios' ? 6 : 7;
export const contentInsetsBottom = Platform.OS === 'ios' ? 8 : 7;

interface AsyncBubbleViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    color: string;
    width?: number;

    hasAfter?: boolean;
    hasBefore?: boolean;
}

export class AsyncBubbleView extends React.PureComponent<AsyncBubbleViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, color, width, hasAfter = false, hasBefore = false, children } = this.props;
        let bubbleRes = isOut ? 'outgoing' : 'incoming';

        if (!hasBefore && hasAfter) {
            bubbleRes += '-before';
        } else if (hasBefore && !hasAfter) {
            bubbleRes += '-after';
        }

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

                            bubbleRes === 'incoming-after' ? require('assets/bubbles/incoming_after.png') :
                                bubbleRes === 'incoming-after-top' ? require('assets/bubbles/incoming_after_top.png') :
                                    bubbleRes === 'incoming-after-middle' ? require('assets/bubbles/incoming_after_middle.png') :
                                        bubbleRes === 'incoming-after-bottom' ? require('assets/bubbles/incoming_after_bottom.png') :

                                            bubbleRes === 'incoming-before' ? require('assets/bubbles/incoming_before.png') :
                                                bubbleRes === 'incoming-before-top' ? require('assets/bubbles/incoming_before_top.png') :
                                                    bubbleRes === 'incoming-before-middle' ? require('assets/bubbles/incoming_before_middle.png') :
                                                        bubbleRes === 'incoming-before-bottom' ? require('assets/bubbles/incoming_before_bottom.png') :

                                                            bubbleRes === 'outgoing' ? require('assets/bubbles/outgoing.png') :
                                                                bubbleRes === 'outgoing-top' ? require('assets/bubbles/outgoing_top.png') :
                                                                    bubbleRes === 'outgoing-middle' ? require('assets/bubbles/outgoing_middle.png') :
                                                                        bubbleRes === 'outgoing-bottom' ? require('assets/bubbles/outgoing_bottom.png') :

                                                                            bubbleRes === 'outgoing-after' ? require('assets/bubbles/outgoing_after.png') :
                                                                                bubbleRes === 'outgoing-after-top' ? require('assets/bubbles/outgoing_after_top.png') :
                                                                                    bubbleRes === 'outgoing-after-middle' ? require('assets/bubbles/outgoing_after_middle.png') :
                                                                                        bubbleRes === 'outgoing-after-bottom' ? require('assets/bubbles/outgoing_after_bottom.png') :

                                                                                            bubbleRes === 'outgoing-before' ? require('assets/bubbles/outgoing_before.png') :
                                                                                                bubbleRes === 'outgoing-before-top' ? require('assets/bubbles/outgoing_before_top.png') :
                                                                                                    bubbleRes === 'outgoing-before-middle' ? require('assets/bubbles/outgoing_before_middle.png') :
                                                                                                        bubbleRes === 'outgoing-before-bottom' ? require('assets/bubbles/outgoing_before_bottom.png') :

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
