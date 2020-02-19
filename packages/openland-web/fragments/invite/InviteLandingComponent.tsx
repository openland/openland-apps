import * as React from 'react';
import { css, cx } from 'linaria';
import {
    ResolvedInvite_invite_RoomInvite_room,
    ResolvedInvite_invite_InviteInfo_organization,
    SharedRoomMembershipStatus,
    RoomChat_room_SharedRoom,
    WalletSubscriptionInterval,
    WalletSubscriptionState,
} from 'openland-api/spacex.types';
import { XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { switchOrganization } from 'openland-web/utils/switchOrganization';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { MatchmakingStartComponent } from '../matchmaking/MatchmakingStartFragment';
import { showModalBox } from 'openland-x/showModalBox';
import { trackEvent } from 'openland-x-analytics';
import { XTrack } from 'openland-x-analytics/XTrack';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { showPayConfirm } from '../wallet/modals/showPayConfirm';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import {
    AuthSidebarComponent,
    AuthMobileHeader,
} from 'openland-web/pages/root/AuthSidebarComponent';

const container = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
`;

const rootClassName = css`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: var(--backgroundPrimary);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;

const mainContainer = css`
    padding: 0 32px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;
`;

const avatarsContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const bigAvatarWrapper = css`
    flex-shrink: 0;
    margin: 0 -6px;
    border-radius: 100%;
    border: 2px solid var(--backgroundPrimary);
    z-index: 1;
`;

const smallAvatarWrapper = css`
    margin: 0 -4px;
`;

const titleStyle = css`
    text-align: center;
    color: var(--foregroundPrimary);
    margin-top: 32px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
    align-self: center;
`;

const descriptionStyle = css`
    text-align: center;
    color: var(--foregroundSecondary);
    margin-top: 8px;
    max-width: 320px;
    align-self: center;
`;

const membersContainer = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    margin-top: 32px;
`;

const membersAvatarsContainer = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
`;

const buttonContainer = css`
    margin-top: 32px;
    flex-shrink: 0;
    align-self: center;
`;

interface InviteLandingComponentLayoutProps {
    invitedByUser?: {
        id: string;
        name: string;
        photo?: string | null;
    } | null;
    whereToInvite: 'Channel' | 'Group' | 'Organization' | 'Community';
    photo: string | null;
    title: string;
    id: string;
    membersCount?: number | null;
    description?: string | null;
    button: any;
    noLogin: boolean;
    room?: ResolvedInvite_invite_RoomInvite_room | RoomChat_room_SharedRoom;
}

const InviteLandingComponentLayout = React.memo((props: InviteLandingComponentLayoutProps) => {
    const isMobile = useIsMobile();
    const {
        invitedByUser,
        whereToInvite,
        photo,
        title,
        id,
        membersCount,
        description,
        button,
        room,
    } = props;

    const avatars = room
        ? room.previewMembers
            .map(x => x)
            .filter(x => !!x)
            .slice(0, 5)
        : [];

    const showMembers = membersCount ? membersCount >= 10 && avatars.length >= 3 : false;
    const showOnlineMembers = room ? room.onlineMembersCount >= 10 : false;

    const joinTitle = !!invitedByUser
        ? `${invitedByUser.name} invites you to join “${title}”`
        : title;

    return (
        <div className={container}>
            {props.noLogin && !isMobile && <AuthSidebarComponent />}
            <div className={rootClassName}>
                {props.noLogin && isMobile && <AuthMobileHeader />}
                <div className={mainContainer}>
                    {invitedByUser ? (
                        <div className={avatarsContainer}>
                            <div className={bigAvatarWrapper}>
                                <UAvatar
                                    photo={invitedByUser.photo}
                                    title={invitedByUser.name}
                                    id={invitedByUser.id}
                                    size="x-large"
                                />
                            </div>
                            <div className={bigAvatarWrapper}>
                                <UAvatar photo={photo} title={title} id={id} size="x-large" />
                            </div>
                        </div>
                    ) : (
                            <div className={avatarsContainer}>
                                <UAvatar photo={photo} title={title} id={id} size="xx-large" />
                            </div>
                        )}
                    <div className={cx(TextTitle1, titleStyle)}>{joinTitle}</div>
                    {!!description && (
                        <div className={cx(TextBody, descriptionStyle)}>{description}</div>
                    )}
                    {showMembers &&
                        room && (
                            <div className={membersContainer}>
                                <div className={membersAvatarsContainer}>
                                    {avatars.map(i => (
                                        <div
                                            key={i.id}
                                            className={cx(bigAvatarWrapper, smallAvatarWrapper)}
                                        >
                                            <UAvatar
                                                title={i.name}
                                                id={i.id}
                                                photo={i.photo}
                                                size="small"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className={cx(TextBody, descriptionStyle)}>
                                    {membersCount} members
                                    {room &&
                                        showOnlineMembers &&
                                        `, ${room.onlineMembersCount} online`}
                                </div>
                            </div>
                        )}
                    {!showMembers &&
                        !description && (
                            <div className={cx(TextBody, descriptionStyle)}>
                                New {whereToInvite.toLocaleLowerCase()}
                            </div>
                        )}

                    <div className={buttonContainer}>{button}</div>
                </div>
            </div>
        </div>
    );
});

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
                trackEvent('invite_button_clicked');
                await client.mutateRoomJoin({ roomId });
                await client.refetchRoomWithoutMembers({ id: roomId });
                router!.navigate(`/mail/${roomId}`);
            }}
        />
    );
};

const JoinLinkButton = (props: {
    invite: string;
    text: string;
    onAccept: (data: boolean) => void;
    matchmaking?: boolean;
}) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext);

    const onAccept = React.useCallback(async () => {
        let timer: any;
        trackEvent('invite_button_clicked');
        props.onAccept(true);
        const res = await client.mutateRoomJoinInviteLink({ invite: props.invite });
        if (props.matchmaking) {
            router!.navigate(`/matchmaking/${res.join.id}/start`, true);
        } else {
            router!.navigate(`/mail/${res.join.id}`, true);
        }
        setTimeout(() => props.onAccept(false), 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <UButton
            style="primary"
            size="large"
            text={props.text}
            alignSelf="center"
            flexShrink={0}
            action={onAccept}
        />
    );
};

const BuyPaidChatPassButton = (props: {
    id: string;
    premiumSettings: { price: number; interval?: WalletSubscriptionInterval | null };
    title: string;
    photo?: string;
    ownerId?: string | null;
}) => {
    const client = useClient();
    let router = React.useContext(XViewRouterContext)!;
    const [loading, setLoading] = React.useState(false);
    const buyPaidChatPass = React.useCallback(async () => {
        showPayConfirm({
            amount: props.premiumSettings.price,
            ...(props.premiumSettings.interval ?
                { type: 'subscription', interval: props.premiumSettings.interval } :
                { type: 'payment' }),
            productTitle: props.title,
            productDescription: props.premiumSettings.interval ? 'Subscription' : 'Payment',
            productPicture: <UAvatar title={props.title} id={props.id} photo={props.photo} />,
            action: async () => {
                try {
                    let passIsActive = false;
                    if (props.premiumSettings.interval) {
                        passIsActive = (await client.mutateBuyPremiumChatSubscription({ chatId: props.id })).betaBuyPremiumChatSubscription.premiumPassIsActive;
                    } else {
                        passIsActive = (await client.mutateBuyPremiumChatPass({ chatId: props.id })).betaBuyPremiumChatPass.premiumPassIsActive;
                    }
                    if (passIsActive) {
                        router.navigate('/mail/' + props.id);
                    }
                } catch (e) {
                    setLoading(false);
                }
            },
        });
    }, []);

    let buttonText = 'Join for ' + formatMoney(props.premiumSettings.price, true);
    if (props.premiumSettings.interval) {
        if (props.premiumSettings.interval === WalletSubscriptionInterval.WEEK) {
            buttonText += ' / w.';
        } else if (props.premiumSettings.interval === WalletSubscriptionInterval.MONTH) {
            buttonText += ' / mo.';
        }
    }

    return (
        <>
            <UButton
                loading={loading}
                style="pay"
                text={buttonText}
                action={buyPaidChatPass}
                shape="square"
                size="large"
                marginBottom={16}
                width={240}
            />
            {props.ownerId && <UButton
                text="Get help"
                path={`/mail/${props.ownerId}`}
                shape="square"
                size="large"
                style="secondary"
                width={240}
            />}
        </>
    );
};

const resolveRoomButton = (
    room: {
        id: string;
        membership: SharedRoomMembershipStatus;
        premiumSettings?: { price: number; interval?: WalletSubscriptionInterval | null } | null;
        premiumPassIsActive: boolean;
        premiumSubscription?: { state: WalletSubscriptionState } | null;
        title: string;
        photo?: string;
        owner?: { id: string } | null;
    },
    buttonText: string,
    key?: string,
    matchmaking?: boolean,
) => {
    const [loading, setLoading] = React.useState(false);
    if (room && room.premiumSettings && !room.premiumPassIsActive) {
        if (
            room.premiumSubscription &&
            room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED
        ) {
            // pass is not active, but user have non-expired subscription - looks like some problems with subscriptions payment - open wallet
            // TODO: show transaction if ACTION_REQUIRED?
            return (
                <>
                    <UButton
                        text="Open wallet"
                        path="/wallet"
                        shape="square"
                        size="large"
                        marginBottom={16}
                        width={240}
                    />
                    <UButton
                        text="Get help"
                        path="/yury"
                        shape="square"
                        size="large"
                        style="secondary"
                        width={240}
                    />
                </>
            );
        } else {
            return (
                <BuyPaidChatPassButton
                    id={room.id}
                    premiumSettings={room.premiumSettings}
                    title={room.title}
                    photo={room.photo}
                    ownerId={room.owner && room.owner.id}
                />
            );
        }
    } else if (
        room &&
        (room.membership === 'NONE' ||
            room.membership === 'KICKED' ||
            room.membership === 'LEFT') &&
        !key
    ) {
        return <JoinButton roomId={room.id!} text={buttonText} />;
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
                onAccept={setLoading}
                text={buttonText}
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
    const buttonText = room.isChannel ? 'Join channel' : 'Join group';
    return (
        <InviteLandingComponentLayout
            button={resolveRoomButton(room, buttonText)}
            whereToInvite="Group"
            photo={room.photo}
            title={room.title}
            id={room.id}
            membersCount={room.membersCount}
            description={room.description}
            room={room}
            noLogin={false}
        />
    );
};

export const InviteLandingComponent = ({ signupRedirect }: { signupRedirect?: string }) => {
    const userInfo = React.useContext(UserInfoContext);
    const loggedIn = userInfo && userInfo.isLoggedIn;
    const client = useClient();
    const unicorn = useUnicorn();
    const router = React.useContext(XViewRouterContext);

    const path = window.location.pathname.split('/');
    const key = unicorn ? unicorn.id : path[path.length - 1];

    let invite = client.useResolvedInvite({ key });
    let room: ResolvedInvite_invite_RoomInvite_room | undefined;
    let organization: ResolvedInvite_invite_InviteInfo_organization | undefined;

    let invitedByUser;
    let matchmaking;

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
    const isPremium = room && room.isPremium;

    const whereToInvite = room
        ? room.isChannel
            ? 'Channel'
            : 'Group'
        : organization && organization.isCommunity
            ? 'Community'
            : 'Organization';

    const buttonText = 'Join ' + whereToInvite.toLocaleLowerCase();

    if (!loggedIn) {
        button = (
            <UButton
                style={isPremium ? 'pay' : 'primary'}
                size="large"
                shape="square"
                text={
                    room && room.premiumSettings
                        ? `Pay ${formatMoney(room.premiumSettings.price)}`
                        : buttonText
                }
                alignSelf="center"
                flexShrink={0}
                path={!matchmaking ? signupRedirect : undefined}
                onClick={
                    matchmaking && signupRedirect
                        ? () => {
                            showModalBox({ fullScreen: true, useTopCloser: false }, () => (
                                <MatchmakingStartComponent
                                    onStart={() => router!.navigate(signupRedirect)}
                                />
                            ));
                        }
                        : undefined
                }
                zIndex={2}
            />
        );
    } else if (room) {
        button = resolveRoomButton(room, buttonText, key, matchmaking);
    } else if (organization) {
        button = (
            <UButton
                text={buttonText}
                action={async () => {
                    trackEvent('invite_button_clicked');
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

    const premiumSuspended = room && room.isPremium && !room.premiumPassIsActive && (room.premiumSubscription && room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED);

    return (
        <>
            <XTrack
                event={loggedIn ? 'invite_screen_view' : 'invite_landing_view'}
                params={{ invite_type: whereToInvite.toLowerCase() }}
            />
            {premiumSuspended ? <InviteLandingComponentLayout
                button={button}
                whereToInvite={whereToInvite}
                photo={room ? room.photo : organization!.photo}
                title={`Your access to “${room ? room.title : organization!.name}” is suspended`}
                id={room ? room.id : organization!.id}
                description={"To keep your access to the group by subscription you need to complete payment"}
                room={room}
                noLogin={!loggedIn}
            /> :
                <InviteLandingComponentLayout
                    invitedByUser={invitedByUser}
                    button={button}
                    whereToInvite={whereToInvite}
                    photo={room ? room.photo : organization!.photo}
                    title={room ? room.title : organization!.name}
                    id={room ? room.id : organization!.id}
                    membersCount={room ? room.membersCount : organization!.membersCount}
                    description={room ? room.description : organization!.about}
                    room={room}
                    noLogin={!loggedIn}
                />}

        </>
    );
};
