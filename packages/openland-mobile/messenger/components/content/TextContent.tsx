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

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}

export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        const { message, padded, theme, fontStyle, onUserPress, onGroupPress, emojiOnly } = this.props;

        return (
            <RenderSpans
                spans={message.textSpans}
                message={message}
                padded={emojiOnly ? false : padded !== false}
                textAlign={emojiOnly && message.isOut ? 'right' : 'left'}
                fontStyle={fontStyle}
                theme={theme}
                maxWidth={(message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - 40}
                insetLeft={contentInsetsHorizontal}
                insetRight={contentInsetsHorizontal}
                insetTop={8}
                emojiOnly={emojiOnly}
            
                onUserPress={onUserPress}
                onGroupPress={onGroupPress}
            />
        )
    }
}