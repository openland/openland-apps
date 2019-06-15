import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AppTheme } from 'openland-mobile/themes/themes';
import { bubbleMaxWidth, contentInsetsHorizontal, bubbleMaxWidthIncoming } from '../AsyncBubbleView';
import { RenderSpans } from './AsyncRenderSpans';

interface TextContentProps {
    message: DataSourceMessageItem;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
    theme: AppTheme;
    emojiOnly: boolean;
    maxWidth?: number;
    compensateBubble?: boolean;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}

export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        const { message, padded, theme, fontStyle, onUserPress, onGroupPress, emojiOnly, maxWidth, compensateBubble } = this.props;

        return (
            <RenderSpans
                spans={message.textSpans}
                message={message}
                padded={compensateBubble ? (emojiOnly ? false : padded !== false) : false}
                textAlign={emojiOnly && message.isOut ? 'right' : 'left'}
                fontStyle={fontStyle}
                theme={theme}
                maxWidth={maxWidth ? maxWidth : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - 40}
                insetLeft={compensateBubble ? contentInsetsHorizontal : 16}
                insetRight={compensateBubble ? contentInsetsHorizontal : 16}
                insetTop={8}
                emojiOnly={emojiOnly}
            
                onUserPress={onUserPress}
                onGroupPress={onGroupPress}
            />
        )
    }
}