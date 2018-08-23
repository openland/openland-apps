
import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import CloseIcon from './components/icons/ic-close.svg';
import ProfileIcon from './components/icons/ic-profile.svg';
import MainImage from './components/icons/channel-invite-pic.svg';
import { withChannelJoin } from '../../api/withChannelJoin';
import { withChannelJoinInviteLink } from '../../api/withChannelJoinInviteLink';
import { delayForewer } from 'openland-y-utils/timer';

const Root = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    height: '100%',
    padding: 28,
    flexShrink: 0,
});

const MainContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
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
    borderRadius: '100%',
    width: '90%',
    height: '90%',
    position: 'absolute',
    top: '20%',
    left: '5%',
    opacity: 0.1,
    backgroundImage: 'linear-gradient(21deg, #ecf2fc, #b9cff7)',
    zIndex: 0
});

const UserAvatar = Glamorous(XAvatar)({
    width: 20,
    height: 20,
    '& img': {
        width: '100% !important',
        height: '100% !important'
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
            }}
        />
    );
}) as React.ComponentType<{ channelId: string, refetchVars: { conversationId: string }, text: string }>;

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

export class ChannelsInviteComponent extends React.Component<{ inviteLink?: string, signup?: string, channel: { myStatus: string, id: string, description: string, isRoot: boolean, title: string, membersCount: number, organization?: { name: string } | null }, invite?: { invitedByUser?: { name: string, picture?: string | null } } }> {
    render() {
        console.warn(this.props);
        let joinText = this.props.channel.myStatus === 'none' ? 'Rrequest invite' : this.props.channel.myStatus === 'invited' ? 'Accept invite' : '???';
        return (
            <Root>
                <Reactangle />
                <MainContent>
                    <XHorizontal justifyContent="flex-end">
                        <Close path="/mail/channels">
                            <CloseIcon />
                        </Close>
                    </XHorizontal>
                    {this.props.invite && this.props.invite.invitedByUser ?
                        <UserInfoWrapper separator={6} justifyContent="center">
                            <UserAvatar cloudImageUuid={this.props.invite.invitedByUser.picture || undefined} />
                            <Text><b>{this.props.invite.invitedByUser.name}</b> has invited you</Text>
                        </UserInfoWrapper> : <div style={{ height: 120 }} />
                    }
                    <InfoCardWrapper>
                        <XVertical separator={10} justifyContent="center">
                            <XVertical justifyContent="center">
                                <ChannelTitle>{(!this.props.channel.isRoot ? this.props.channel.organization!!.name + '/' : '') + this.props.channel.title}</ChannelTitle>
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
                            {((this.props.channel.myStatus === 'none' && !this.props.inviteLink) || this.props.channel.myStatus === 'invited') && <JoinButton channelId={this.props.channel.id} refetchVars={{ conversationId: this.props.channel.id }} text={joinText} />}
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
                        <MainImage />
                    </ImageWrapper>
                </MainContent>
            </Root>
        );
    }
}