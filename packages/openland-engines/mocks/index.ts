import UUID from 'uuid/v4';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';

// TODO add attaches document/photo
export const users = ['Ada Poole', 'Mario McGee', 'Stanley Hughes', 'Dora Becker'];

export const messages = [
    'With 13 state-of-the-art ski lifts and a selection of choices for both snowboarders and skiers Tremblant attained its reputation through daring, varied runs catering',
    'Tremblant is based in Canada and has over 90 runs servicing millions of skiers each year',
    'Maui hotel or Maui condo? It’s the burning question on everyones mind! What should you do? Maui hotel? Maui condo? Which should you choose?',
    'show me',
    'Stu Unger is one of the biggest superstars to have immerged from the professional poker world. Besides being a true poker genius and a three time World Series of Poker champion',
];

export const replies = [
    'Stu Unger is one of the biggest superstars to have immerged from the professional poker…',
    'Hi everybody!',
    'Families traveling with kids will find Amboseli national park',
];

export const chats = ['Friends of Openland', 'Isaiah Schultz', 'YC Applicants help', 'Dora Becker'];

export const commentedOn = [
    'Hi everybody!',
    'how to improve your playing quality and even overall under and more some text later',
    'Families traveling with kids will find Amboseli national and more some text later',
    'Maui hotel or Maui condo? It’s the burning question on everyt and more some text later',
    'Stu Unger is one of the biggest superstars to have immigr and more some text later',
];

export const createSender = ({ userName }: { userName: string }) => {
    return {
        id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
        name: userName,
        firstName: userName ? userName.split(' ')[0] : '',
        lastName: userName ? userName.split(' ')[1] : '',
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
    };
};

export const notificationUnsupported = (id: string): NotificationsDataSourceItem => {
    const date = Date.now();

    return {
        ...convertMessage({
            __typename: 'GeneralMessage',
            id: id,
            date: date,
            sender: {
                __typename: 'User',
                id: 'mJMk3EkbzBs7dyPBPp9Bck0pxn',
                name: 'Openland Support',
                firstName: 'Openland Support',
                photo: 'https://ucarecdn.com/db12b7df-6005-42d9-87d6-46f15dd5b880/',
                online: true,
                isYou: false,
                isBot: false,
                lastName: null,
                email: null,
                lastSeen: null,
                shortname: null,
                primaryOrganization: null,
                primaryBadge: null
            },
            senderBadge: null,
            message: '*Notification type not supported*\nNotification is not supported on your version of Openland. Please update the app to view it.',
            fallback: '*Notification type not supported*\nNotification is not supported on your version of Openland. Please update the app to view it.',
            edited: false,
            commentsCount: 0,
            attachments: [],
            quotedMessages: [],
            reactions: [],
            spans: [{__typename: 'MessageSpanBold', offset: 0, length: 33}],
        }),

        notificationId: id,
        notificationType: 'unsupported',

        // rewrite results from convertMessage
        key: id,
        isOut: false
    };
};

export const createMessage = ({
    user,
    text,
    replyQuoteText,
}: {
    user: any;
    text: string;
    replyQuoteText: string;
}) => {
    return {
        id: UUID(),
        date: '1559662023052',
        sender: createSender({ userName: user }),
        message: text,
        fallback: text,
        edited: false,
        commentsCount: 0,
        attachments: [],
        quotedMessages: [],
        reactions: [],
        __typename: 'GeneralMessage',
        spans: [],
        replyQuoteText,
    };
};

export const createComments =  () => [
    createMessage({
        user: users[0],
        text: messages[0],
        replyQuoteText: replies[0],
    }) as any,
    createMessage({
        user: users[1],
        text: messages[1],
        replyQuoteText: replies[1],
    }) as any,
    createMessage({
        user: users[2],
        text: messages[2],
        replyQuoteText: replies[2],
    }) as any,
    createMessage({
        user: users[3],
        text: messages[3],
        replyQuoteText: replies[3],
    }) as any,
];