import * as React from 'react';
import { css, cx } from 'linaria';
import { XAvatar2 } from 'openland-x/XAvatar2';
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
import LogoWithName from 'openland-icons/logo.svg';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { switchOrganization } from 'openland-web/utils/switchOrganization';
import { XTrack } from 'openland-x-analytics/XTrack';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UButton } from 'openland-web/components/unicorn/UButton';

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

const imageWrapperStyle = css`
    height: 367px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 88px;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;

    @media (max-height: 800px) {
        height: 250px;
    }
`;

const imageWrapperWithFooterStyle = css`
    bottom: 60px;
`;

const imageStyle = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1242px;
    margin-left: -688px;
    background: url(/static/X/signup/invite-illustration.png) no-repeat;
    background-image: -webkit-image-set(
        url(/static/X/signup/invite-illustration.png) 1x,
        url(/static/X/signup/invite-illustration@2x.png) 2x
    );
    background-size: auto 100%;

    @media (max-height: 800px) {
        width: 846px;
        margin-left: -500px;
    }

    @media (max-height: 600px) {
        background: none;
        background-image: none;
    }
`;

export const FooterImage = () => {
    return (
        <div className={cx(imageWrapperStyle, imageWrapperWithFooterStyle)}>
            <div className={imageStyle} />
        </div>
    );
};

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
                let res = await client.mutateRoomJoinInviteLink({ invite: props.invite });
                router!.navigate(`/mail/${res.join.id}`);
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
                <XView
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                    marginTop={50}
                >
                    <XAvatar2
                        src={invitedByUser.photo || undefined}
                        title={invitedByUser.name}
                        id={invitedByUser.id}
                        size={24}
                    />
                    <XView marginLeft={12} fontSize={14} lineHeight={1.43}>
                        {invitedByUser.name} {`invites you to join ${chatTypeStr.toLowerCase()}`}
                    </XView>
                </XView>
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
            <XAvatar2 src={photo || undefined} title={title} id={id} size={80} />
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
            {isMobile &&
                !noLogin && (
                    <XView flexDirection="row" justifyContent="center" alignItems="center">
                        <XView fontSize={20} fontWeight="600" color="rgba(0, 0, 0, 0.9)">
                            {`${whereToInvite} invitation`}
                        </XView>
                    </XView>
                )}
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
                <div className={cx(imageWrapperStyle, !noLogin && imageWrapperWithFooterStyle)}>
                    <div className={imageStyle} />
                </div>
            )}

            {!isMobile && noLogin && <Footer />}
        </div>
    );
};

const resolveRoomButton = (
    room: { id: string; membership: SharedRoomMembershipStatus },
    key?: string,
) => {
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
                path={'/mail/' + room.id}
            />
        );
    } else if (room && key) {
        return (
            <JoinLinkButton
                invite={key}
                refetchVars={{ conversationId: room.id! }}
                text="Accept invite"
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
        button = (
            <XView zIndex={1} padding={28} flexShrink={0}>
                <UButton
                    style="primary"
                    size="large"
                    text="Accept invitation"
                    alignSelf="center"
                    flexShrink={0}
                    path={signupRedirect}
                    zIndex={2}
                />
            </XView>
        );
    } else if (room) {
        button = resolveRoomButton(room, key);
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
