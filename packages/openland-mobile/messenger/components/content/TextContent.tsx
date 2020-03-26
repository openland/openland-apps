import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { bubbleMaxWidth, contentInsetsHorizontal, bubbleMaxWidthIncoming, contentInsetsTop } from '../AsyncBubbleView';
import { RenderSpans } from './AsyncRenderSpans';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface TextContentProps {
    message: DataSourceMessageItem;
    fontStyle?: 'italic' | 'normal';
    theme: ThemeGlobal;
    emojiOnly: boolean;
    maxWidth?: number;
    width?: number;
    compensateBubble?: boolean;
    hasPurchase?: boolean;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}

export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        const { message, theme, fontStyle, onUserPress, onGroupPress, emojiOnly, hasPurchase, maxWidth, width, compensateBubble, onOrganizationPress } = this.props;

        return (
            <RenderSpans
                spans={message.textSpans}
                message={message}
                padded={compensateBubble ? (emojiOnly ? false : true) : false}
                textAlign={emojiOnly && message.isOut ? 'right' : 'left'}
                fontStyle={fontStyle}
                theme={theme}
                maxWidth={maxWidth ? maxWidth : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - (contentInsetsHorizontal * 2)}
                width={width}
                insetLeft={compensateBubble ? contentInsetsHorizontal : 16}
                insetRight={compensateBubble ? contentInsetsHorizontal : 16}
                insetVertical={contentInsetsTop}
                emojiOnly={emojiOnly}
                hasPurchase={hasPurchase}

                onUserPress={onUserPress}
                onGroupPress={onGroupPress}
                onOrganizationPress={onOrganizationPress}
            />
        );
    }
}