
import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import CloseIcon from './components/icons/ic-close.svg';
import ProfileIcon from './components/icons/ic-profile.svg';
import { withChannelJoin } from '../../api/withChannelJoin';
import { withChannelJoinInviteLink } from '../../api/withChannelJoinInviteLink';
import { delayForewer } from 'openland-y-utils/timer';
import { TextRoom } from 'openland-text/TextRoom';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

const Root = Glamorous(XScrollView)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    height: '100%',
    flexShrink: 0,
    backgroundColor: '#ffffff'
});

const MainContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    padding: 28,

    '& > *': {
        zIndex: 2
    }
});

const Close = Glamorous(XLink)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: 'rgba(188, 195, 204, 0.14)',
    '&:hover': {
        backgroundColor: '#ecedf0'
    }
});

const UserInfoWrapper = Glamorous(XHorizontal)({
    margin: 'auto',
    marginTop: 65,
    marginBottom: 24,
    flexShrink: 0,
    '@media (max-height: 800px)': {
        marginTop: 15
    }
});

const InfoCardWrapper = Glamorous.div({
    borderRadius: 15,
    backgroundColor: '#fff',
    margin: 'auto',
    padding: '20px 20px 16px 28px',
    marginBottom: 32,
    flexShrink: 0,
    overflow: 'hidden',
    position: 'relative',
    maxWidth: 460,

    '&:before': {
        content: ' ',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        pointerEvents: 'none',
        border: 'solid 1px #ececec',
        borderRadius: 15,
    },

    '&:after': {
        content: ' ',
        display: 'block',
        width: 8,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#f9a540',
    }
});

const InfoCardHeader = Glamorous(XHorizontal)({
    borderBottom: '1px solid #ececec',
    paddingBottom: 20,
    marginBottom: 12,
});

const InfoCardBody = Glamorous.div({
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.8)'
});

const Text = Glamorous.div<{ width?: number, autoMargin?: boolean }>(props => ({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.8)',
    textAlign: 'center',
    width: props.width,
    margin: props.autoMargin ? 'auto' : undefined
}));

const RoomTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.9)',
    margin: '2px 0 8px'
});

const UserAvatar = Glamorous(XAvatar)({
    width: 20,
    height: 20,
    '& img': {
        width: '20px !important',
        height: '20px !important'
    }
});

const RoomAvatar = Glamorous(XAvatar)({
    width: 60,
    height: 60,
    '& img': {
        width: '60px !important',
        height: '60px !important'
    },
    '& > div': {
        borderRadius: 30
    }
});

const RoomCounter = Glamorous.div({
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    paddingLeft: 9,
    paddingRight: 11,
    display: 'inline-block',
    verticalAlign: 'top',
    fontSize: 0,
    lineHeight: 0,
    '& > span': {
        paddingTop: 3,
        paddingBottom: 3,
        display: 'inline-block',
        verticalAlign: 'top',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    '& > svg': {
        display: 'inline-block',
        verticalAlign: 'top',
        marginTop: 5,
        marginBottom: 6,
        marginRight: 5,

        '& path:last-child': {
            fill: 'rgba(0, 0, 0, 0.25)'
        }
    }
});

const ImageWrapper = Glamorous.div({
    height: 367,
    position: 'absolute',
    right: 0, bottom: 18, left: 0,
    overflow: 'hidden',
    'z-index': '1!important',
    '@media (max-height: 800px)': {
        height: 250
    }
});

const Image = Glamorous.div({
    position: 'absolute',
    top: 0, bottom: 0, left: '50%',
    width: 1242,
    marginLeft: -688,
    background: 'url(/static/X/signup/invite-illustration.png) no-repeat',
    backgroundImage: '-webkit-image-set(url(/static/X/signup/invite-illustration.png) 1x, url(/static/X/signup/invite-illustration@2x.png) 2x)',
    backgroundSize: 'auto 100%',
    '@media (max-height: 800px)': {
        width: 846,
        marginLeft: -500,
    }
});

const JoinButton = withChannelJoin((props) => {
    return (
        <XButton
            style="primary"
            size="large"
            text={(props as any).text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                await props.join({ variables: { channelId: (props as any).channelId } });
                if ((props as any).isMine) {
                    await delayForewer();
                }
            }}
        />
    );
}) as React.ComponentType<{ channelId: string, refetchVars: { conversationId: string }, text: string, isMine: boolean }>;

const JoinLinkButton = withChannelJoinInviteLink((props) => {
    return (
        <XButton
            style="primary"
            size="large"
            text={(props as any).text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                props.join({ variables: { invite: (props as any).invite } });
                await delayForewer();
            }}
        />
    );
}) as React.ComponentType<{ invite: string, refetchVars: { conversationId: string }, text: string }>;

interface RoomsInviteComponentProps {
    inviteLink?: string;
    signup?: string;
    room: {
        myStatus: string,
        id: string,
        description?: string | null,
        isRoot: boolean,
        title: string,
        membersCount: number,
        photo?: string | null,
        organization?: {
            name: string,
            isMine: boolean
        } | null
    };
    invite?: {
        invitedByUser?: {
            id: string,
            name: string,
            photo?: string | null
        }
    };
    noLogin?: boolean;
}

export class RoomsInviteComponent extends React.Component<RoomsInviteComponentProps> {
    render() {
        let room = this.props.room;
        let joinText = room.myStatus === 'none' ? (room.organization && room.organization.isMine ? 'Join room' : 'Request invite') : room.myStatus === 'invited' ? 'Accept invite' : '???';
        return (
            <Root>
                <MainContent>
                    {!this.props.noLogin && (
                        <XHorizontal justifyContent="flex-end">
                            <Close onClick={() => (canUseDOM ? window.history.back() : null)}>
                                <CloseIcon />
                            </Close>
                        </XHorizontal>
                    )}
                    {this.props.invite && this.props.invite.invitedByUser ?
                        <UserInfoWrapper separator={6} justifyContent="center">
                            <UserAvatar
                                cloudImageUuid={this.props.invite.invitedByUser.photo || undefined}
                                style="colorus"
                                objectName={this.props.invite.invitedByUser.name}
                                objectId={this.props.invite.invitedByUser.id}
                            />
                            <Text>{this.props.invite.invitedByUser.name} has invited you</Text>
                        </UserInfoWrapper> : <div style={{ height: 50 }} />
                    }
                    <InfoCardWrapper>
                        <InfoCardHeader separator={8}>
                            <RoomAvatar
                                cloudImageUuid={room.photo || undefined}
                                style="room"
                                objectName={room.title}
                                objectId={room.id}
                            />
                            <div>
                                <RoomTitle>
                                    {room.title}
                                </RoomTitle>
                                <RoomCounter>
                                    <ProfileIcon />
                                    <span>{room.membersCount} {room.membersCount > 1 ? 'members' : 'member'}</span>
                                </RoomCounter>
                            </div>
                        </InfoCardHeader>
                        <InfoCardBody>    
                            {room.description || TextRoom.descriptionPlaceholder}
                        </InfoCardBody>
                    </InfoCardWrapper>
                    {!this.props.signup &&
                        <>
                            {((room.myStatus === 'none' && !this.props.inviteLink) || room.myStatus === 'invited') && <JoinButton channelId={room.id} isMine={!!(room.organization && room.organization.isMine)} refetchVars={{ conversationId: room.id }} text={joinText} />}
                            {this.props.inviteLink && <JoinLinkButton invite={this.props.inviteLink} refetchVars={{ conversationId: room.id }} text="Accept invite" />}
                            {room.myStatus === 'requested' && (
                                <XButton
                                    style="ghost"
                                    size="large"
                                    text="Pending"
                                    alignSelf="center"
                                    flexShrink={0}
                                />
                            )}
                            {room.myStatus === 'member' && (
                                <XButton
                                    style="primary"
                                    size="large"
                                    text="Open room"
                                    alignSelf="center"
                                    flexShrink={0}
                                    path={'/mail/' + room.id}
                                />
                            )}
                        </>
                    }
                    {this.props.signup && (
                        <XButton
                            style="primary"
                            size="large"
                            text="Accept invitation"
                            alignSelf="center"
                            flexShrink={0}
                            path={this.props.signup}
                        />
                    )}
                    <ImageWrapper>
                        <Image />
                    </ImageWrapper>
                </MainContent>
            </Root>
        );
    }
}