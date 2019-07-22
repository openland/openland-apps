import {
    RoomChat_room,
    Room_room_SharedRoom,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/Types';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

export const addMemberModalChatId = 'QwJ9g164eMTdJlDDj9qzS115XW';

export const egoarkaUser = {
    id: 'b5OljEldvVcmdakbEKexIgW5Vl',
    fullName: 'Egor Terletsky',
    name: 'Egor Terletsky',
    firstName: 'Egor',
};
export const fredUser = {
    id: 'Jl1k97keDvsLjdwXPRKytboAyq',
    fullName: 'Fred Morozov',
    photo: 'c39d275a-8b1c-419f-a663-cfae8c471191',
};

export const rfzzOrgId = 'g09417DZAkuwvlvO35kzIdkZJv';

export const webInboxChat = {
    id: 'QwJ9g164eMTdJlDDj9qzS115XW',
    title: '@openland/web_inbox',
} as Room_room_SharedRoom;

// @ts-ignore
export const pinMessage = {
    id: 'PWzy7ZpyglCDW7DRbmPAUK0PKj',
    date: '1563388493656',
    sender: {
        id: 'b5OljEldvVcmdakbEKexIgW5Vl',
        name: 'Egor Terletsky',

        __typename: 'User',
    },
    senderBadge: null,
    message: 'fooobar mess',
    fallback: 'asdsad',
    edited: false,
    commentsCount: 0,
    attachments: [],
    quotedMessages: [],
    reactions: [],
    __typename: 'GeneralMessage',
    spans: [],
} as Room_room_SharedRoom_pinnedMessage_GeneralMessage;

// @ts-ignore
export const gfdsgsRoom = {
    id: 'LOLqoerbApTJmXYl4ZeZTEmdDe',
    pinnedMessage: {
        id: 'PWzy7ZpyglCDW7DRbmPAUK0PKj',
        date: '1563388493656',
        sender: {
            id: 'b5OljEldvVcmdakbEKexIgW5Vl',
            name: 'Egor Terletsky',
            __typename: 'User',
        },
        quotedMessages: [],
        reactions: [],
        __typename: 'GeneralMessage',
        spans: [],
    },
    __typename: 'SharedRoom',
} as RoomChat_room;

// @ts-ignore
export const editFormMessage = {
    chatId: 'LOLqoerbApTJmXYl4ZeZTEmdDe',
    type: 'message',
    id: 'avWx9nBx1WSwpPqKqLOQtVpPQl',
    date: 1563780504499,
    isOut: true,
    senderId: 'b5OljEldvVcmdakbEKexIgW5Vl',
    senderName: 'Egor Terletsky',
    senderPhoto: 'https://ucarecdn.com/5983af68-7c03-4363-92eb-01202eb724a2/-/crop/512x512/0,0/',
    sender: {
        id: 'b5OljEldvVcmdakbEKexIgW5Vl',
        name: 'Egor Terletsky',
        firstName: 'Egor',
        lastName: 'Terletsky',
        photo: 'https://ucarecdn.com/5983af68-7c03-4363-92eb-01202eb724a2/-/crop/512x512/0,0/',
        email: 'egoarka@gmail.com',
        online: true,
        lastSeen: 'online',
        isYou: true,
        isBot: false,
        shortname: 'egoarka',
        primaryBadge: null,
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
    text: 'ffffff',
    isSending: false,
    attachTop: false,
    attachBottom: false,
    reactions: [
        {
            user: {
                id: 'b5OljEldvVcmdakbEKexIgW5Vl',
                name: 'Egor Terletsky',
                firstName: 'Egor',
                lastName: 'Terletsky',
                photo:
                    'https://ucarecdn.com/5983af68-7c03-4363-92eb-01202eb724a2/-/crop/512x512/0,0/',
                email: 'egoarka@gmail.com',
                online: true,
                lastSeen: 'online',
                isYou: true,
                isBot: false,
                shortname: 'egoarka',
                primaryBadge: null,
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
            reaction: '👍',
            __typename: 'ModernMessageReaction',
        },
    ],
    isService: false,
    attachments: [],
    reply: [],
    replyTextSpans: [],
    isEdited: false,
    spans: [],
    commentsCount: 0,
    fallback: 'ffffff',
    textSpans: [
        {
            type: 'root',
            offset: 0,
            length: 6,
            textRaw: 'ffffff',
            text: {
                type: 'span',
                key: null,
                ref: null,
                props: {
                    children: ['ffffff'],
                },
                _owner: null,
                _store: {},
            },
            childrens: [
                {
                    type: 'text',
                    textRaw: 'ffffff',
                    text: {
                        type: 'span',
                        key: null,
                        ref: null,
                        props: {
                            children: ['ffffff'],
                        },
                        _owner: null,
                        _store: {},
                    },
                    length: 6,
                    offset: 0,
                },
            ],
        },
    ],
    senderNameEmojify: {
        type: 'span',
        key: null,
        ref: null,
        props: {
            children: ['Egor Terletsky'],
        },
        _owner: null,
        _store: {},
    },
    replySenderNameEmojify: [],
    dataKey: 'avWx9nBx1WSwpPqKqLOQtVpPQl',
} as DataSourceMessageItem;
