import * as React from 'react';
import { XView } from 'react-mental';
import UUID from 'uuid/v4';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { convertMessage } from 'openland-web/components/messenger/message/content/comments/convertMessage';
import { useClient } from 'openland-web/utils/useClient';
import { MyNotifications_myNotifications_content_comment_comment } from 'openland-api/Types';

// add attaches document/photo
const users = ['Ada Poole', 'Isaiah Schultz', 'Stanley Hughes', 'Dora Becker'];

const messages = [
    'With 13 state-of-the-art ski lifts and a selection of choices for both snowboarders and skiers Tremblant attained its reputation through daring, varied runs catering',
    'Tremblant is based in Canada and has over 90 runs servicing millions of skiers each year',
    'Maui hotel or Maui condo? It’s the burning question on everyones mind! What should you do? Maui hotel? Maui condo? Which should you choose?',
    'show me',
    'Stu Unger is one of the biggest superstars to have immerged from the professional poker world. Besides being a true poker genius and a three time World Series of Poker champion',
];

const chats = ['Friends of Openland', 'Isaiah Schultz', 'YC Applicants help', 'Dora Becker'];

const commentedOn = [
    'Hi everybody!',
    'how to improve your playing quality and even overall under and more some text later',
    'Families traveling with kids will find Amboseli national and more some text later',
    'Maui hotel or Maui condo? It’s the burning question on everyt and more some text later',
    'Stu Unger is one of the biggest superstars to have immigr and more some text later',
];

const senders = [
    {
        id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
        name: 'Sergey Lapin',
        firstName: 'Sergey',
        lastName: 'Lapin',
        photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
        email: 'lapanoid@gmail.com',
        online: true,
        lastSeen: 'online',
        isYou: true,
        isBot: false,
        shortname: 'sergey',
        primaryOrganization: {
            id: '61gk9KRrl9ComJkvYnvdcddr4o',
            name: 'Openland',
            photo:
                'https://ucarecdn.com/25629a3c-1ebe-4d49-8560-9df3b92ade3a/-/crop/1024x1024/0,0/',
            isCommunity: false,
            __typename: 'Organization',
        },
        __typename: 'User',
    },
];

const createMessage = ({ text }: { text: string }) => {
    return {
        id: UUID(),
        date: '1559662023052',
        sender: senders[0],
        message: text,
        fallback: text,
        edited: false,
        commentsCount: 0,
        attachments: [],
        quotedMessages: [],
        reactions: [],
        __typename: 'GeneralMessage',
        spans: [],
    };
};

const hackChangeCommentIdToMessageId = ({
    item,
    messageId,
}: {
    item: MyNotifications_myNotifications_content_comment_comment & { isSubscribedMessageComments: boolean };
    messageId: string;
}): MyNotifications_myNotifications_content_comment_comment & { isSubscribedMessageComments: boolean } => {
    return { ...item, id: messageId };
};

export const CommentsNotifications = () => {
    const client = useClient();
    const notifications = client.useMyNotifications({
        first: 100,
    });

    const comments = notifications.myNotifications
        .filter(({ content }) => {
            return !!content;
        })
        .map(item => {
            const { content } = item;

            return {
                ...content!![0]!!.comment!!.comment,
                peerId: content!![0]!!.peer!!.peerRoot.id,
                isSubscribedMessageComments: !!content!![0]!!.peer!!.subscription!!,
            };
        });

    let testMessages: MyNotifications_myNotifications_content_comment_comment[] = [];

    if (comments) {
        testMessages = comments;
    }

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
                        return (
                            <MessageComponent
                                key={key}
                                message={convertDsMessage(
                                    convertMessage(
                                        hackChangeCommentIdToMessageId({
                                            item,
                                            messageId: item.peerId,
                                        }),
                                    ),
                                )}
                                noSelector
                                isCommentNotification
                            />
                        );
                    })}
                </XScrollView3>
            </XView>
        </XView>
    );
};
