import * as React from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Platform,
    Image,
    ScrollView,
} from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ZText } from 'openland-mobile/components/ZText';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import {
    RoomChat_room_SharedRoom,
    ChatJoin_room_SharedRoom,
    WalletSubscriptionState,
} from 'openland-api/spacex.types';
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
import { isSmallText } from 'openland-y-utils/isSmallText';
import { useText } from 'openland-mobile/text/useText';

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
        textAlign: 'center',
    } as TextStyle,
    description: {
        ...TextStyles.Body,
        marginTop: 12,
        textAlign: 'left',
    } as TextStyle,
    members: {
        ...TextStyles.Body,
    } as TextStyle,
    buttonWrapper: {
        paddingTop: 16,
        paddingHorizontal: 16,
    } as ViewStyle,
});

interface ChatJoinProps {
    room: Omit<RoomChat_room_SharedRoom, 'featured'>;
    theme: ThemeGlobal;
    router: SRouter;
}

interface ChatJoinComponentProps {
    room: ChatJoin_room_SharedRoom;
    ownerId?: string;
    theme: ThemeGlobal;
    action: () => Promise<any>;
    invitedBy?: { id: string; name: string; photo: string | null };
    router: SRouter;
}

interface JoinPaidGroupProps {
    id: string;
    premiumSettings: { price: number; interval?: WalletSubscriptionInterval | null };
    title: string;
    photo?: string;
    router: SRouter;
    client: OpenlandClient;
    onSuccess: () => void;
    onError?: () => void;
}

export const joinPaidGroup = (props: JoinPaidGroupProps) => {
    showPayConfirm({
        router: props.router,
        amount: props.premiumSettings.price,
        ...(props.premiumSettings.interval
            ? { type: 'subscription', interval: props.premiumSettings.interval }
            : { type: 'payment' }),
        productTitle: props.title,
        productDescription: props.premiumSettings.interval ? 'Subscription' : 'Payment',
        productPicture: (
            <ZAvatar size="medium" title={props.title} id={props.id} photo={props.photo} />
        ),
        action: async () => {
            try {
                let passIsActive = false;
                if (props.premiumSettings.interval) {
                    passIsActive = (
                        await props.client.mutateBuyPremiumChatSubscription({ chatId: props.id })
                    ).betaBuyPremiumChatSubscription.premiumPassIsActive;
                } else {
                    passIsActive = (
                        await props.client.mutateBuyPremiumChatPass({ chatId: props.id })
                    ).betaBuyPremiumChatPass.premiumPassIsActive;
                }
                if (passIsActive) {
                    props.onSuccess();
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
            onSuccess: () => props.router.pushAndRemove('Conversation', { id: props.id }),
        });
    }, []);

    let buttonText = 'Join for ' + formatMoney(props.premiumSettings.price);
    if (props.premiumSettings.interval) {
        if (props.premiumSettings.interval === WalletSubscriptionInterval.WEEK) {
            buttonText += ' / wk';
        } else if (props.premiumSettings.interval === WalletSubscriptionInterval.MONTH) {
            buttonText += ' / mo';
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
            {props.ownerId && (
                <View style={{ marginTop: 16 }}>
                    <ZButton
                        title="Get help"
                        onPress={() => props.router.push('Conversation', { id: props.ownerId })}
                        size="large"
                        style="secondary"
                    />
                </View>
            )}
        </View>
    );
};
export const ChatJoinComponent = React.memo((props: ChatJoinComponentProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const {
        theme,
        action,
        // invitedBy,
        room,
        ownerId,
    } = props;
    let {
        id,
        title,
        photo,
        description,
        membersCount,
        previewMembers = [],
        isChannel,
        featured,
    } = room;
    const { t } = useText();
    // const typeStr = isChannel ? t('channel', 'channel') : t('group', 'group');
    const paddingBottom = Platform.OS === 'ios' ? area.bottom || 16 : area.bottom + 16;

    const avatars = previewMembers
        .map((x) => x.photo)
        .filter((x) => !!x)
        .slice(0, 5);
    let showMembers = membersCount ? membersCount >= 10 && avatars.length >= 3 : false;
    // let joinTitle = !!invitedBy ? `${invitedBy.name} invites you to join “${title}”` : title;
    let joinTitle = title;
    // const joinAvatars = !!invitedBy ? (
    //     <View flexDirection="row" justifyContent="center">
    //         <View marginLeft={-14} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
    //             <ZAvatar
    //                 photo={invitedBy.photo}
    //                 size="x-large"
    //                 id={invitedBy.id}
    //                 title={invitedBy.name}
    //             />
    //         </View>
    //         <View marginLeft={-14} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
    //             <ZAvatar
    //                 photo={photo}
    //                 size="x-large"
    //                 id={id}
    //                 title={title}
    //             />
    //         </View>
    //     </View>
    // ) : (
    //         <ZAvatar
    //             photo={photo}
    //             size="xx-large"
    //             id={id}
    //             title={title}
    //         />
    //     );
    const joinAvatars = <ZAvatar photo={photo} size="xx-large" id={id} title={title} />;

    const membersContent = (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
                {avatars.map((src) => (
                    <View
                        style={{
                            marginLeft: -8,
                            borderRadius: 100,
                            borderColor: theme.backgroundPrimary,
                            borderWidth: 2,
                        }}
                    >
                        <ZAvatar photo={src} size="small" />
                    </View>
                ))}
            </View>
            <View style={{ marginTop: 8 }}>
                <Text
                    style={[styles.members, { color: theme.foregroundSecondary }]}
                    allowFontScaling={false}
                >
                    {membersCount} {t('member', { count: membersCount, defaultValue: 'members' })}
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
                title={isChannel ? t('joinChannel', 'Join channel') : t('joinGroup', 'Join group')}
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
                        title={t('openWallet', 'Open wallet')}
                        size="large"
                        loading={loading}
                        onPress={() => props.router.push('Wallet')}
                    />
                </View>
            );
            showMembers = false;
            joinTitle = t('accessSuspended', { title: room.title, defaultValue: 'Your access to “{{title}}” is suspended' });
            description =
                t('accessSuspendedDescription', 'To keep your access to the group by subscription you need to complete payment');
        } else {
            button = (
                <BuyPaidChatPassButton
                    router={props.router}
                    id={room.id}
                    premiumSettings={room.premiumSettings!}
                    title={room.title}
                    photo={room.photo}
                    ownerId={ownerId}
                />
            );
        }
    }

    return (
        <View style={{ flexGrow: 1, maxHeight: '100%', paddingTop: area.top, paddingBottom }}>
            <ScrollView contentContainerStyle={styles.container}>
                {joinAvatars}
                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text
                        style={[styles.title, { color: theme.foregroundPrimary }]}
                        numberOfLines={3}
                        allowFontScaling={false}
                    >
                        {joinTitle}
                    </Text>
                    {featured && theme.displayFeaturedIcon && (
                        <Image
                            source={require('assets/ic-verified-16.png')}
                            style={{
                                tintColor: '#3DA7F2',
                                width: 16,
                                height: 16,
                                flexShrink: 0,
                                marginLeft: 4,
                                marginTop: 2,
                                alignSelf: 'center',
                            }}
                        />
                    )}
                </View>
                {!!description && (
                    <ZText
                        text={description}
                        linkify={true}
                        style={[
                            styles.description,
                            {
                                color: theme.foregroundSecondary,
                                textAlign: isSmallText(description, 150, 3) ? 'center' : 'left',
                            },
                        ]}
                    />
                )}
                {showMembers && membersContent}
                {!showMembers && !description && (
                    <View style={{ marginTop: 4 }}>
                        <Text
                            style={[styles.members, { color: theme.foregroundSecondary }]}
                            allowFontScaling={false}
                        >
                            {isChannel ? t('newChannel', 'New channel') : t('newGroup', 'New group')}
                        </Text>
                    </View>
                )}
            </ScrollView>
            {button}
        </View>
    );
});

export const ChatJoin = React.memo((props: ChatJoinProps) => {
    const client = getClient();
    const room = client.useChatJoin({ id: props.room.id }).room as ChatJoin_room_SharedRoom;
    const action = React.useCallback(async () => {
        await client.mutateRoomJoin({ roomId: props.room.id });
        await client.refetchRoomChat({ id: props.room.id });
    }, [props.room]);

    return (
        <ChatJoinComponent
            room={room}
            ownerId={room.owner ? room.owner.id : undefined}
            theme={props.theme}
            action={action}
            router={props.router}
        />
    );
});
