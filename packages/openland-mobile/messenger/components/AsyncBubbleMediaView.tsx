import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform, Dimensions } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/types';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';

interface AsyncBubbleMediaViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    theme: ThemeGlobal;
    width: number;
    height: number;
    onPress?: (event: ASPressEvent) => void;
}

export class AsyncBubbleMediaView extends React.PureComponent<AsyncBubbleMediaViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, theme, width, height, onPress } = this.props;

        let bubbleRes = (isOut ? 'outgoing' : 'incoming');

        if (attachTop && attachBottom) {
            bubbleRes += '-middle';
        } else if (!attachTop && attachBottom) {
            bubbleRes += '-top';
        } else if (attachTop && !attachBottom) {
            bubbleRes += '-bottom';
        }

        const image = theme.type === 'Light' ? (
            bubbleRes === 'incoming' ? require('assets/bubbles/incoming_media_light.png') :
                bubbleRes === 'incoming-top' ? require('assets/bubbles/incoming_media_top_light.png') :
                    bubbleRes === 'incoming-middle' ? require('assets/bubbles/incoming_media_middle_light.png') :
                        bubbleRes === 'incoming-bottom' ? require('assets/bubbles/incoming_media_bottom_light.png') :

                                bubbleRes === 'outgoing' ? require('assets/bubbles/outgoing_media_light.png') :
                                    bubbleRes === 'outgoing-top' ? require('assets/bubbles/outgoing_media_top_light.png') :
                                        bubbleRes === 'outgoing-middle' ? require('assets/bubbles/outgoing_media_middle_light.png') :
                                                bubbleRes === 'outgoing-bottom' ? require('assets/bubbles/outgoing_media_bottom_light.png') :

                                                    require('assets/bubbles/incoming_media_light.png')
            ) : (
                bubbleRes === 'incoming' ? require('assets/bubbles/incoming_media_dark.png') :
                    bubbleRes === 'incoming-top' ? require('assets/bubbles/incoming_media_top_dark.png') :
                        bubbleRes === 'incoming-middle' ? require('assets/bubbles/incoming_media_middle_dark.png') :
                            bubbleRes === 'incoming-bottom' ? require('assets/bubbles/incoming_media_bottom_dark.png') :
    
                                    bubbleRes === 'outgoing' ? require('assets/bubbles/outgoing_media_dark.png') :
                                        bubbleRes === 'outgoing-top' ? require('assets/bubbles/outgoing_media_top_dark.png') :
                                            bubbleRes === 'outgoing-middle' ? require('assets/bubbles/outgoing_media_middle_dark.png') :
                                                    bubbleRes === 'outgoing-bottom' ? require('assets/bubbles/outgoing_media_bottom_dark.png') :
    
                                                        require('assets/bubbles/incoming_media_dark.png')
            );

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
        } else {
            capInsets = { top: 17, left: 17, right: 17, bottom: 17 };
        }

        let resolved = Image.resolveAssetSource(image);
        return (
            <ASFlex backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }} width={width} height={height} onPress={onPress} />
        );
    }
}