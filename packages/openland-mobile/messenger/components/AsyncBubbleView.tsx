import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';
import { ASText } from 'react-native-async-view/ASText';

export const bubbleMaxWidth = Math.min(Dimensions.get('window').width - 50 - 10, 400);
export const bubbleMaxWidthIncoming = Math.min(Dimensions.get('window').width - 50 - 45, 400);

export let contentInsetsHorizontal = 13;
export let contentInsetsTop = 8;
export let contentInsetsBottom = 9;

export class AsyncBubbleView extends React.PureComponent<{ isOut: boolean, compact: boolean, appearance?: 'media' | 'text', colorIn: string, backgroundColor: string, width?: number, pair?: 'top' | 'bottom' }> {
    render() {

        let bubbleRes = this.props.isOut ? 'outgoing' : 'incoming';
        bubbleRes += !this.props.compact && this.props.pair !== 'top' ? '-tail' : '';
        bubbleRes += this.props.pair === 'bottom' ? '-bottom' : this.props.pair === 'top' ? '-top' : '';

        const image =
            bubbleRes === 'incoming' ? require('assets/bubble-incoming.png') :
                bubbleRes === 'incoming-bottom' ? require('assets/bubble-incoming-mid.png') :
                    bubbleRes === 'incoming-top' ? require('assets/bubble-incoming-pair.png') :
                        bubbleRes === 'incoming-tail' ? require('assets/bubble-incoming-tail.png') :
                            bubbleRes === 'incoming-tail-bottom' ? require('assets/bubble-incoming-tail-pair.png') :

                                bubbleRes === 'outgoing' ? require('assets/bubble-outgoing.png') :
                                    bubbleRes === 'outgoing-bottom' ? require('assets/bubble-outgoing-mid.png') :
                                        bubbleRes === 'outgoing-top' ? require('assets/bubble-outgoing-pair.png') :
                                            bubbleRes === 'outgoing-tail' ? require('assets/bubble-outgoing-tail.png') :
                                                bubbleRes === 'outgoing-tail-bottom' ? require('assets/bubble-outgoing-tail-pair.png') :

                                                    require('assets/bubble-incoming.png');

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            if (this.props.isOut) {
                capInsets = { top: 18, left: 25, right: 24, bottom: 18 };
            } else {
                capInsets = { top: 18, left: 23, right: 18, bottom: 18 };
            }
        } else {
            if (this.props.isOut) {
                capInsets = { top: 17, left: 24, right: 24, bottom: 17 };
            } else {
                capInsets = { top: 17, left: 22, right: 17, bottom: 17 };
            }
        }
        let contentInsets: { left: number, right: number, top: number, bottom: number };

        let insetsTop = this.props.pair === 'bottom' ? 5 : 8;
        let insetsBottom = 9;
        if (this.props.isOut) {
            contentInsets = { left: 6 + contentInsetsHorizontal, right: 6 + contentInsetsHorizontal, top: insetsTop, bottom: insetsBottom };
        } else {
            contentInsets = { left: 5 + contentInsetsHorizontal, right: contentInsetsHorizontal, top: insetsTop, bottom: insetsBottom };
        }

        let resolved = Image.resolveAssetSource(image);
        return (
            <ASFlex backgroundColor={this.props.appearance === 'media' && this.props.isOut ? this.props.colorIn : undefined} flexDirection="column" alignItems="stretch" width={this.props.width ? this.props.width + (this.props.isOut ? 12 : 5) : undefined} maxWidth={(this.props.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming)} >
                <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} flexDirection="column" alignItems="stretch" backgroundPatchTintColor={this.props.isOut ? this.props.backgroundColor : this.props.colorIn}>
                    <ASFlex marginTop={contentInsets.top} marginBottom={contentInsets.bottom} marginLeft={contentInsets.left} marginRight={contentInsets.right} flexDirection="column" alignItems="stretch" >
                        {this.props.children}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}