import * as React from 'react';
import * as Cookie from 'js-cookie';
import {
    ResolvedInvite_invite_InviteInfo_organization,
    WalletSubscriptionInterval,
    WalletSubscriptionState,
    ResolvedInvite_invite_RoomInvite_room,
    ResolvedInvite_shortnameItem_SharedRoom,
} from 'openland-api/spacex.types';
import { XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { trackEvent } from 'openland-x-analytics';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { showPayConfirm } from '../wallet/modals/showPayConfirm';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { useToast } from 'openland-web/components/unicorn/UToast';
// import { showModalBox } from 'openland-x/showModalBox';

type SharedRoomT = ResolvedInvite_shortnameItem_SharedRoom | ResolvedInvite_invite_RoomInvite_room;
type OrgT = ResolvedInvite_invite_InviteInfo_organization;

function switchOrganization(id: string) {
    Cookie.set('x-openland-org', id, { path: '/' });
    window.location.href = '/';
}

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
                    let passIsActive;
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

export const resolveRoomButton = (room: SharedRoomT, inviteKey?: string) => {
    const buttonText = 'Join ' + (room.isChannel ? 'channel' : 'group');
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
        !inviteKey
    ) {
        return <JoinButton roomId={room.id!} text={buttonText} />;
    } else if (room && room.membership === 'MEMBER') {
        return (
            <UButton
                style="primary"
                size="large"
                text={'Open ' + room.isChannel ? 'channel' : 'group'}
                alignSelf="center"
                flexShrink={0}
                loading={loading}
                path={'/mail/' + room.id}
            />
        );
    } else if (room && inviteKey) {
        return <JoinLinkButton invite={inviteKey} onAccept={setLoading} text={buttonText} />;
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

export const resolveOrgButton = (organization: OrgT, noLogin: boolean, inviteKey: string) => {
    const toast = useToast();
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    const whereToInvite = organization.isCommunity ? 'community' : 'organization';
    const buttonText = 'Join ' + whereToInvite;
    return (
        <UButton
            text={organization.isMine ? 'Open ' + whereToInvite : buttonText}
            action={async () => {
                if (organization!.isMine && !noLogin) {
                    router.navigate(`/${organization!.id}`);
                    return;
                }
                trackEvent('invite_button_clicked');
                try {
                    await client.mutateAccountInviteJoin({
                        inviteKey: inviteKey,
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
                if (!noLogin) {
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
};

// const showMobileModal = () => {
//     showModalBox({ title: 'hui' }, (ctx) => <div>hui</div>);
// };

export const noLoginMobileButton = (buttonText: string, os: 'iOS' | 'Android') => {
    const iosStore = 'https://apps.apple.com/ru/app/openland-messenger/id1435537685';
    const androidStore = 'https://play.google.com/store/apps/details?id=com.openland.app';

    React.useEffect(() => {
        if (window.location.search === '?q=store') {
            window.location.href = iosStore;
        }
    }, [window.location]);

    const androidOsClick = React.useCallback(() => {
        window.location.href = 'openland://deep' + window.location.pathname;
        setTimeout(() => {
            window.location.href = androidStore;
        }, 300);
    }, []);

    const iosClick = React.useCallback(() => {
        window.location.href = window.location.origin + window.location.pathname + '?q=store';
    }, []);
    return (
        <UButton
            text={buttonText}
            size="large"
            shape="square"
            onClick={os === 'Android' ? androidOsClick : iosClick}
        />
    );
};

export const noLoginDesktopButton = (buttonText: string, id: string, room?: SharedRoomT) => {
    const isPremium = room && room.isPremium;
    return (
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
            onClick={() => {
                Cookie.set('x-signin-redirect', id, { path: '/' });
                window.location.href = '/signin';
            }}
            zIndex={2}
        />
    );
};
