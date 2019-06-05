import * as React from 'react';
import { XView } from 'react-mental';
import { MessageListComponent } from 'openland-web/components/messenger/view/MessageListComponent';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { XScrollView3 } from 'openland-x/XScrollView3';

const testMessages = [
    {
        chatId: '61MyVnm7k3IlVW0xzRdAH3k4r5',
        type: 'message',
        id: 'jZOxeaJxrqiLgQdBbQKWhKm9Lj',
        key: 'jZOxeaJxrqiLgQdBbQKWhKm9Lj',
        date: 1559737819432,
        isOut: false,
        senderId: 'qlO16E1R0xIj6R14MjqXhW5PXQ',
        senderName: 'Coke',
        senderPhoto:
            'https://ucarecdn.com/026ae882-e177-4243-bb14-b6761db79fdd/-/crop/488x488/0,0/',
        sender: {
            id: 'qlO16E1R0xIj6R14MjqXhW5PXQ',
            name: 'Coke',
            firstName: 'Coke',
            lastName: null,
            photo: 'https://ucarecdn.com/026ae882-e177-4243-bb14-b6761db79fdd/-/crop/488x488/0,0/',
            email: null,
            online: false,
            lastSeen: 'never_online',
            isYou: false,
            isBot: true,
            shortname: 'buycoke',
            primaryOrganization: null,
            __typename: 'User',
        },
        text: 'Ща обед закончится 😱',
        isSending: false,
        attachTop: false,
        attachBottom: false,
        reactions: [],
        isService: false,
        attachments: [],
        reply: [],
        replyTextSpans: [],
        isEdited: false,
        spans: [],
        commentsCount: 0,
        fallback: 'Ща обед закончится 😱',
        textSpans: [],
        senderNameEmojify: <span>Coke</span>,
        replySenderNameEmojify: [],
    },
    {
        chatId: '61MyVnm7k3IlVW0xzRdAH3k4r5',
        type: 'message',
        id: 'M6KER0kEZdUQjxDnwpxafrqbBy',
        key: 'M6KER0kEZdUQjxDnwpxafrqbBy',
        date: 1559718011809,
        isOut: false,
        senderId: 'qlO16E1R0xIj6R14MjqXhW5PXQ',
        senderName: 'Coke',
        senderPhoto:
            'https://ucarecdn.com/026ae882-e177-4243-bb14-b6761db79fdd/-/crop/488x488/0,0/',
        sender: {
            id: 'qlO16E1R0xIj6R14MjqXhW5PXQ',
            name: 'Coke',
            firstName: 'Coke',
            lastName: null,
            photo: 'https://ucarecdn.com/026ae882-e177-4243-bb14-b6761db79fdd/-/crop/488x488/0,0/',
            email: null,
            online: false,
            lastSeen: 'never_online',
            isYou: false,
            isBot: true,
            shortname: 'buycoke',
            primaryOrganization: null,
            __typename: 'User',
        },
        text: 'Купите меня 🥺🙏🏻🤑',
        isSending: false,
        attachTop: false,
        attachBottom: false,
        reactions: [],
        isService: false,
        attachments: [],
        reply: [],
        replyTextSpans: [],
        isEdited: false,
        spans: [],
        commentsCount: 0,
        fallback: 'Купите меня 🥺🙏🏻🤑',
        textSpans: [],
        senderNameEmojify: <span>Coke</span>,
        replySenderNameEmojify: [],
    },
];

export const CommentsNotifications = () => {
    return (
        <XView alignItems="center" paddingTop={24}>
            <XView width={674}>
                <XView
                    opacity={0.9}
                    fontSize={18}
                    fontWeight={'600'}
                    lineHeight={1.33}
                    color="#000"
                >
                    Comments
                </XView>
                <XScrollView3 flexGrow={1} flexShrink={1}>
                    {testMessages.map((item: any, key: any) => {
                        return <MessageComponent key={key} message={item} isChannel={false} />;
                    })}
                </XScrollView3>
            </XView>
        </XView>
    );
};
