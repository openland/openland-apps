import * as React from 'react';
import { css, cx } from 'linaria';
import ProfileIcon from 'openland-icons/ic-profile.svg';
import {
    ResolvedInvite_invite_RoomInvite_room,
    ResolvedInvite_invite_InviteInfo_organization,
    SharedRoomMembershipStatus,
    RoomChat_room_SharedRoom,
} from 'openland-api/Types';
import { XView, XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { switchOrganization } from 'openland-web/utils/switchOrganization';
import { XTrack } from 'openland-x-analytics/XTrack';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { InviteImage } from './InviteImage';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { MatchmakingStartComponent } from '../matchmaking/MatchmakingStartFragment';
import { showModalBox } from 'openland-x/showModalBox';

const RootClassName = css`
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #fff;
    min-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    -webkit-overflow-scrolling: touch;
`;

const RootMobileNologinClassName = css`
    overflow: auto;
    height: auto;
`;

const RootMobileLoginClassName = css`
    padding-bottom: 160px;
`;

const JoinButton = ({ roomId, text }: { roomId: string; text: string }) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext);
    return (
        <UButton
            style="primary"
            size="large"
            text={text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                await client.mutateRoomJoin({ roomId });
                await client.refetchRoom({ id: roomId });
                console.warn(router, roomId);
                router!.navigate(`/mail/${roomId}`);
            }}
        />
    );
};

const JoinLinkButton = (props: {
    invite: string;
    refetchVars: { conversationId: string };
    text: string;
    onAccept: (data: boolean) => void;
    matchmaking?: boolean;
}) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext);

    return (
        <UButton
            style="primary"
            size="large"
            text={props.text}
            alignSelf="center"
            flexShrink={0}
            action={async () => {
                props.onAccept(true);
                let res = await client.mutateRoomJoinInviteLink({ invite: props.invite });
                if (props.matchmaking) {
                    router!.navigate(`/matchmaking/${res.join.id}/start`);
                } else {
                    router!.navigate(`/mail/${res.join.id}`);
                }
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

const InviteByUser = ({
    invitedByUser,
    chatTypeStr,
}: {
    invitedByUser: {
        id: string;
        name: string;
        photo?: string | null;
    };
    chatTypeStr: string;
}) => {
    return (
        <XView
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            flexShrink={0}
            marginTop={50}
        >
            <UAvatar
                photo={invitedByUser.photo}
                title={invitedByUser.name}
                id={invitedByUser.id}
                size="x-small"
            />
            <XView marginLeft={12} fontSize={14} lineHeight={1.43}>
                {invitedByUser.name} {`invites you to join ${chatTypeStr.toLowerCase()}`}
            </XView>
        </XView>
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
        <XView marginTop={60} alignSelf="center" flexGrow={1} maxWidth={428} zIndex={1} >
            <XView flexGrow={1} justifyContent="center" alignItems="center">
                <UAvatar photo={photo} title={title} id={id} size="x-large" />
                <XView marginTop={16} lineHeight={1} fontSize={24} fontWeight={'600'}>
                    <span className={titleClassName}>{title}</span>
                </XView>
                <XView
                    marginTop={14}
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
                    <XView lineHeight={1.5} marginTop={18}>
                        <div className={textAlignCenter}>{description}</div>
                    </XView>
                )}
            </XView>
            <XView marginTop={36} marginBottom={60}>
                {button}
            </XView>
        </XView>
    );
};

const InviteLandingComponentLayout = ({
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
            <XView maxHeight={850} flexGrow={isMobile ? 1 : undefined}>
                {isMobile &&
                    !noLogin && (
                        <XView flexDirection="row" justifyContent="center" alignItems="center">
                            <XView fontSize={20} fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                                {`${whereToInvite} invitation`}
                            </XView>
                        </XView>
                    )}
                <XView flexDirection="column" paddingHorizontal={20} zIndex={1}>
                    {invitedByUser ? (
                        <InviteByUser invitedByUser={invitedByUser} chatTypeStr={whereToInvite} />
                    ) : (
                            <XView height={50} flexShrink={0} />
                        )}
                </XView>
                <EntityInfoColumn
                    photo={photo}
                    title={title}
                    id={id}
                    membersCount={membersCount}
                    description={description}
                    button={button}
                />

            </XView>

            {!isMobile && <InviteImage onBottom={!noLogin} />}
        </div>
    );
};

const resolveRoomButton = (
    room: { id: string; membership: SharedRoomMembershipStatus },
    key?: string,
    matchmaking?: boolean,
) => {
    const [loading, setLoading] = React.useState(false);
    if (
        room &&
        (room.membership === 'NONE' ||
            room.membership === 'KICKED' ||
            room.membership === 'LEFT') &&
        !key
    ) {
        return <JoinButton roomId={room.id!} text="Join group" />;
    } else if (room && room.membership === 'MEMBER') {
        return (
            <UButton
                style="primary"
                size="large"
                text="Open room"
                alignSelf="center"
                flexShrink={0}
                loading={loading}
                path={'/mail/' + room.id}
            />
        );
    } else if (room && key) {
        return (
            <JoinLinkButton
                invite={key}
                refetchVars={{ conversationId: room.id! }}
                onAccept={setLoading}
                text="Accept invite"
                matchmaking={matchmaking}
            />
        );
    } else if (room && room.membership === 'REQUESTED') {
        return (
            <UButton
                style="secondary"
                size="large"
                text="Pending"
                alignSelf="center"
                flexShrink={0}
            />
        );
    }
    return <></>;
};

export const SharedRoomPlaceholder = ({ room }: { room: RoomChat_room_SharedRoom }) => {
    return (
        <InviteLandingComponentLayout
            button={resolveRoomButton(room)}
            whereToInvite="Group"
            photo={room.photo}
            title={room.title}
            id={room.id}
            membersCount={room.membersCount}
        />
    );
};

export const InviteLandingComponent = ({ signupRedirect }: { signupRedirect?: string }) => {
    let userInfo = React.useContext(UserInfoContext);
    let loggedIn = userInfo && userInfo.isLoggedIn;
    let client = useClient();
    let unicorn = useUnicorn();
    let router = React.useContext(XViewRouterContext);

    let path = window.location.pathname.split('/');
    let key = unicorn ? unicorn.id : path[path.length - 1];

    let invite = client.useResolvedInvite({ key });
    let room: ResolvedInvite_invite_RoomInvite_room | undefined;
    let organization: ResolvedInvite_invite_InviteInfo_organization | undefined;
    let invitedByUser;
    let matchmaking = undefined;

    if (invite.invite && invite.invite.__typename === 'InviteInfo' && invite.invite.organization) {
        organization = invite.invite.organization;
        invitedByUser = invite.invite.creator;
    }

    if (invite.invite && invite.invite.__typename === 'RoomInvite') {
        room = invite.invite.room;
        invitedByUser = invite.invite.invitedByUser;
        matchmaking = !!(room.matchmaking && room.matchmaking.enabled);
    }

    if (invite.invite && invite.invite.__typename === 'AppInvite') {
        router!.navigate('/');
        return null;
    }

    let button: JSX.Element | undefined;

    if (!loggedIn) {
        button = (
            <UButton
                style="primary"
                size="large"
                text="Accept invitation"
                alignSelf="center"
                flexShrink={0}
                path={!matchmaking ? signupRedirect : undefined}
                onClick={matchmaking && signupRedirect ? (() => {
                    showModalBox({ fullScreen: true, useTopCloser: false }, () =>
                        <MatchmakingStartComponent onStart={() => router!.navigate(signupRedirect)} />
                    );
                }) : undefined}
                zIndex={2}
            />
        );
    } else if (room) {
        button = resolveRoomButton(room, key, matchmaking);
    } else if (organization) {
        button = (
            <UButton
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
            />
        );
    }

    const whereToInvite = room
        ? room.isChannel
            ? 'Channel'
            : 'Group'
        : organization && organization.isCommunity
            ? 'Community'
            : 'Organization';

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
