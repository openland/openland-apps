import * as React from 'react';
import { css, cx } from 'linaria';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import CloseIcon from 'openland-icons/ic-close.svg';
import ProfileIcon from 'openland-icons/ic-profile.svg';
import { withChannelJoinInviteLink } from '../api/withChannelJoinInviteLink';
import { delayForewer } from 'openland-y-utils/timer';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { XView } from 'react-mental';
import { isMobileUserAgent } from 'openland-web/utils/isMobileUserAgent';
import { useClient } from 'openland-web/utils/useClient';
import { useIsMobile } from 'openland-web/hooks';
import LogoWithName from 'openland-icons/logo.svg';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const RootClassName = css`
    position: relative;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    background-color: #fff;
    min-width: 100%;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
`;

const RootMobileNologinClassName = css`
    overflow: auto;
    height: auto;
`;

const RootMobileLoginClassName = css`
    padding-bottom: 160px;
`;

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
    '&:hover': {
        backgroundColor: '#ecedf0',
    },
    '& svg path': {
        fill: '#CCCCCC',
    },
});

const UserInfoWrapper = Glamorous(XHorizontal)({
    marginTop: 50,
    flexShrink: 0,
});

const Text = Glamorous.div<{ width?: number; autoMargin?: boolean }>(props => ({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: 0,
    textAlign: 'center',
    width: props.width,
    margin: props.autoMargin ? 'auto' : undefined,
}));

const RoomAvatar = Glamorous(XAvatar2)({
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
        bottom: hasFooter ? 60 : 88,
        left: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        'z-index': '0 !important',
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

const JoinButton = (props: {
    channelId: string;
    refetchVars: { conversationId: string };
    text: string;
}) => {
    const client = useClient();
    return (
        <XButton
            style="primary"
            size="large"
            text={(props as any).text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                await client.mutateRoomJoin({ roomId: props.channelId });
            }}
        />
    );
};

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
    if (!canUseDOM) {
        return null;
    }

    const [isMobile] = useIsMobile();

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

    let chatTypeStr = room.isChannel ? 'Channel' : 'Group';

    return (
        <div
            className={cx(
                RootClassName,
                isMobile && noLogin && RootMobileNologinClassName,
                isMobile && !noLogin && RootMobileLoginClassName,
            )}
        >
            <XView
                flexDirection="row"
                justifyContent={isMobile ? 'space-between' : 'flex-end'}
                alignItems="center"
            >
                {isMobile &&
                    !noLogin && (
                        <XView
                            fontSize={20}
                            fontWeight="600"
                            color="rgba(0, 0, 0, 0.9)"
                            marginLeft={20}
                        >
                            {`${chatTypeStr} invitation`}
                        </XView>
                    )}
                {!noLogin && (
                    <XView
                        zIndex={100}
                        hoverCursor="pointer"
                        height={52}
                        flexDirection="row"
                        marginRight={16}
                        alignItems="center"
                    >
                        <Close path="/mail/">
                            <CloseIcon />
                        </Close>
                    </XView>
                )}
            </XView>
            <XView flexDirection="column" paddingHorizontal={20} zIndex={1}>
                {invite && invite.invitedByUser ? (
                    <UserInfoWrapper separator={6} justifyContent="center" alignItems="center">
                        <XAvatar2
                            src={invite.invitedByUser.photo || undefined}
                            title={invite.invitedByUser.name}
                            id={invite.invitedByUser.id}
                            size={24}
                        />
                        <Text>
                            {invite.invitedByUser.name}{' '}
                            {`invites you to join ${chatTypeStr.toLowerCase()}`}
                        </Text>
                    </UserInfoWrapper>
                ) : (
                    <div style={{ height: 50 }} />
                )}
                <XView marginTop={111} alignSelf="center" alignItems="center" maxWidth={428}>
                    <RoomAvatar
                        src={room.photo || undefined}
                        title={room.title!!}
                        id={room.id!!}
                        size={74}
                    />
                    <XView marginTop={28} lineHeight={1} fontSize={24} fontWeight={'600'}>
                        {room.title}
                    </XView>
                    {room.membersCount &&
                        room.membersCount > 10 && (
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
                    {!signup && (
                        <XView marginTop={36} marginBottom={40}>
                            {button}
                        </XView>
                    )}
                </XView>
            </XView>
            {!isMobile && (
                <ImageWrapper hasFooter={!noLogin}>
                    <Image />
                </ImageWrapper>
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
            {!isMobile &&
                !!noLogin && (
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
        </div>
    );
};
