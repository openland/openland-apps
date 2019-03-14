import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull_reactions, FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XAvatar } from 'openland-x/XAvatar';
import { Reactions } from '../../../MessageReaction';
import ReplyIcon from 'openland-icons/ic-reply1.svg';
import { XMemo } from 'openland-y-utils/XMemo';

const RespondWrapper = Glamorous(XHorizontal)({
    cursor: 'pointer',
    height: 23,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    '&:hover': {
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '&:hover.like svg > path': {
        fill: '#d75454',
        opacity: 1,
    },
    '& > div': {
        opacity: 0.3,
        fontSize: 13,
        lineHeight: 1.2,
        color: '#000',
    },
    '&.active > div': {
        opacity: 0.8,
    },
    '&.active svg > path': {
        fill: '#d75454',
        opacity: 1,
    },
});

const RespondUserWrapper = Glamorous(XMenuItem)({
    height: 36,
});

const RespondUserContent = Glamorous(XHorizontal)({
    '& > a': {
        height: 22,
    },
});

const RespondUserAvatar = Glamorous(XAvatar)({
    width: 24,
    height: 24,
    '& img': {
        width: '24px !important',
        height: '24px !important',
    },
});

const RespondUserName = Glamorous.div({
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.67,
    color: '#000',
});

const RespondUserCompany = Glamorous.div({
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.67,
    color: 'rgba(0, 0, 0, 0.4)',
});

const RactionsWrapper = Glamorous(XHorizontal)({
    '& .reactions-wrapper': {
        paddingTop: '0 !important',
    },
});

interface ReactionsRenderProps {
    messageId: string;
    userId: string;
    meId: string;
    reactions: FullMessage_GeneralMessage_reactions[];
}

export const ReactionsRender = XMemo<ReactionsRenderProps>(props => null);
