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

interface AsyncBubbleMediaViewProps {
    isOut: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    hasTopContent: boolean;
    hasBottomContent: boolean;
    maskColor: string;
    borderColor: string;
    useBorder: boolean;
    onPress?: (event: ASPressEvent) => void;
    onLongPress?: (event: ASPressEvent) => void;
}

export class AsyncBubbleMediaView extends React.PureComponent<AsyncBubbleMediaViewProps> {
    render() {
        const { isOut, attachTop, attachBottom, hasTopContent, hasBottomContent, maskColor, borderColor, useBorder, onPress, onLongPress } = this.props;

        let bubbleRes = (isOut ? 'outgoing' : 'incoming');

        if (hasTopContent && hasBottomContent) {
            return (
                <ASFlex
                    flexGrow={1}
                    alignItems="stretch"
                    onPress={!useBorder ? onPress : undefined}
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
                backgroundPatchTintColor={maskColor}
                flexGrow={1}
                alignItems="stretch"
                onPress={!useBorder ? onPress : undefined}
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
}