import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform } from 'react-native';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';

const BubbleBorderImage: { [key in string]: NodeRequire } = {
    'incoming-after-bottom': require('assets/bubbles/incoming_border_after_bottom.png'),
    'incoming-after-middle': require('assets/bubbles/incoming_border_after_middle.png'),
    'incoming-after-top': require('assets/bubbles/incoming_border_after_top.png'),
    'incoming-after': require('assets/bubbles/incoming_border_after.png'),
    'incoming-before-bottom': require('assets/bubbles/incoming_border_before_bottom.png'),
    'incoming-before-middle': require('assets/bubbles/incoming_border_before_middle.png'),
    'incoming-before-top': require('assets/bubbles/incoming_border_before_top.png'),
    'incoming-before': require('assets/bubbles/incoming_border_before.png'),
    'incoming-bottom': require('assets/bubbles/incoming_border_bottom.png'),
    'incoming-center': require('assets/bubbles/incoming_border_center.png'),
    'incoming-middle': require('assets/bubbles/incoming_border_middle.png'),
    'incoming-top': require('assets/bubbles/incoming_border_top.png'),
    'incoming': require('assets/bubbles/incoming_border.png'),
    'outgoing-after-bottom': require('assets/bubbles/outgoing_border_after_bottom.png'),
    'outgoing-after-middle': require('assets/bubbles/outgoing_border_after_middle.png'),
    'outgoing-after-top': require('assets/bubbles/outgoing_border_after_top.png'),
    'outgoing-after': require('assets/bubbles/outgoing_border_after.png'),
    'outgoing-before-bottom': require('assets/bubbles/outgoing_border_before_bottom.png'),
    'outgoing-before-middle': require('assets/bubbles/outgoing_border_before_middle.png'),
    'outgoing-before-top': require('assets/bubbles/outgoing_border_before_top.png'),
    'outgoing-before': require('assets/bubbles/outgoing_border_before.png'),
    'outgoing-bottom': require('assets/bubbles/outgoing_border_bottom.png'),
    'outgoing-center': require('assets/bubbles/outgoing_border_center.png'),
    'outgoing-middle': require('assets/bubbles/outgoing_border_middle.png'),
    'outgoing-top': require('assets/bubbles/outgoing_border_top.png'),
    'outgoing': require('assets/bubbles/outgoing_border.png'),
};

const BubbleBorderImagePile: { [key in string]: { tl?: NodeRequire, tr?: NodeRequire, bl?: NodeRequire, br?: NodeRequire, l: NodeRequire, r: NodeRequire } } = {
    'outgoing-after-bottom': {
        l: require('assets/piles-bubbels/border-bl-wide.png'),
        r: require('assets/piles-bubbels/border-br-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'outgoing-after-middle': {
        l: require('assets/piles-bubbels/border-bl-wide.png'),
        r: require('assets/piles-bubbels/border-br-small.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-small.png'),
    },
    'outgoing-after-top': {
        l: require('assets/piles-bubbels/border-bl-wide.png'),
        r: require('assets/piles-bubbels/border-br-small.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-small.png'),
    },
    'outgoing-after': {
        l: require('assets/piles-bubbels/border-bl-wide.png'),
        r: require('assets/piles-bubbels/border-br-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'outgoing-before-bottom': {
        l: require('assets/piles-bubbels/border-tl-wide.png'),
        r: require('assets/piles-bubbels/border-tr-small.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-small.png'),
    },
    'outgoing-before-middle': {
        l: require('assets/piles-bubbels/border-tl-wide.png'),
        r: require('assets/piles-bubbels/border-tr-small.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-small.png'),
    },
    'outgoing-before-top': {
        l: require('assets/piles-bubbels/border-tl-wide.png'),
        r: require('assets/piles-bubbels/border-tr-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
    },
    'outgoing-before': {
        l: require('assets/piles-bubbels/border-tl-wide.png'),
        r: require('assets/piles-bubbels/border-tr-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
    },
    'outgoing-bottom': {
        l: require('assets/piles-bubbels/border-left-wide-wide.png'),
        r: require('assets/piles-bubbels/border-right-small-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-small.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'outgoing-middle': {
        l: require('assets/piles-bubbels/border-left-wide-wide.png'),
        r: require('assets/piles-bubbels/border-right-small-small.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-small.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-small.png'),
    },
    'outgoing-top': {
        l: require('assets/piles-bubbels/border-left-wide-wide.png'),
        r: require('assets/piles-bubbels/border-right-wide-small.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-small.png'),
    },
    'outgoing': {
        l: require('assets/piles-bubbels/border-left-wide-wide.png'),
        r: require('assets/piles-bubbels/border-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-after-bottom': {
        l: require('assets/piles-bubbels/border-bl-wide.png'),
        r: require('assets/piles-bubbels/border-br-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-after-middle': {
        l: require('assets/piles-bubbels/border-bl-small.png'),
        r: require('assets/piles-bubbels/border-br-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-small.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-after-top': {
        l: require('assets/piles-bubbels/border-bl-small.png'),
        r: require('assets/piles-bubbels/border-br-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-small.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-after': {
        l: require('assets/piles-bubbels/border-bl-wide.png'),
        r: require('assets/piles-bubbels/border-br-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-before-bottom': {
        l: require('assets/piles-bubbels/border-tl-small.png'),
        r: require('assets/piles-bubbels/border-tr-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-small.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
    },
    'incoming-before-middle': {
        l: require('assets/piles-bubbels/border-tl-small.png'),
        r: require('assets/piles-bubbels/border-tr-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-small.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
    },
    'incoming-before-top': {
        l: require('assets/piles-bubbels/border-tl-wide.png'),
        r: require('assets/piles-bubbels/border-tr-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
    },
    'incoming-before': {
        l: require('assets/piles-bubbels/border-tl-wide.png'),
        r: require('assets/piles-bubbels/border-tr-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
    },
    'incoming-bottom': {
        l: require('assets/piles-bubbels/border-left-small-wide.png'),
        r: require('assets/piles-bubbels/border-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-small.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-middle': {
        l: require('assets/piles-bubbels/border-left-small-small.png'),
        r: require('assets/piles-bubbels/border-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-small.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-small.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming-top': {
        l: require('assets/piles-bubbels/border-left-wide-small.png'),
        r: require('assets/piles-bubbels/border-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-small.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
    'incoming': {
        l: require('assets/piles-bubbels/border-left-wide-wide.png'),
        r: require('assets/piles-bubbels/border-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/border-tl-wide.png'),
        tr: require('assets/piles-bubbels/border-tr-wide.png'),
        bl: require('assets/piles-bubbels/border-bl-wide.png'),
        br: require('assets/piles-bubbels/border-br-wide.png'),
    },
};

type PilePosition = 'l' | 'r' | 'tl' | 'tr' | 'bl' | 'br';

interface AsyncBubbleBorderViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    hasTopContent: boolean;
    hasBottomContent: boolean;
    tintColor: string;
    pilePosition?: PilePosition;
    onPress?: (event: ASPressEvent) => void;
    onLongPress?: (event: ASPressEvent) => void;
}

export class AsyncBubbleBorderView extends React.PureComponent<AsyncBubbleBorderViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, hasTopContent, hasBottomContent, tintColor, pilePosition, onPress, onLongPress } = this.props;

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

        let border: NodeRequire | undefined = BubbleBorderImage[bubbleRes];

        if (pilePosition) {
            if (BubbleBorderImage[bubbleRes]) {
                border = BubbleBorderImage[bubbleRes][pilePosition];
            } else {
                border = require('assets/bubbles/incoming_border_center.png');
            }
        }

        const resolved = border && Image.resolveAssetSource(border);

        return (
            <ASFlex
                backgroundPatch={resolved && { source: resolved.uri, scale: resolved.scale, ...capInsets }}
                backgroundPatchTintColor={tintColor}
                onPress={onPress}
                onLongPress={onLongPress}
                flexGrow={1}
            />
        );
    }
}