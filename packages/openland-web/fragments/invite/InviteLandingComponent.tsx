import * as React from 'react';
import { css, cx } from 'linaria';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import CloseIcon from 'openland-icons/ic-close.svg';
import ProfileIcon from 'openland-icons/ic-profile.svg';
import { delayForewer } from 'openland-y-utils/timer';
import { ResolvedInvite_invite_RoomInvite_room, ResolvedInvite_invite_InviteInfo_organization, RoomFull_SharedRoom, SharedRoomMembershipStatus, RoomChat_room_SharedRoom } from 'openland-api/Types';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import LogoWithName from 'openland-icons/logo.svg';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { switchOrganization } from '../../utils/switchOrganization';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XTrack } from 'openland-x-analytics/XTrack';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserInfoContext } from 'openland-web/components/UserInfo';

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

export const ClosingCross = ({ path = '/mail/' }: { path?: string }) => {
    return (
        <Close path={path}>
            <CloseIcon />
        </Close>
    );
};

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
    '@media (max-height: 600px)': {
        background: 'none',
        backgroundImage: 'none',
    },
});

export const FooterImage = () => {
    return (
        <ImageWrapper hasFooter={true}>
            <Image />
        </ImageWrapper>
    );
};

const JoinButton = ({ roomId, text }: { roomId: string; text: string }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    return (
        <XButton
            style="primary"
            size="large"
            text={text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                await client.mutateRoomJoin({ roomId });
                await client.refetchRoom({ id: roomId });

                router!.push(`/mail/${roomId}`);
            }}
        />
    );
};

const JoinLinkButton = (props: {
    invite: string;
    refetchVars: { conversationId: string };
    text: string;
}) => {
    const client = useClient();

    return (
        <XButton
            style="primary"
            size="large"
            text={props.text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                await client.mutateRoomJoinInviteLink({ invite: props.invite });
                await delayForewer();
            }}
        />
    );
};

const textAlignCenter = css`
    text-align: center;
    text-shadow: 0 0 6px #fff, 0 0 6px #fff;
`;

const titleClassName = css`
    text-shadow: 0 0 6px #fff, 0 0 6px #fff;
`;

const InviteByRow = ({
    invitedByUser,
    chatTypeStr,
}: {
    invitedByUser?: {
        id: string;
        name: string;
        photo?: string | null;
    } | null;
    chatTypeStr: string;
}) => {
    return (
        <>
            {invitedByUser ? (
                <UserInfoWrapper separator={6} justifyContent="center" alignItems="center">
                    <XAvatar2
                        src={invitedByUser.photo || undefined}
                        title={invitedByUser.name}
                        id={invitedByUser.id}
                        size={24}
                    />
                    <Text>
                        {invitedByUser.name}{' '}
                        {`invites you to join ${chatTypeStr.toLowerCase()}`}
                    </Text>
                </UserInfoWrapper>
            ) : (
                    <div style={{ height: 50 }} />
                )}
        </>
    );
};

type RoomInfoColumnT = {
    photo: string | null;
    title: string;
    id: string;
    membersCount?: number | null;
    description?: string | null;
    signup?: string;
    button: any;
};

const EntityInfoColumn = ({
    photo,
    title,
    id,
    membersCount,
    description,
    button,
}: RoomInfoColumnT) => {
    return (
        <XView marginTop={60} alignSelf="center" alignItems="center" maxWidth={428} zIndex={1}>
            <RoomAvatar src={photo || undefined} title={title} id={id} size={74} />
            <XView marginTop={28} lineHeight={1} fontSize={24} fontWeight={'600'}>
                <span className={titleClassName}>{title}</span>
            </XView>
            <XView
                marginTop={12}
                paddingBottom={6}
                paddingTop={6}
                paddingLeft={12}
                paddingRight={12}
                height={23}
                borderRadius={16}
                backgroundColor={'#eaf4ff'}
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

                    {`${membersCount} members`}
                </XView>
            </XView>
            {description && (
                <XView lineHeight={1.5} marginTop={20}>
                    <div className={textAlignCenter}>{description}</div>
                </XView>
            )}
            <XView marginTop={36} marginBottom={40}>
                {button}
            </XView>
        </XView>
    );
};

const FooterClassName = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin-top: auto;
    height: 60px;
    background-color: #f9f9f9;
    flex-shrink: 0;
`;

const Footer = () => {
    return (
        <div className={FooterClassName}>
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
            <XView marginLeft={8} fontSize={13} color={'rgba(0, 0, 0, 0.5)'} fontWeight="600">
                Professional messenger of the future
            </XView>
        </div>
    );
};

export const InviteLandingComponentLayout = ({
    whereToInvite,
    photo,
    title,
    id,
    membersCount,
    description,
    invitedByUser,
    noLogin,
    button,
}: RoomInfoColumnT & {
    inviteLink?: string;
    signup?: string;
    invitedByUser?: {
        id: string;
        name: string;
        photo?: string | null;
    } | null;
    noLogin?: boolean;
    whereToInvite: 'Channel' | 'Group' | 'Organization' | 'Community';
}) => {
    if (!canUseDOM) {
        return null;
    }

    const isMobile = useIsMobile();

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
                {isMobile && !noLogin && (
                    <XView
                        fontSize={20}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.9)"
                        marginLeft={20}
                    >
                        {`${whereToInvite} invitation`}
                    </XView>
                )}
            </XView>
            <XView flexDirection="column" paddingHorizontal={20} zIndex={1}>
                <InviteByRow invitedByUser={invitedByUser} chatTypeStr={whereToInvite} />
            </XView>
            <EntityInfoColumn
                photo={photo}
                title={title}
                id={id}
                membersCount={membersCount}
                description={description}
                button={button}
            />
            {!isMobile && (
                <ImageWrapper hasFooter={!noLogin}>
                    <Image />
                </ImageWrapper>
            )}

            {!isMobile && noLogin && <Footer />}
        </div>
    );
};

const resolveRoomButton = (room: { id: string, membership: SharedRoomMembershipStatus }, key?: string) => {
    if (room &&
        (room.membership === 'NONE' ||
            room.membership === 'KICKED' ||
            room.membership === 'LEFT') &&
        !key) {
        return <JoinButton roomId={room.id!} text="Join group" />;
    } else if (room && key) {
        return <JoinLinkButton
            invite={key}
            refetchVars={{ conversationId: room.id! }}
            text="Accept invite"
        />;
    } else if (room && room.membership === 'REQUESTED') {
        return <XButton
            style="ghost"
            size="large"
            text="Pending"
            alignSelf="center"
            flexShrink={0}
        />;
    } else if (room && room.membership === 'MEMBER') {
        return <XButton
            style="primary"
            size="large"
            text="Open room"
            alignSelf="center"
            flexShrink={0}
            path={'/mail/' + room.id}
        />;
    }
    return <></>;
};

export const SharedRoomPlaceholder = ({ room }: { room: RoomChat_room_SharedRoom }) => {

    return <InviteLandingComponentLayout
        button={resolveRoomButton(room)}
        whereToInvite="Group"
        photo={room.photo}
        title={room.title}
        id={room.id}
        membersCount={room.membersCount}
    />;
};

export const InviteLandingComponent = ({ signupRedirect }: { signupRedirect?: string }) => {
    let userInfo = React.useContext(UserInfoContext);
    let loggedIn = userInfo && userInfo.isLoggedIn;
    let client = useClient();
    let unicorn = useUnicorn();

    let path = window.location.pathname.split('/');
    let key = unicorn ? unicorn.id : path[path.length - 1];

    let invite = client.useResolvedInvite({ key });
    let room: ResolvedInvite_invite_RoomInvite_room | undefined;
    let organization: ResolvedInvite_invite_InviteInfo_organization | undefined;
    let invitedByUser;

    if (invite.invite && invite.invite.__typename === 'InviteInfo' && invite.invite.organization) {
        organization = invite.invite.organization;
        invitedByUser = invite.invite.creator;

    }

    if (invite.invite && invite.invite.__typename === 'RoomInvite') {
        room = invite.invite.room;
        invitedByUser = invite.invite.invitedByUser;

    }

    if (invite.invite && invite.invite.__typename === 'AppInvite') {
        invitedByUser = invite.invite.inviter;
    }

    let button: JSX.Element | undefined;

    console.warn(userInfo);
    if (!loggedIn) {
        button = <MainContent>
            <XButton
                style="primary"
                size="large"
                text="Accept invitation"
                alignSelf="center"
                flexShrink={0}
                path={signupRedirect}
            />
        </MainContent>;
    } else if (room) {
        button = resolveRoomButton(room, key);
    } else if (organization) {
        button = <XButton
            text={'Accept invite'}
            action={async () => {
                await client.mutateAccountInviteJoin({
                    inviteKey: key,
                });
                switchOrganization(organization!.id);
            }}
            style="primary"
            alignSelf="center"
            flexShrink={0}
            size="large"
        />;
    }

    const whereToInvite = room
        ? room.isChannel
            ? 'Channel'
            : 'Group'
        : organization && organization.isCommunity
            ? 'Community'
            : 'Organization';

    if (!room && !organization) {
        throw new Error('Invalid invite');
    }

    return (
        <>
            <XTrack
                event="invite_landing_view"
                params={{ invite_type: whereToInvite.toLowerCase() }}
            />
            <InviteLandingComponentLayout
                invitedByUser={invitedByUser}
                button={button}
                noLogin={!loggedIn}
                whereToInvite={whereToInvite}
                photo={room ? room.photo : organization!.photo}
                title={room ? room.title : organization!.name}
                id={room ? room.id : organization!.id}
                membersCount={room ? room.membersCount : organization!.membersCount}
                description={room ? room.description : organization!.about}
            />
        </>
    );
};
