import * as React from 'react';
import * as Cookie from 'js-cookie';
import { css, cx } from 'linaria';
import {
    ResolvedInvite_invite_InviteInfo_organization,
    WalletSubscriptionInterval,
    WalletSubscriptionState,
    ResolvedInvite_invite_RoomInvite_room, ResolvedInvite_shortnameItem_SharedRoom,
} from 'openland-api/spacex.types';
import { XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { trackEvent } from 'openland-x-analytics';
import { XTrack } from 'openland-x-analytics/XTrack';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { showPayConfirm } from '../wallet/modals/showPayConfirm';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { UText } from 'openland-web/components/unicorn/UText';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import {
    AuthSidebarComponent,
    AuthMobileHeader,
} from 'openland-web/pages/root/AuthSidebarComponent';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';

type SharedRoomT = ResolvedInvite_shortnameItem_SharedRoom | ResolvedInvite_invite_RoomInvite_room;

function switchOrganization(id: string, redirect?: string) {
    Cookie.set('x-openland-org', id, { path: '/' });
    window.location.href = redirect || '/';
}

const container = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
`;

const mobileContainer = css`
    flex-direction: column;
`;

const noLoginContainer = css`
    max-height: 100vh;
`;

const rootContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;
`;

const rootContent = css`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 1;
`;

const shadowClassName = css`
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    z-index: 1;
    background-image: linear-gradient(to bottom, var(--transparent), var(--backgroundPrimary));
`;

const scrollContainer = css`
    padding: 32px 32px 88px 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 0;
    flex-shrink: 1;
`;

const scrollContainerScroll = css`
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: var(--backgroundPrimary);
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

const titleWrapperStyle = css`
    margin-top: 32px;
    max-width: 320px;
    align-self: center;
    flex-shrink: 0;
    display: flex;
`;

const titleStyle = css`
    text-align: center;
    color: var(--foregroundPrimary);
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const featuredIconWrapperStyle = css`
    margin-left: 4px;
    align-self: center;
    display: inline-flex;
    vertical-align: middle;
`;

const featuredIconStyle = css`
    display: var(--featured-icon-display);
`;

const descriptionStyle = css`
    text-align: center;
    color: var(--foregroundSecondary);
    margin-top: 8px;
    max-width: 320px;
    align-self: center;
    flex-shrink: 0;
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
    position: absolute;
    bottom: 20px;
    margin: auto;
    flex-shrink: 0;
    z-index: 2;
    align-self: center;
`;

interface InviteLandingComponentLayoutProps {
    whereToInvite: 'channel' | 'group' | 'organization' | 'community';
    photo: string | null;
    title: string;
    entityTitle: string;
    id: string;
    membersCount?: number | null;
    description?: string | null;
    hideFakeDescription?: boolean;
    button?: JSX.Element;
    noLogin: boolean;
    room?: SharedRoomT;
    featured: boolean | undefined;
}

export const InviteLandingComponentLayout = React.memo(
    (props: InviteLandingComponentLayoutProps) => {
        const isMobile = useIsMobile();
        const scrollRef = React.useRef<HTMLDivElement>(null);
        const [showShadow, setShowShadow] = React.useState(false);
        const {
            whereToInvite,
            photo,
            title,
            entityTitle,
            id,
            membersCount,
            description,
            hideFakeDescription,
            button,
            room,
            featured
        } = props;

        const avatars = room
            ? room.previewMembers
                .map((x) => x)
                .filter((x) => !!x)
                .slice(0, 5)
            : [];

        const showMembers = membersCount ? membersCount >= 10 && avatars.length >= 3 : false;

        React.useEffect(() => {
            const handler = () => {
                if (scrollRef && scrollRef.current) {
                    if (scrollRef.current.scrollHeight !== scrollRef.current.clientHeight) {
                        setShowShadow(true);
                    } else {
                        setShowShadow(false);
                    }
                }
            };
            handler();
            document.addEventListener('resize', handler);
            return () => document.removeEventListener('resize', handler);
        }, [scrollRef]);

        return (
            <div className={cx(container, props.noLogin && noLoginContainer, isMobile && mobileContainer)}>
                {props.noLogin && !isMobile && <AuthSidebarComponent />}
                {props.noLogin && isMobile && <AuthMobileHeader />}
                <div className={rootContainer}>
                    <div className={rootContent}>
                        <div
                            className={cx(scrollContainer, showShadow && scrollContainerScroll)}
                            ref={scrollRef}
                        >
                            <div className={avatarsContainer}>
                                <UAvatar
                                    photo={photo}
                                    title={entityTitle}
                                    id={id}
                                    size="xx-large"
                                />
                            </div>
                            <div className={titleWrapperStyle}>
                                <div className={cx(TextTitle1, titleStyle)}>
                                    {title}
                                    {featured && (
                                        <div className={featuredIconWrapperStyle}>
                                            <UIcon
                                                className={featuredIconStyle}
                                                size={18}
                                                icon={<IcFeatured />}
                                                color="#3DA7F2"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!!description && (
                                <div className={cx(TextBody, descriptionStyle)}>
                                    <UText text={description} />
                                </div>
                            )}
                            {showMembers && room && (
                                <div className={membersContainer}>
                                    <div className={membersAvatarsContainer}>
                                        {avatars.map((i) => (
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
                                    </div>
                                </div>
                            )}
                            {!showMembers && !description && !hideFakeDescription && (
                                <div className={cx(TextBody, descriptionStyle)}>
                                    New {whereToInvite}
                                </div>
                            )}
                        </div>
                        {button && <div className={buttonContainer}>{button}</div>}
                        {showShadow && <div className={shadowClassName} />}
                    </div>
                </div>
            </div>
        );
    },
);

const JoinButton = ({ roomId, text }: { roomId: string; text: string }) => {
    const client = useClient();
    const router = useTabRouter().router;
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
                await client.refetchRoomChat({ id: roomId });
                router.reset(`/mail/${roomId}`);
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
    const router = useTabRouter().router;

    const onAccept = React.useCallback(async () => {
        let timer: any;
        trackEvent('invite_button_clicked');
        props.onAccept(true);
        const res = await client.mutateRoomJoinInviteLink({ invite: props.invite });
        router.reset(`/mail/${res.join.id}`);
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

const formatWithInterval = (premiumSettings: {
    price: number;
    interval?: WalletSubscriptionInterval | null;
}) => {
    let text = formatMoney(premiumSettings.price);
    if (premiumSettings.interval) {
        if (premiumSettings.interval === WalletSubscriptionInterval.WEEK) {
            text += ' / wk';
        } else if (premiumSettings.interval === WalletSubscriptionInterval.MONTH) {
            text += ' / mo';
        }
    }
    return text;
};

const BuyPaidChatPassButton = (props: {
    id: string;
    premiumSettings: { price: number; interval?: WalletSubscriptionInterval | null };
    title: string;
    photo?: string;
    ownerId?: string | null;
}) => {
    const client = useClient();
    const router = useTabRouter().router;

    const [loading, setLoading] = React.useState(false);
    const buyPaidChatPass = React.useCallback(async () => {
        showPayConfirm({
            amount: props.premiumSettings.price,
            ...(props.premiumSettings.interval
                ? { type: 'subscription', interval: props.premiumSettings.interval }
                : { type: 'payment' }),
            productTitle: props.title,
            productDescription: props.premiumSettings.interval ? 'Subscription' : 'Payment',
            productPicture: <UAvatar title={props.title} id={props.id} photo={props.photo} />,
            action: async () => {
                try {
                    let passIsActive = false;
                    if (props.premiumSettings.interval) {
                        passIsActive = (
                            await client.mutateBuyPremiumChatSubscription({
                                chatId: props.id,
                            })
                        ).betaBuyPremiumChatSubscription.premiumPassIsActive;
                    } else {
                        passIsActive = (await client.mutateBuyPremiumChatPass({ chatId: props.id }))
                            .betaBuyPremiumChatPass.premiumPassIsActive;
                    }
                    if (passIsActive) {
                        router.reset('/mail/' + props.id);
                    }
                } catch (e) {
                    setLoading(false);
                }
            },
        });
    }, []);

    let buttonText = 'Join for ' + formatWithInterval(props.premiumSettings);

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
            {props.ownerId && (
                <UButton
                    text="Get help"
                    path={`/mail/${props.ownerId}`}
                    shape="square"
                    size="large"
                    style="secondary"
                    width={240}
                />
            )}
        </>
    );
};

const resolveRoomButton = (room: SharedRoomT, buttonText: string, key?: string) => {
    const [loading, setLoading] = React.useState(false);
    if (room && room.isPremium && room.premiumSettings && !room.premiumPassIsActive) {
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
        return <JoinLinkButton invite={key} onAccept={setLoading} text={buttonText} />;
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

export const SharedRoomPlaceholder = ({ room }: { room: ResolvedInvite_invite_RoomInvite_room }) => {
    const buttonText = room.isChannel ? 'Join channel' : 'Join group';
    const premiumSuspended =
        room &&
        room.isPremium &&
        !room.premiumPassIsActive &&
        room.premiumSubscription &&
        room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED;
    return (
        <InviteLandingComponentLayout
            button={resolveRoomButton(room, buttonText)}
            whereToInvite="group"
            photo={room.photo}
            title={premiumSuspended ? `Your access to “${room.title}” is suspended` : room.title}
            featured={room.featured}
            entityTitle={room.title}
            id={room.id}
            membersCount={room.membersCount}
            description={
                premiumSuspended
                    ? 'To keep your access to the group by subscription you need to complete payment'
                    : room.description
            }
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
    const router = React.useContext(XViewRouterContext)!;
    const toast = useToast();

    const path = window.location.pathname.split('/');
    let key = unicorn ? unicorn.id : path[path.length - 1];

    // Sorry universe. Ugly fix for PLN-546
    if (key.endsWith('.')) {
        key = key.slice(0, key.length - 1);
    }

    let invite = client.useResolvedInvite({ key });
    let room: SharedRoomT | undefined;
    let organization: ResolvedInvite_invite_InviteInfo_organization | undefined;

    if (invite.invite && invite.invite.__typename === 'InviteInfo' && invite.invite.organization) {
        organization = invite.invite.organization;
    }

    if (invite.invite && invite.invite.__typename === 'RoomInvite') {
        room = invite.invite.room;
    }

    if (invite.shortnameItem && invite.shortnameItem.__typename === 'SharedRoom') {
        room = invite.shortnameItem;
        Cookie.set('x-openland-shortname', key, { path: '/' });
    }

    if (invite.invite && invite.invite.__typename === 'AppInvite') {
        router.navigate('/');
        return null;
    }

    let button: JSX.Element | undefined;
    const isPremium = room && room.isPremium;

    const whereToInvite = room
        ? room.isChannel
            ? 'channel'
            : 'group'
        : organization && organization.isCommunity
            ? 'community'
            : 'organization';

    const buttonText = 'Join ' + whereToInvite;

    if (!loggedIn) {
        button = (
            <UButton
                style={isPremium ? 'pay' : 'primary'}
                size="large"
                shape="square"
                text={
                    room && room.isPremium && room.premiumSettings
                        ? 'Join for ' + formatWithInterval(room.premiumSettings)
                        : buttonText
                }
                alignSelf="center"
                flexShrink={0}
                path={signupRedirect}
                zIndex={2}
            />
        );
    } else if (room) {
        button = resolveRoomButton(room, buttonText, key);
    } else if (organization) {
        button = (
            <UButton
                text={organization.isMine ? 'Open ' + whereToInvite : buttonText}
                action={async () => {
                    if (organization!.isMine && loggedIn) {
                        router.navigate(`/${organization!.id}`);
                        return;
                    }
                    trackEvent('invite_button_clicked');
                    try {
                        await client.mutateAccountInviteJoin({
                            inviteKey: key,
                        });
                    } catch (e) {
                        if (!!toast) {
                            toast.show({
                                type: 'failure',
                                text: 'You don’t have an access',
                            });
                        }
                        return;
                    }
                    if (loggedIn) {
                        router.navigate(`/${organization!.id}`);
                        return;
                    }
                    switchOrganization(organization!.id);
                }}
                style="primary"
                alignSelf="center"
                flexShrink={0}
                size="large"
            />
        );
    }

    const premiumSuspended =
        room &&
        room.isPremium &&
        !room.premiumPassIsActive &&
        room.premiumSubscription &&
        room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED;

    return (
        <>
            <XTrack
                event={loggedIn ? 'invite_screen_view' : 'invite_landing_view'}
                params={{
                    invite_type: whereToInvite,
                    entity_id: room?.id || organization?.id,
                }}
            />
            {premiumSuspended ? (
                <InviteLandingComponentLayout
                    button={button}
                    whereToInvite={whereToInvite}
                    photo={room ? room.photo : organization!.photo}
                    title={`Your access to “${room ? room.title : organization!.name
                        }” is suspended`}
                    entityTitle={room ? room.title : organization!.name}
                    id={room ? room.id : organization!.id}
                    description={
                        'To keep your access to the group by subscription you need to complete payment'
                    }
                    featured={room ? room.featured : organization?.featured}
                    room={room}
                    noLogin={!loggedIn}
                />
            ) : (
                    <InviteLandingComponentLayout
                        button={button}
                        whereToInvite={whereToInvite}
                        photo={room ? room.photo : organization!.photo}
                        title={room ? room.title : organization!.name}
                        entityTitle={room ? room.title : organization!.name}
                        id={room ? room.id : organization!.id}
                        membersCount={room ? room.membersCount : organization!.membersCount}
                        description={room ? room.description : organization!.about}
                        featured={room ? room.featured : organization?.featured}
                        room={room}
                        noLogin={!loggedIn}
                    />
                )}
        </>
    );
};
