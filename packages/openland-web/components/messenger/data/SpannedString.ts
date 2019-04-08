import { FullMessage_ServiceMessage_spans_MessageSpanMultiUserMention_users, FullMessage_ServiceMessage_spans_MessageSpanUserMention_user, FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room } from 'openland-api/Types';

export type SpannedStringSpanText = {
    type: 'text';
    text: string;
    textEmoji: any;

    isBig: boolean;
    isInsane: boolean;
    isRotating: boolean;
    isOnlyEmoji: boolean;
}

export type SpannedStringSpanUsers = {
    type: 'users';
    users: FullMessage_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
    child: SpannedString;
}

export type SpannedStringSpanUser = {
    type: 'user';
    user: FullMessage_ServiceMessage_spans_MessageSpanUserMention_user;
    child: SpannedString;
}

export type SpannedStringSpanGroup = {
    type: 'group';
    group: FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room;
    child: SpannedString;
}

export type SpannedStringSpanBold = {
    type: 'bold';
    child: SpannedString;
}

export type SpannedStringSpanLink = {
    type: 'link';
    url: string;
    child: SpannedString;
}

export type SpannedStringSpan = SpannedStringSpanText | SpannedStringSpanUsers | SpannedStringSpanUser | SpannedStringSpanGroup | SpannedStringSpanBold | SpannedStringSpanLink;

export interface SpannedString {
    spans: SpannedStringSpan[];
}