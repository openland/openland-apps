import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';

export const bubbleMaxWidth = Math.min(Dimensions.get('window').width - 50 - 10, 400);
export const bubbleMaxWidthIncoming = Math.min(Dimensions.get('window').width - 50 - 45, 400);

export let contentInsetsHorizontal = 13;
export let contentInsetsTop = 8;
export let contentInsetsBottom = 9;

interface AsyncBubbleViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    appearance?: 'media' | 'text';
    colorIn: string;
    colorOut: string;
    backgroundColor: string;
    width?: number;
}

export class AsyncBubbleView extends React.PureComponent<AsyncBubbleViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, appearance, colorIn, colorOut, backgroundColor, width } = this.props;

        let bubbleRes = this.props.isOut ? 'outgoing' : 'incoming';

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
            if (this.props.isOut) {
                capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
            } else {
                capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
            }
        } else {
            if (this.props.isOut) {
                capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
            } else {
                capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
            }
        }
        let contentInsets: { left: number, right: number, top: number, bottom: number };

        let insetsTop = 8;
        let insetsBottom = 9;
        if (this.props.isOut) {
            contentInsets = { left: contentInsetsHorizontal, right: contentInsetsHorizontal, top: insetsTop, bottom: insetsBottom };
        } else {
            contentInsets = { left: contentInsetsHorizontal, right: contentInsetsHorizontal, top: insetsTop, bottom: insetsBottom };
        }

        let resolved = Image.resolveAssetSource(image);
        return (
            <ASFlex flexDirection="column" alignItems="stretch" width={this.props.width ? this.props.width + (this.props.isOut ? 12 : 5) : undefined} maxWidth={(this.props.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming)} >
                <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} flexDirection="column" alignItems="stretch" backgroundPatchTintColor={this.props.isOut ? this.props.colorOut : this.props.colorIn}>
                    <ASFlex marginTop={contentInsets.top} marginBottom={contentInsets.bottom} marginLeft={contentInsets.left} marginRight={contentInsets.right} flexDirection="column" alignItems="stretch" >
                        {this.props.children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}