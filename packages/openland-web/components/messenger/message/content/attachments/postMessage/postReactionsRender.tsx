import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull_reactions } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XAvatar } from 'openland-x/XAvatar';
import { Reactions } from '../../../MessageReaction';
import ReplyIcon from 'openland-icons/ic-reply1.svg';

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
    reactions: MessageFull_reactions[];
}

export const ReactionsRender = React.memo<ReactionsRenderProps>(props => {
    let { reactions } = props;

    let respondUsers = reactions.filter(i => i.reaction === 'respondPost');
    let otherReactions = reactions.filter(i => i.reaction !== 'respondPost');

    let meSender = false;

    if (props.userId === props.meId) {
        meSender = true;
    }

    return (
        <RactionsWrapper
            justifyContent="flex-end"
            flexGrow={1}
            alignSelf="center"
            alignItems="center"
        >
            {respondUsers.length > 0 && meSender && (
                <XPopper
                    placement="top"
                    showOnHover={true}
                    contentContainer={<XMenuVertical />}
                    content={respondUsers.map((i, j) => (
                        <RespondUserWrapper
                            key={'post_respond' + j}
                            style="gray"
                            path={'/mail/u/' + i.user.id}
                        >
                            <RespondUserContent
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <XHorizontal separator={6} alignItems="center">
                                    <RespondUserAvatar
                                        style="user"
                                        cloudImageUuid={i.user.photo}
                                        objectId={i.user.id}
                                        objectName={i.user.name}
                                        size="m-small"
                                    />
                                    <XHorizontal separator={5} alignItems="center">
                                        <RespondUserName>{i.user.name}</RespondUserName>
                                        {i.user.primaryOrganization && (
                                            <RespondUserCompany>
                                                {i.user.primaryOrganization.name}
                                            </RespondUserCompany>
                                        )}
                                    </XHorizontal>
                                </XHorizontal>
                                {i.user.id !== props.meId && (
                                    <XButton
                                        style="primary"
                                        text="Message"
                                        size="tiny"
                                        path={'/mail/' + i.user.id}
                                    />
                                )}
                            </RespondUserContent>
                        </RespondUserWrapper>
                    ))}
                >
                    <RespondWrapper separator={2} alignItems="center">
                        <ReplyIcon />
                        <div>{respondUsers.length}</div>
                    </RespondWrapper>
                </XPopper>
            )}
            {otherReactions.length > 0 && (
                <Reactions
                    messageId={props.messageId}
                    reactions={otherReactions}
                    meId={props.meId}
                />
            )}
        </RactionsWrapper>
    );
});