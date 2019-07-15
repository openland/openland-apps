import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform } from 'react-native';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';

const BubbleMaskImage: { [key in string]: NodeRequire } = {
    'incoming-after-bottom':  require('assets/bubbles/incoming_border_after_bottom.png'),
    'incoming-after-middle':  require('assets/bubbles/incoming_border_after_middle.png'),
    'incoming-after-top':     require('assets/bubbles/incoming_border_after_top.png'),
    'incoming-after':         require('assets/bubbles/incoming_border_after.png'),
    'incoming-before-bottom': require('assets/bubbles/incoming_border_before_bottom.png'),
    'incoming-before-middle': require('assets/bubbles/incoming_border_before_middle.png'),
    'incoming-before-top':    require('assets/bubbles/incoming_border_before_top.png'),
    'incoming-before':        require('assets/bubbles/incoming_border_before.png'),
    'incoming-bottom':        require('assets/bubbles/incoming_border_bottom.png'),
    'incoming-center':        require('assets/bubbles/incoming_border_center.png'),
    'incoming-middle':        require('assets/bubbles/incoming_border_middle.png'),
    'incoming-top':           require('assets/bubbles/incoming_border_top.png'),
    'incoming':               require('assets/bubbles/incoming_border.png'),
    'outgoing-after-bottom':  require('assets/bubbles/outgoing_border_after_bottom.png'),
    'outgoing-after-middle':  require('assets/bubbles/outgoing_border_after_middle.png'),
    'outgoing-after-top':     require('assets/bubbles/outgoing_border_after_top.png'),
    'outgoing-after':         require('assets/bubbles/outgoing_border_after.png'),
    'outgoing-before-bottom': require('assets/bubbles/outgoing_border_before_bottom.png'),
    'outgoing-before-middle': require('assets/bubbles/outgoing_border_before_middle.png'),
    'outgoing-before-top':    require('assets/bubbles/outgoing_border_before_top.png'),
    'outgoing-before':        require('assets/bubbles/outgoing_border_before.png'),
    'outgoing-bottom':        require('assets/bubbles/outgoing_border_bottom.png'),
    'outgoing-center':        require('assets/bubbles/outgoing_border_center.png'),
    'outgoing-middle':        require('assets/bubbles/outgoing_border_middle.png'),
    'outgoing-top':           require('assets/bubbles/outgoing_border_top.png'),
    'outgoing':               require('assets/bubbles/outgoing_border.png'),
};

interface AsyncBubbleBorderViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    hasTopContent: boolean;
    hasBottomContent: boolean;
    tintColor: string;
    onPress?: (event: ASPressEvent) => void;
}

export class AsyncBubbleBorderView extends React.PureComponent<AsyncBubbleBorderViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, hasTopContent, hasBottomContent, tintColor, onPress } = this.props;

        let bubbleRes = (isOut ? 'outgoing' : 'incoming');

        if (hasTopContent && hasBottomContent) {
            bubbleRes += '-center';
        } else {
            if (!hasTopContent && hasBottomContent) {
                bubbleRes += '-before';
            } else if (hasTopContent && !hasBottomContent) {
                bubbleRes += '-after';
            }
    
            if (attachTop && attachBottom) {
                bubbleRes += '-middle';
            } else if (!attachTop && attachBottom) {
                bubbleRes += '-top';
            } else if (attachTop && !attachBottom) {
                bubbleRes += '-bottom';
            }
        }

        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
        } else {
            capInsets = { top: 17, left: 17, right: 17, bottom: 17 };
        }

        const resolved = Image.resolveAssetSource(BubbleMaskImage[bubbleRes]);

        return (
            <ASFlex
                backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }}
                backgroundPatchTintColor={tintColor}
                onPress={onPress}
                flexGrow={1}
            />
        );
    }
}