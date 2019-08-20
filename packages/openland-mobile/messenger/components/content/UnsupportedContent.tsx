import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SpanType } from 'openland-y-utils/spans/Span';
import { AsyncBubbleView } from '../AsyncBubbleView';
import { TextContent } from './TextContent';

const text = 'Message is not supported on your version of Openland.\nPlease update the app to view it.';

interface UnsupportedContentProps {
    message: DataSourceMessageItem;
    theme: ThemeGlobal;
}

export const UnsupportedContent = React.memo((props: UnsupportedContentProps) => {
    const { message, theme } = props;
    const { isOut, attachTop, attachBottom, } = message;

    return (
        <AsyncBubbleView key="message-unsupported" isOut={isOut} attachTop={attachTop} attachBottom={attachBottom} colorIn={theme.bubbleIn} colorOut={theme.bubbleOut}>
            <ASFlex overlay={true} flexGrow={1} alignItems="center">
                <ASText marginLeft={Platform.OS === 'ios' ? 15 : 2} fontSize={30}>{randomEmptyPlaceholderEmoji()}</ASText>
            </ASFlex>
            <ASFlex flexDirection="column" marginLeft={Platform.OS === 'ios' ? 45 : 50}>
                <TextContent
                    emojiOnly={false}
                    theme={theme}
                    fontStyle="italic"
                    message={{ ...message, spans: undefined, textSpans: [{ type: SpanType.italic, offset: 0, length: text.length, childrens: [{ type: SpanType.text, text, offset: 0, length: text.length }] }], attachments: [], text }}
                    onUserPress={() => { return; }}
                    onGroupPress={() => { return; }}
                    onDocumentPress={() => { return; }}
                    onMediaPress={() => { return; }}
                />
            </ASFlex>
        </AsyncBubbleView>
    );
});