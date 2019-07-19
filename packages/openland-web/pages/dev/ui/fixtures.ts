import {
    RoomChat_room,
    Room_room_SharedRoom,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/Types';

export const addMemberModalChatId = 'QwJ9g164eMTdJlDDj9qzS115XW';

export const egoarkaUser = {
    id: 'b5OljEldvVcmdakbEKexIgW5Vl',
    fullName: 'Egor Terletsky',
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
