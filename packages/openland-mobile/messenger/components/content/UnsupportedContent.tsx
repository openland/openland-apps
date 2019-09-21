import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SpanType } from 'openland-y-utils/spans/Span';
import { AsyncBubbleView, bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal } from '../AsyncBubbleView';
import { TextContent } from './TextContent';
import { createSimpleSpan } from 'openland-y-utils/spans/processSpans';

const text = 'Message is not supported on your version of Openland.\nPlease update the app to view it.';

interface UnsupportedContentProps {
    message: DataSourceMessageItem;
    theme: ThemeGlobal;
}

export const UnsupportedContent = React.memo((props: UnsupportedContentProps) => {
    const { message, theme } = props;
    const { isOut, attachTop, attachBottom, } = message;

    return (
        <AsyncBubbleView key="message-unsupported" isOut={isOut} attachTop={attachTop} attachBottom={attachBottom} color={theme.bubble(isOut).backgroundPrimary}>
            <ASFlex overlay={true} flexGrow={1} alignItems="center">
                <ASText marginLeft={Platform.OS === 'ios' ? 15 : 2} fontSize={30}>{randomEmptyPlaceholderEmoji()}</ASText>
            </ASFlex>
            <ASFlex flexDirection="column" marginLeft={Platform.OS === 'ios' ? 45 : 50}>
                <TextContent
                    emojiOnly={false}
                    theme={theme}
                    fontStyle="italic"
                    maxWidth={(message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - (contentInsetsHorizontal * 2) - (Platform.OS === 'ios' ? 45 : 50)}
                    message={{
                        ...message,
                        spans: undefined,
                        textSpans: createSimpleSpan(text, SpanType.italic),
                        attachments: [],
                        text
                    }}
                    onUserPress={() => { return; }}
                    onGroupPress={() => { return; }}
                    onDocumentPress={() => { return; }}
                    onMediaPress={() => { return; }}
                />
            </ASFlex>
        </AsyncBubbleView>
    );
});