
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

const Root = Glamorous(XScrollView)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    height: '100%',
    flexShrink: 0,
});

const MainContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    padding: 28
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
    marginTop: 45,
    marginBottom: 24,
    flexShrink: 0
});

const InfoCardWrapper = Glamorous.div({
    borderRadius: 6,
    border: 'solid 1px #ecedf0',
    backgroundColor: '#fff',
    margin: 'auto',
    padding: 32,
    marginBottom: 32,
    flexShrink: 0
});

const Text = Glamorous.div<{ width?: number }>(props => ({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: -0.3,
    color: '#5c6a81',
    textAlign: 'center',
    width: props.width
}));

const ChannelTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.33,
    letterSpacing: -0.3,
    color: '#1790ff',
    textAlign: 'center'
});

const Reactangle = Glamorous.div({
    width: '100%',
    height: 600,
    position: 'absolute',
    top: 'calc(50% - 300px)',
    left: 0,
    backgroundImage: 'url(\'/static/X/messenger/reactangle.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    zIndex: 0,
    pointerEvents: 'none'
});

const UserAvatar = Glamorous(XAvatar)({
    width: 20,
    height: 20,
    '& img': {
        width: '20px !important',
        height: '20px !important'
    }
});

const ChannelCounter = Glamorous.div({
    height: 24,
    borderRadius: 16,
    backgroundColor: '#F5F7F8',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    '& > span': {
        opacity: 0.8,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.14,
        letterSpacing: -0.2,
        color: '#5c6a81'
    },
    '& > svg': {
        marginRight: 4
    }
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 64,
    alignSelf: 'center'
});

const Image = Glamorous.div({
    width: 691,
    height: 391,
    backgroundImage: 'url(\'/static/X/messenger/channel-invite-pic.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
});

const JoinButton = withChannelJoin((props) => {
    return (
        <XButton
            style="primary-sky-blue"
            size="r-default"
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
            style="primary-sky-blue"
            size="r-default"
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
        organization?: {
            name: string,
            isMine: boolean
        } | null
    };
    invite?: {
        invitedByUser?: {
            name: string,
            picture?: string | null
        }
    };
    noLogin?: boolean;
}

export class ChannelsInviteComponent extends React.Component<ChannelsInviteComponentProps> {
    render() {
        console.warn(this.props);
        let joinText = this.props.channel.myStatus === 'none' ? (this.props.channel.organization && this.props.channel.organization.isMine ? 'Join channel' : 'Request invite') : this.props.channel.myStatus === 'invited' ? 'Accept invite' : '???';
        return (
            <Root>
                <Reactangle />
                <MainContent>
                    {!this.props.noLogin && (
                        <XHorizontal justifyContent="flex-end">
                            <Close path="/mail/channels">
                                <CloseIcon />
                            </Close>
                        </XHorizontal>
                    )}
                    {this.props.invite && this.props.invite.invitedByUser ?
                        <UserInfoWrapper separator={6} justifyContent="center">
                            <UserAvatar cloudImageUuid={this.props.invite.invitedByUser.picture || undefined} />
                            <Text><b>{this.props.invite.invitedByUser.name}</b> has invited you</Text>
                        </UserInfoWrapper> : <div style={{ height: 120 }} />
                    }
                    <InfoCardWrapper>
                        <XVertical separator={10} justifyContent="center">
                            <XVertical justifyContent="center">
                                <ChannelTitle>
                                    {(!this.props.channel.isRoot ? this.props.channel.organization!!.name + ' /' : '') + this.props.channel.title}
                                </ChannelTitle>
                                {this.props.channel.description && <Text width={354}>{this.props.channel.description}</Text>}
                            </XVertical>
                            <ChannelCounter>
                                <ProfileIcon />
                                <span>{this.props.channel.membersCount}</span>
                            </ChannelCounter>
                        </XVertical>
                    </InfoCardWrapper>
                    {!this.props.signup &&
                        <>
                            {((this.props.channel.myStatus === 'none' && !this.props.inviteLink) || this.props.channel.myStatus === 'invited') && <JoinButton channelId={this.props.channel.id} isMine={!!(this.props.channel.organization && this.props.channel.organization.isMine)} refetchVars={{ conversationId: this.props.channel.id }} text={joinText} />}
                            {this.props.inviteLink && <JoinLinkButton invite={this.props.inviteLink} refetchVars={{ conversationId: this.props.channel.id }} text="Accept invite" />}
                            {this.props.channel.myStatus === 'requested' && (
                                <XButton
                                    style="ghost"
                                    size="r-default"
                                    text="Pending"
                                    alignSelf="center"
                                    flexShrink={0}
                                />
                            )}
                            {this.props.channel.myStatus === 'member' && (
                                <XButton
                                    style="primary-sky-blue"
                                    size="r-default"
                                    text="Open channel"
                                    alignSelf="center"
                                    flexShrink={0}
                                    path={'/mail/' + this.props.channel.id}
                                />
                            )}
                        </>
                    }
                    {this.props.signup && (
                        <XButton
                            style="primary-sky-blue"
                            size="r-default"
                            text="Accept invite"
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