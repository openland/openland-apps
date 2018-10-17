
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
import { TextChannel } from 'openland-text/TextChannel';

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
        border: 'solid 1px #edeef3',
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
    borderBottom: '1px solid #edeef3',
    paddingBottom: 20,
    marginBottom: 12,
});

const InfoCardBody = Glamorous.div({
    opacity: 0.8,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: -0.1,
    color: '#121e2b'
});

const Text = Glamorous.div<{ width?: number, autoMargin?: boolean }>(props => ({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: -0.3,
    color: '#5c6a81',
    textAlign: 'center',
    width: props.width,
    margin: props.autoMargin ? 'auto' : undefined
}));

const ChannelTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: -0.3,
    color: '#121e2b',
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

const ChannelAvatar = Glamorous(XAvatar)({
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

const ChannelCounter = Glamorous.div({
    borderRadius: 16,
    backgroundColor: '#F5F7F8',
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
        opacity: 0.5,
        fontSize: 13,
        fontWeight: 500,
        lineHeight: '16px',
        letterSpacing: -0.4,
        color: '#121e2b'
    },
    '& > svg': {
        display: 'inline-block',
        verticalAlign: 'top',
        marginTop: 5,
        marginBottom: 6,
        marginRight: 5
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

interface ChannelsInviteComponentProps {
    inviteLink?: string;
    signup?: string;
    channel: {
        myStatus: string,
        id: string,
        description: string,
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
            picture?: string | null
        }
    };
    noLogin?: boolean;
    onDirectory?: boolean;
}

export class ChannelsInviteComponent extends React.Component<ChannelsInviteComponentProps> {
    render() {
        let channel = this.props.channel;
        let joinText = channel.myStatus === 'none' ? (channel.organization && channel.organization.isMine ? 'Join channel' : 'Request invite') : channel.myStatus === 'invited' ? 'Accept invite' : '???';
        let closePath = this.props.onDirectory ? '/directory/channels' : '/mail/channels';
        return (
            <Root>
                <MainContent>
                    {!this.props.noLogin && (
                        <XHorizontal justifyContent="flex-end">
                            <Close path={closePath}>
                                <CloseIcon />
                            </Close>
                        </XHorizontal>
                    )}
                    {this.props.invite && this.props.invite.invitedByUser ?
                        <UserInfoWrapper separator={6} justifyContent="center">
                            <UserAvatar
                                cloudImageUuid={this.props.invite.invitedByUser.picture || undefined}
                                style="colorus"
                                objectName={this.props.invite.invitedByUser.name}
                                objectId={this.props.invite.invitedByUser.id}
                            />
                            <Text><b>{this.props.invite.invitedByUser.name}</b> has invited you</Text>
                        </UserInfoWrapper> : <div style={{ height: 50 }} />
                    }
                    <InfoCardWrapper>
                        <InfoCardHeader separator={8}>
                            <ChannelAvatar
                                cloudImageUuid={channel.photo || undefined}
                                style="channel"
                                objectName={channel.title}
                                objectId={channel.id}
                            />
                            <div>
                                <ChannelTitle>
                                    {channel.title}
                                </ChannelTitle>
                                <ChannelCounter>
                                    <ProfileIcon />
                                    <span>{channel.membersCount} {channel.membersCount > 1 ? 'members' : 'member'}</span>
                                </ChannelCounter>
                            </div>
                        </InfoCardHeader>
                        <InfoCardBody>    
                            {channel.description || TextChannel.descriptionPlaceholder}
                        </InfoCardBody>
                    </InfoCardWrapper>
                    {!this.props.signup &&
                        <>
                            {((channel.myStatus === 'none' && !this.props.inviteLink) || channel.myStatus === 'invited') && <JoinButton channelId={channel.id} isMine={!!(channel.organization && channel.organization.isMine)} refetchVars={{ conversationId: channel.id }} text={joinText} />}
                            {this.props.inviteLink && <JoinLinkButton invite={this.props.inviteLink} refetchVars={{ conversationId: channel.id }} text="Accept invite" />}
                            {channel.myStatus === 'requested' && (
                                <XButton
                                    style="ghost"
                                    size="large"
                                    text="Pending"
                                    alignSelf="center"
                                    flexShrink={0}
                                />
                            )}
                            {channel.myStatus === 'member' && (
                                <XButton
                                    style="primary"
                                    size="large"
                                    text="Open channel"
                                    alignSelf="center"
                                    flexShrink={0}
                                    path={'/mail/' + channel.id}
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