import {
    RoomChat_room,
    Room_room_SharedRoom,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/Types';

export const addMemberModalChatId = 'QwJ9g164eMTdJlDDj9qzS115XW';

export const egoarkaId = 'b5OljEldvVcmdakbEKexIgW5Vl';
export const fredUser = {
    id: 'Jl1k97keDvsLjdwXPRKytboAyq',
    fullName: 'Fred Morozov',
    photo:
        'https://ucarecdn.com/c39d275a-8b1c-419f-a663-cfae8c471191/-/crop/1200x1200/0,0/-/scale_crop/512x512/center/-/format/jpeg/-/progressive/yes/',
};

export const rfzzOrgId = 'g09417DZAkuwvlvO35kzIdkZJv';

export const webInboxChat = {
    id: 'QwJ9g164eMTdJlDDj9qzS115XW',
    kind: 'PUBLIC',
    isChannel: false,
    title: '@openland/web_inbox',
    photo: 'https://ucarecdn.com/e4f6cced-d9ea-4034-9112-513788f980ac/-/crop/534x534/208,0/',
    socialImage: null,
    description: 'ssasas',
    organization: {
        id: '61gk9KRrl9ComJkvYnvdcddr4o',
        name: 'Openland',
        photo: 'https://ucarecdn.com/25629a3c-1ebe-4d49-8560-9df3b92ade3a/-/crop/1024x1024/0,0/',
        isMine: true,
        membersCount: 14,
        shortname: 'openland',
        about: 'Professional messenger of the future',
        isOwner: false,
        isAdmin: true,
        isCommunity: false,
        __typename: 'Organization',
    },
    membership: 'MEMBER',
    role: 'MEMBER',
    membersCount: 11,
    featuredMembersCount: 0,
    members: [],
    requests: [],
    settings: {
        id: 'ygJDZXYBbEtwV1y37XLbFk9Q51',
        mute: false,
        __typename: 'RoomUserNotificaionSettings',
    },
    canEdit: true,
    canSendMessage: true,
    welcomeMessage: {
        isOn: false,
        sender: null,
        message: '',
        __typename: 'WelcomeMessage',
    },
    pinnedMessage: null,
    myBadge: null,
    __typename: 'SharedRoom',
} as Room_room_SharedRoom;

export const pinMessage = {
    id: 'PWzy7ZpyglCDW7DRbmPAUK0PKj',
    date: '1563388493656',
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
        primaryOrganization: {
            id: '61gk9KRrl9ComJkvYnvdcddr4o',
            name: 'Openland',
            photo:
                'https://ucarecdn.com/25629a3c-1ebe-4d49-8560-9df3b92ade3a/-/crop/1024x1024/0,0/',
            shortname: 'openland',
            about: 'Professional messenger of the future',
            isCommunity: false,
            __typename: 'Organization',
        },
        __typename: 'User',
    },
    senderBadge: null,
    message: 'asdsad',
    fallback: 'asdsad',
    edited: false,
    commentsCount: 0,
    attachments: [],
    quotedMessages: [],
    reactions: [],
    __typename: 'GeneralMessage',
    spans: [],
} as Room_room_SharedRoom_pinnedMessage_GeneralMessage;

export const gfdsgsRoom = {
    id: 'LOLqoerbApTJmXYl4ZeZTEmdDe',
    kind: 'GROUP',
    title: 'gfdsgs',
    membership: 'MEMBER',
    isChannel: true,
    role: 'OWNER',
    canEdit: true,
    photo: 'ph://3',
    membersCount: 1,
    pinnedMessage: {
        id: 'PWzy7ZpyglCDW7DRbmPAUK0PKj',
        date: '1563388493656',
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
            primaryOrganization: {
                id: '61gk9KRrl9ComJkvYnvdcddr4o',
                name: 'Openland',
                photo:
                    'https://ucarecdn.com/25629a3c-1ebe-4d49-8560-9df3b92ade3a/-/crop/1024x1024/0,0/',
                shortname: 'openland',
                about: 'Professional messenger of the future',
                isCommunity: false,
                __typename: 'Organization',
            },
            __typename: 'User',
        },
        senderBadge: null,
        message: 'asdsad',
        fallback: 'asdsad',
        edited: false,
        commentsCount: 0,
        attachments: [],
        quotedMessages: [],
        reactions: [],
        __typename: 'GeneralMessage',
        spans: [],
    },
    __typename: 'SharedRoom',
} as RoomChat_room;
