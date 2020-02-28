import * as React from 'react';
import { View, Text, Alert, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { Room_room_SharedRoom, ChatJoin_room_SharedRoom, WalletSubscriptionState } from 'openland-api/spacex.types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { useClient } from 'openland-api/useClient';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { showPayConfirm } from '../modals/PayConfirm';
import { SRouter } from 'react-native-s/SRouter';
import { OpenlandClient } from 'openland-api/spacex';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        marginTop: 32,
        textAlign: 'center'
    } as TextStyle,
    description: {
        ...TextStyles.Body,
        marginTop: 4,
        textAlign: 'center',
    } as TextStyle,
    members: {
        ...TextStyles.Body,
    } as TextStyle,
    buttonWrapper: {
        paddingTop: 16,
        paddingHorizontal: 16
    } as ViewStyle
});

interface ChatJoinProps {
    room: Room_room_SharedRoom;
    theme: ThemeGlobal;
    router: SRouter;
}

interface ChatJoinComponentProps {
    room: Pick<Room_room_SharedRoom, 'id' | 'title' | 'photo' | 'description' | 'membersCount' | 'onlineMembersCount' | 'previewMembers' | 'isChannel' | 'isPremium' | 'premiumPassIsActive' | 'premiumSettings' | 'premiumSubscription' | 'owner'>;
    theme: ThemeGlobal;
    action: () => Promise<any>;
    invitedBy?: { id: string, name: string, photo: string | null };
    router: SRouter;
}

interface JoinPaidGroupProps {
    id: string;
    premiumSettings: { price: number; interval?: WalletSubscriptionInterval | null };
    title: string;
    photo?: string;
    router: SRouter;
    client: OpenlandClient;
    onError?: () => void;
}

export const joinPaidGroup = (props: JoinPaidGroupProps) => {
    showPayConfirm({
        router: props.router,
        amount: props.premiumSettings.price,
        ...(props.premiumSettings.interval ?
            { type: 'subscription', interval: props.premiumSettings.interval } :
            { type: 'payment' }),
        productTitle: props.title,
        productDescription: props.premiumSettings.interval ? 'Subscription' : 'Payment',
        productPicture: <ZAvatar size="medium" title={props.title} id={props.id} photo={props.photo} />,
        action: async () => {
            try {
                let passIsActive = false;
                if (props.premiumSettings.interval) {
                    passIsActive = (await props.client.mutateBuyPremiumChatSubscription({ chatId: props.id })).betaBuyPremiumChatSubscription.premiumPassIsActive;
                } else {
                    passIsActive = (await props.client.mutateBuyPremiumChatPass({ chatId: props.id })).betaBuyPremiumChatPass.premiumPassIsActive;
                }
                if (passIsActive) {
                    props.router.pushAndRemove('Conversation', { id: props.id });
                }
            } catch (e) {
                AlertBlanket.alert(e.message);
                if (props.onError) {
                    props.onError();
                }
            }
        },
    });
};

const BuyPaidChatPassButton = (props: {
    id: string;
    premiumSettings: { price: number; interval?: WalletSubscriptionInterval | null };
    title: string;
    photo?: string;
    ownerId?: string | null;
    router: SRouter;
}) => {
    const client = useClient();
    const [loading, setLoading] = React.useState(false);
    const buyPaidChatPass = React.useCallback(async () => {
        joinPaidGroup({
            id: props.id,
            premiumSettings: props.premiumSettings,
            title: props.title,
            photo: props.photo,
            router: props.router,
            client,
            onError: () => setLoading(false),
        });
    }, []);

    let buttonText = 'Join for ' + formatMoney(props.premiumSettings.price, true);
    if (props.premiumSettings.interval) {
        if (props.premiumSettings.interval === WalletSubscriptionInterval.WEEK) {
            buttonText += ' / wk.';
        } else if (props.premiumSettings.interval === WalletSubscriptionInterval.MONTH) {
            buttonText += ' / mo.';
        }
    }

    return (
        <View style={styles.buttonWrapper}>
            <ZButton
                loading={loading}
                style="pay"
                title={buttonText}
                onPress={buyPaidChatPass}
                size="large"
            />
            {props.ownerId && <View marginTop={16}>
                <ZButton
                    title="Get help"
                    onPress={() => props.router.push('Conversation', { id: props.ownerId })}
                    size="large"
                    style="secondary"
                />
            </View>}
        </View>
    );
};
export const ChatJoinComponent = React.memo((props: ChatJoinComponentProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const { theme, action, invitedBy, room } = props;
    let { id, title, photo, description, membersCount, onlineMembersCount, previewMembers = [], isChannel } = room;
    const typeStr = isChannel ? 'channel' : 'group';
    const paddingBottom = Platform.OS === 'ios' ? (area.bottom || 16) : area.bottom + 16;

    const avatars = previewMembers.map(x => x.photo).filter(x => !!x).slice(0, 5);
    let showMembers = membersCount ? membersCount >= 10 && avatars.length >= 3 : false;
    const showOnlineMembers = onlineMembersCount ? onlineMembersCount >= 10 : false;
    let joinTitle = !!invitedBy ? `${invitedBy.name} invites you to join “${title}”` : title;
    const joinAvatars = !!invitedBy ? (
        <View flexDirection="row" justifyContent="center">
            <View marginLeft={-14} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
                <ZAvatar
                    photo={invitedBy.photo}
                    size="x-large"
                    id={invitedBy.id}
                    title={invitedBy.name}
                />
            </View>
            <View marginLeft={-14} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
                <ZAvatar
                    photo={photo}
                    size="x-large"
                    id={id}
                    title={title}
                />
            </View>
        </View>
    ) : (
            <ZAvatar
                photo={photo}
                size="xx-large"
                id={id}
                title={title}
            />
        );

    const membersContent = (
        <>
            <View flexDirection="row" justifyContent="center" marginTop={32}>
                {avatars.map(src => (
                    <View marginLeft={-8} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
                        <ZAvatar
                            photo={src}
                            size="small"
                        />
                    </View>
                ))}
            </View>
            <View marginTop={8}>
                <Text style={[styles.members, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                    {membersCount} members{showOnlineMembers && `, ${onlineMembersCount} online`}
                </Text>
            </View>
        </>
    );

    const [loading, setLoading] = React.useState(false);
    const handleButtonPress = React.useCallback(async () => {
        setLoading(true);
        try {
            await action();
        } catch (e) {
            Alert.alert(e.message);
            setLoading(false);
        }
    }, [action]);

    let button = (
        <View style={styles.buttonWrapper}>
            <ZButton
                title={`Join ${typeStr}`}
                size="large"
                loading={loading}
                onPress={handleButtonPress}
            />
        </View>
    );
    if (room.isPremium && !room.premiumPassIsActive) {
        if (
            room.premiumSubscription &&
            room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED
        ) {
            button = (
                <View style={styles.buttonWrapper}>
                    <ZButton
                        title={`Open wallet`}
                        size="large"
                        loading={loading}
                        onPress={() => props.router.push('Wallet')}
                    />
                </View>
            );
            showMembers = false;
            joinTitle = `Your access to “${room.title}” is suspended`;
            description = 'To keep your access to the group by subscription you need to complete payment';
        } else {
            button = (
                <BuyPaidChatPassButton
                    router={props.router}
                    id={room.id}
                    premiumSettings={room.premiumSettings!}
                    title={room.title}
                    photo={room.photo}
                    ownerId={room.owner && room.owner.id}
                />
            );
        }
    }

    return (
        <View style={{ flexGrow: 1, paddingTop: area.top, paddingBottom }}>
            <View style={styles.container}>
                {joinAvatars}
                <Text style={[styles.title, { color: theme.foregroundPrimary }]} numberOfLines={3} allowFontScaling={false}>
                    {joinTitle}
                </Text>
                {!!description && (
                    <Text style={[styles.description, { color: theme.foregroundSecondary }]} numberOfLines={4} allowFontScaling={false}>
                        {description}
                    </Text>
                )}
                {showMembers && membersContent}
                {!showMembers && !description && (
                    <View marginTop={4}>
                        <Text style={[styles.members, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                            New {typeStr}
                        </Text>
                    </View>
                )}
            </View>
            {button}
        </View>
    );
});

export const ChatJoin = React.memo((props: ChatJoinProps) => {
    const client = getClient();
    const room = client.useChatJoin({ id: props.room.id }).room as ChatJoin_room_SharedRoom;
    const action = React.useCallback(async () => {
        await client.mutateRoomJoin({ roomId: props.room.id });
        await client.refetchRoomTiny({ id: props.room.id });
    }, [props.room.id]);

    return <ChatJoinComponent room={room} theme={props.theme} action={action} router={props.router} />;
});