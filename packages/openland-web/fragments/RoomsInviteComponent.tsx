import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import CloseIcon from 'openland-icons/ic-close.svg';
import ProfileIcon from 'openland-icons/ic-profile.svg';
import { withChannelJoin } from '../api/withChannelJoin';
import { withChannelJoinInviteLink } from '../api/withChannelJoinInviteLink';
import { delayForewer } from 'openland-y-utils/timer';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { isMobileUserAgent } from 'openland-web/utils/isMobileUserAgent';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import LogoWithName from 'openland-icons/logo.svg';

const Root = Glamorous(XScrollView)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    height: '100%',
    flexShrink: 0,
    backgroundColor: '#ffffff',
    flexGrow: 1,
});

const MainContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    padding: 28,

    '& > *': {
        zIndex: 2,
    },
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
        backgroundColor: '#ecedf0',
    },
});

const UserInfoWrapper = Glamorous(XHorizontal)({
    margin: 'auto',
    marginTop: 50,
    flexShrink: 0,
    '@media (max-height: 800px)': {
        marginTop: 15,
    },
});

const Text = Glamorous.div<{ width?: number; autoMargin?: boolean }>(props => ({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: 0,
    textAlign: 'center',
    width: props.width,
    margin: props.autoMargin ? 'auto' : undefined,
}));

const UserAvatar = Glamorous(XAvatar)({
    width: 24,
    height: 24,
    '& img': {
        width: '24px !important',
        height: '24px !important',
    },
});

const RoomAvatar = Glamorous(XAvatar)({
    width: 80,
    height: 80,
    '& img': {
        width: '80px !important',
        height: '80px !important',
    },
    '& > div': {
        borderRadius: 40,
    },
});

const ImageWrapper = Glamorous.div<{ hasFooter: boolean }>(({ hasFooter }) => {
    return {
        height: 367,
        position: 'absolute',
        right: 0,
        bottom: hasFooter ? 60 : 18,
        left: 0,
        overflow: 'hidden',
        'z-index': '-1!important',
        '@media (max-height: 800px)': {
            height: 250,
        },
    };
});

const Image = Glamorous.div({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1242,
    marginLeft: -688,
    background: 'url(/static/X/signup/invite-illustration.png) no-repeat',
    backgroundImage:
        '-webkit-image-set(url(/static/X/signup/invite-illustration.png) 1x, url(/static/X/signup/invite-illustration@2x.png) 2x)',
    backgroundSize: 'auto 100%',
    '@media (max-height: 800px)': {
        width: 846,
        marginLeft: -500,
    },
});

const JoinButton = withChannelJoin(props => {
    return (
        <XButton
            style="primary"
            size="large"
            text={(props as any).text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                await props.join({
                    variables: { roomId: (props as any).channelId },
                });
            }}
        />
    );
}) as React.ComponentType<{
    channelId: string;
    refetchVars: { conversationId: string };
    text: string;
}>;

const JoinLinkButton = withChannelJoinInviteLink(props => {
    return (
        <XButton
            style="primary"
            size="large"
            text={(props as any).text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                if (isMobileUserAgent) {
                    window.location.href = 'openland://deep/joinroom/' + (props as any).invite;
                }
                await props.join({ variables: { invite: (props as any).invite } });
                await delayForewer();
            }}
        />
    );
}) as React.ComponentType<{
    invite: string;
    refetchVars: { conversationId: string };
    text: string;
}>;

interface RoomsInviteComponentProps {
    inviteLink?: string;
    signup?: string;
    room: Partial<Room_room_SharedRoom>;
    invite?: {
        invitedByUser?: {
            id: string;
            name: string;
            photo?: string | null;
        };
    };
    noLogin?: boolean;
}

const textAlignCenter = css`
    text-align: center;
`;

export const RoomsInviteComponent = ({
    room,
    invite,
    inviteLink,
    noLogin,
    signup,
}: RoomsInviteComponentProps) => {
    const { isMobile } = React.useContext(MobileSidebarContext);

    const button = (
        <>
            {(room.membership === 'NONE' ||
                room.membership === 'KICKED' ||
                room.membership === 'LEFT') &&
                !inviteLink && (
                    <JoinButton
                        channelId={room.id!}
                        refetchVars={{
                            conversationId: room.id!,
                        }}
                        text="Join group"
                    />
                )}
            {inviteLink && (
                <JoinLinkButton
                    invite={inviteLink}
                    refetchVars={{ conversationId: room.id! }}
                    text="Accept invite"
                />
            )}
            {room.membership === 'REQUESTED' && (
                <XButton
                    style="ghost"
                    size="large"
                    text="Pending"
                    alignSelf="center"
                    flexShrink={0}
                />
            )}
            {room.membership === 'MEMBER' && (
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
    );

    return (
        <Root>
            {!noLogin && (
                <XView position="absolute" right={0} zIndex={100} hoverCursor="pointer">
                    <Close onClick={() => (canUseDOM ? window.history.back() : null)}>
                        <CloseIcon />
                    </Close>
                </XView>
            )}
            <XView flexDirection="column">
                {invite && invite.invitedByUser ? (
                    <UserInfoWrapper separator={6} justifyContent="center" alignItems="center">
                        <UserAvatar
                            cloudImageUuid={invite.invitedByUser.photo || undefined}
                            style="colorus"
                            objectName={invite.invitedByUser.name}
                            objectId={invite.invitedByUser.id}
                            size="small"
                        />
                        <Text>{invite.invitedByUser.name} invites you to join group</Text>
                    </UserInfoWrapper>
                ) : (
                    <div style={{ height: 50 }} />
                )}
                <XView marginTop={111} alignSelf="center" alignItems="center" maxWidth={428}>
                    <RoomAvatar
                        cloudImageUuid={room.photo || undefined}
                        style="room"
                        objectName={room.title}
                        objectId={room.id}
                        size="x-medium"
                    />
                    <XView marginTop={28} fontSize={24} fontWeight={'600'}>
                        {room.title}
                    </XView>
                    {room.membersCount && room.membersCount > 10 && (
                        <XView
                            marginTop={12}
                            paddingBottom={6}
                            paddingTop={6}
                            paddingLeft={12}
                            paddingRight={12}
                            height={23}
                            borderRadius={16}
                            backgroundColor={'rgba(23, 144, 255, 0.1)'}
                            justifyContent="center"
                        >
                            <XView
                                flexDirection="row"
                                fontSize={13}
                                fontWeight={'600'}
                                color={'#1790ff'}
                                lineHeight={1.23}
                            >
                                <XView marginTop={1} marginRight={4}>
                                    <ProfileIcon />
                                </XView>

                                {`${room.membersCount} members`}
                            </XView>
                        </XView>
                    )}
                    {room.description && (
                        <XView lineHeight={1.5} marginTop={20}>
                            <div className={textAlignCenter}>{room.description}</div>
                        </XView>
                    )}
                    {!signup && <XView marginTop={36}>{button}</XView>}
                </XView>
            </XView>
            <ImageWrapper hasFooter={isMobile || !!noLogin}>
                <Image />
            </ImageWrapper>
            {(isMobile || !!noLogin) && (
                <XView
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    bottom={0}
                    position="absolute"
                    height={60}
                    backgroundColor={'#f9f9f9'}
                >
                    <XView marginTop={-10}>
                        <LogoWithName />
                    </XView>
                    <XView
                        marginLeft={8}
                        borderRadius={2}
                        width={4}
                        height={4}
                        backgroundColor={'#d8d8d8'}
                    />
                    <XView marginLeft={8} fontSize={13} color={'rgba(0, 0, 0, 0.5)'}>
                        Professional messenger for project collaboration
                    </XView>
                </XView>
            )}
            {signup && (
                <MainContent>
                    <XButton
                        style="primary"
                        size="large"
                        text="Accept invitation"
                        alignSelf="center"
                        flexShrink={0}
                        path={signup}
                        onClick={() => {
                            if (isMobileUserAgent) {
                                window.location.href = 'openland://deep/joinroom/' + inviteLink;
                            }
                        }}
                    />
                </MainContent>
            )}
        </Root>
    );
};
