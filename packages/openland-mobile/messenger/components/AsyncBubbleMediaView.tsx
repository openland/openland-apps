import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { Image, Platform } from 'react-native';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncBubbleBorderView } from './AsyncBubbleBorderView';

const BubbleMaskImage: { [key in string]: NodeRequire } = {
    'incoming-after-bottom': require('assets/bubbles/incoming_mask_after_bottom.png'),
    'incoming-after-middle': require('assets/bubbles/incoming_mask_after_middle.png'),
    'incoming-after-top': require('assets/bubbles/incoming_mask_after_top.png'),
    'incoming-after': require('assets/bubbles/incoming_mask_after.png'),
    'incoming-before-bottom': require('assets/bubbles/incoming_mask_before_bottom.png'),
    'incoming-before-middle': require('assets/bubbles/incoming_mask_before_middle.png'),
    'incoming-before-top': require('assets/bubbles/incoming_mask_before_top.png'),
    'incoming-before': require('assets/bubbles/incoming_mask_before.png'),
    'incoming-bottom': require('assets/bubbles/incoming_mask_bottom.png'),
    'incoming-middle': require('assets/bubbles/incoming_mask_middle.png'),
    'incoming-top': require('assets/bubbles/incoming_mask_top.png'),
    'incoming': require('assets/bubbles/incoming_mask.png'),
    'outgoing-after-bottom': require('assets/bubbles/outgoing_mask_after_bottom.png'),
    'outgoing-after-middle': require('assets/bubbles/outgoing_mask_after_middle.png'),
    'outgoing-after-top': require('assets/bubbles/outgoing_mask_after_top.png'),
    'outgoing-after': require('assets/bubbles/outgoing_mask_after.png'),
    'outgoing-before-bottom': require('assets/bubbles/outgoing_mask_before_bottom.png'),
    'outgoing-before-middle': require('assets/bubbles/outgoing_mask_before_middle.png'),
    'outgoing-before-top': require('assets/bubbles/outgoing_mask_before_top.png'),
    'outgoing-before': require('assets/bubbles/outgoing_mask_before.png'),
    'outgoing-bottom': require('assets/bubbles/outgoing_mask_bottom.png'),
    'outgoing-middle': require('assets/bubbles/outgoing_mask_middle.png'),
    'outgoing-top': require('assets/bubbles/outgoing_mask_top.png'),
    'outgoing': require('assets/bubbles/outgoing_mask.png'),
};

const BubbleMaskImagePile: { [key in string]: { tl?: NodeRequire, tr?: NodeRequire, bl?: NodeRequire, br?: NodeRequire, l: NodeRequire, r: NodeRequire } } = {
    'outgoing-after-bottom': {
        l: require('assets/piles-bubbels/mask-bl-wide.png'),
        r: require('assets/piles-bubbels/mask-br-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'outgoing-after-middle': {
        l: require('assets/piles-bubbels/mask-bl-wide.png'),
        r: require('assets/piles-bubbels/mask-br-small.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-small.png'),
    },
    'outgoing-after-top': {
        l: require('assets/piles-bubbels/mask-bl-wide.png'),
        r: require('assets/piles-bubbels/mask-br-small.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-small.png'),
    },
    'outgoing-after': {
        l: require('assets/piles-bubbels/mask-bl-wide.png'),
        r: require('assets/piles-bubbels/mask-br-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'outgoing-before-bottom': {
        l: require('assets/piles-bubbels/mask-tl-wide.png'),
        r: require('assets/piles-bubbels/mask-tr-small.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-small.png'),
    },
    'outgoing-before-middle': {
        l: require('assets/piles-bubbels/mask-tl-wide.png'),
        r: require('assets/piles-bubbels/mask-tr-small.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-small.png'),
    },
    'outgoing-before-top': {
        l: require('assets/piles-bubbels/mask-tl-wide.png'),
        r: require('assets/piles-bubbels/mask-tr-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
    },
    'outgoing-before': {
        l: require('assets/piles-bubbels/mask-tl-wide.png'),
        r: require('assets/piles-bubbels/mask-tr-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
    },
    'outgoing-bottom': {
        l: require('assets/piles-bubbels/mask-left-wide-wide.png'),
        r: require('assets/piles-bubbels/mask-right-small-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-small.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'outgoing-middle': {
        l: require('assets/piles-bubbels/mask-left-wide-wide.png'),
        r: require('assets/piles-bubbels/mask-right-small-small.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-small.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-small.png'),
    },
    'outgoing-top': {
        l: require('assets/piles-bubbels/mask-left-wide-wide.png'),
        r: require('assets/piles-bubbels/mask-right-wide-small.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-small.png'),
    },
    'outgoing': {
        l: require('assets/piles-bubbels/mask-left-wide-wide.png'),
        r: require('assets/piles-bubbels/mask-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-after-bottom': {
        l: require('assets/piles-bubbels/mask-bl-wide.png'),
        r: require('assets/piles-bubbels/mask-br-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-after-middle': {
        l: require('assets/piles-bubbels/mask-bl-small.png'),
        r: require('assets/piles-bubbels/mask-br-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-small.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-after-top': {
        l: require('assets/piles-bubbels/mask-bl-small.png'),
        r: require('assets/piles-bubbels/mask-br-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-small.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-after': {
        l: require('assets/piles-bubbels/mask-bl-wide.png'),
        r: require('assets/piles-bubbels/mask-br-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-before-bottom': {
        l: require('assets/piles-bubbels/mask-tl-small.png'),
        r: require('assets/piles-bubbels/mask-tr-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-small.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
    },
    'incoming-before-middle': {
        l: require('assets/piles-bubbels/mask-tl-small.png'),
        r: require('assets/piles-bubbels/mask-tr-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-small.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
    },
    'incoming-before-top': {
        l: require('assets/piles-bubbels/mask-tl-wide.png'),
        r: require('assets/piles-bubbels/mask-tr-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
    },
    'incoming-before': {
        l: require('assets/piles-bubbels/mask-tl-wide.png'),
        r: require('assets/piles-bubbels/mask-tr-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
    },
    'incoming-bottom': {
        l: require('assets/piles-bubbels/mask-left-small-wide.png'),
        r: require('assets/piles-bubbels/mask-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-small.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-middle': {
        l: require('assets/piles-bubbels/mask-left-small-small.png'),
        r: require('assets/piles-bubbels/mask-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-small.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-small.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming-top': {
        l: require('assets/piles-bubbels/mask-left-wide-small.png'),
        r: require('assets/piles-bubbels/mask-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-small.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
    'incoming': {
        l: require('assets/piles-bubbels/mask-left-wide-wide.png'),
        r: require('assets/piles-bubbels/mask-right-wide-wide.png'),
        tl: require('assets/piles-bubbels/mask-tl-wide.png'),
        tr: require('assets/piles-bubbels/mask-tr-wide.png'),
        bl: require('assets/piles-bubbels/mask-bl-wide.png'),
        br: require('assets/piles-bubbels/mask-br-wide.png'),
    },
};

type PilePosition = 'l' | 'r' | 'tl' | 'tr' | 'bl' | 'br';

export const getPilePosition = (count: number, rowIndex: number, columnIndex: number): PilePosition | undefined => {
    if (count === 2) {
        return columnIndex === 0 ? 'l' : 'r';
    } else if (count === 3) {
        if (columnIndex === 0) {
            return 'l';
        } else {
            return rowIndex === 0 ? 'tr' : 'br';
        }
    } else if (count === 4) {
        if (columnIndex === 0) {
            return rowIndex === 0 ? 'tl' : 'bl';
        } else {
            return rowIndex === 0 ? 'tr' : 'br';
        }
    }
    return undefined;
};

interface AsyncBubbleMediaViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    hasTopContent: boolean;
    hasBottomContent: boolean;
    maskColor: string;
    borderColor: string;
    useBorder: boolean;
    pilePosition?: PilePosition;
    onPress?: (event: ASPressEvent) => void;
    onLongPress?: (event: ASPressEvent) => void;
}

export class AsyncBubbleMediaView extends React.PureComponent<AsyncBubbleMediaViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, hasTopContent, hasBottomContent, maskColor, borderColor, useBorder, pilePosition, onPress, onLongPress } = this.props;

        let bubbleRes = (isOut ? 'outgoing' : 'incoming');

        if (hasTopContent && hasBottomContent) {
            return (
                <ASFlex
                    flexGrow={1}
                    alignItems="stretch"
                    onPress={!useBorder ? onPress : undefined}
                    onLongPress={!useBorder ? onLongPress : undefined}
                >
                    {useBorder && (
                        <AsyncBubbleBorderView
                            isOut={isOut}
                            attachTop={attachTop}
                            attachBottom={attachBottom}
                            hasTopContent={hasTopContent}
                            hasBottomContent={hasBottomContent}
                            tintColor={borderColor}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    )}
                </ASFlex>
            );
        }

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

        let mask: NodeRequire | undefined = BubbleMaskImage[bubbleRes];

        if (pilePosition && BubbleMaskImagePile[bubbleRes]) {
            mask = BubbleMaskImagePile[bubbleRes][pilePosition];
        }
        let capInsets: { left: number, right: number, top: number, bottom: number };
        if (Platform.OS === 'ios') {
            capInsets = { top: 18, left: 18, right: 18, bottom: 18 };
        } else {
            capInsets = { top: 17, left: 17, right: 17, bottom: 17 };
        }

        const resolved = mask && Image.resolveAssetSource(mask);

        return (
            <ASFlex
                backgroundPatch={resolved && { source: resolved.uri, scale: resolved.scale, ...capInsets }}
                backgroundPatchTintColor={resolved && maskColor}
                flexGrow={1}
                alignItems="stretch"
                onPress={!useBorder ? onPress : undefined}
                onLongPress={!useBorder ? onLongPress : undefined}
            >
                {useBorder && (
                    <AsyncBubbleBorderView
                        isOut={isOut}
                        attachTop={attachTop}
                        attachBottom={attachBottom}
                        hasTopContent={hasTopContent}
                        hasBottomContent={hasBottomContent}
                        tintColor={borderColor}
                        pilePosition={pilePosition}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    />
                )}
            </ASFlex>
        );
    }
}