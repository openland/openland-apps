import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState, Subscriptions_subscriptions_product_WalletSubscriptionProductGroup } from 'openland-api/spacex.types';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, Text } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { ZButton } from 'openland-mobile/components/ZButton';

interface NormalizedSubscription {
    id: string;
    title: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
    subscriptionId: string;
}

const displayDate = (date: Date) => {
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const month = segments[2];
    const day = segments[1];

    return `${month} ${day}`;
};

const generateSubTitle = (subscription: NormalizedSubscription) => {
    const date = displayDate(subscription.expires);

    switch (subscription.state) {
        case WalletSubscriptionState.STARTED:
            return `Next bill on ${date}`;

        case WalletSubscriptionState.GRACE_PERIOD:
        case WalletSubscriptionState.RETRYING: 
            return "Payment failed";

        case WalletSubscriptionState.CANCELED:
            return `Expires on ${date}`;

        case WalletSubscriptionState.EXPIRED:
            return `Expired on ${date}`;

        default:
            return `Expires on ${date}`;
    }
};

const SubscriptionView = React.memo((props: NormalizedSubscription) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();

    const showModal = React.useCallback(() => {
        const builder = new ActionSheetBuilder('Done');

        builder.view(() => (
            <View
                paddingTop={16}
                paddingBottom={16}
                paddingLeft={32}
                paddingRight={32}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <ZAvatar
                    src={props.photo}
                    placeholderTitle={props.title}
                    placeholderKey={props.id}
                    size='xx-large'
                />
                <View marginTop={16}>
                    <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                        { props.title }
                    </Text>
                </View>
                <View marginTop={4}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            ...TextStyles.Body,
                            color: props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING
                                ? theme.accentNegative
                                : theme.foregroundTertiary
                        }}
                    >
                        { generateSubTitle(props) }
                    </Text>
                </View>
            </View>
        ));

        builder.show();
    }, []);

    const showModalWithCancel = React.useCallback(() => {
        const builder = new ActionSheetBuilder('Done');

        builder.view(ctx => (
            <>
                <LinearGradient
                    colors={[theme.gradient0to100Start, theme.gradient0to100End]}
                    paddingTop={16}
                    paddingLeft={32}
                    paddingRight={32}
                    paddingBottom={32}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <ZAvatar
                        src={props.photo}
                        placeholderTitle={props.title}
                        placeholderKey={props.id}
                        size='xx-large'
                    />
                    <View marginTop={16}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                            { props.title }
                        </Text>
                    </View>
                    <View marginTop={4}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundTertiary }}>
                            { generateSubTitle(props) }
                        </Text>
                    </View>
                </LinearGradient>
                <View
                    paddingTop={32}
                    paddingBottom={16}
                    paddingLeft={32}
                    paddingRight={32}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ZButton
                        title="Cancel subscription"
                        style="secondary"
                        onPress={() => client.mutateCancelSubscription({ id: props.subscriptionId }).then(() => {
                            client.refetchSubscriptions().then(() => {
                                ctx.hide();
                            });
                        })}
                    />
                    <View marginTop={16}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Caption, color: theme.foregroundSecondary, textAlign: 'center' }}>
                            If you cancel now, you can still access {"\n"} the group until {displayDate(props.expires)}
                        </Text>
                    </View>
                </View>
            </>
        ));

        builder.show();
    }, []);

    return props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING ? (
        <ZListItem
            text={props.title}
            subTitle={generateSubTitle(props)}
            leftAvatar={{ photo: props.photo, key: props.id, title: props.title }}
            path="Wallet"
        />
    ) : (
        <ZListItem
            text={props.title}
            subTitle={generateSubTitle(props)}
            leftAvatar={{ photo: props.photo, key: props.id, title: props.title }}
            onPress={props.state === WalletSubscriptionState.STARTED ? showModalWithCancel : showModal}
        />
    );
});

const SubscriptionsComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const subscriptions = client.useSubscriptions({ fetchPolicy: 'network-only' });
    const groupSubscriptions = subscriptions.subscriptions.filter(subscription => subscription.product.__typename === 'WalletSubscriptionProductGroup');
    const normalizedSubscriptions: NormalizedSubscription[] = groupSubscriptions.map(subscription => {
        const group = (subscription.product as Subscriptions_subscriptions_product_WalletSubscriptionProductGroup).group;

        return {
            ...group,
            subscriptionId: subscription.id,
            state: subscription.state,
            expires: new Date(parseInt(subscription.expires, 10))
        };
    });

    const activeSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.STARTED ||
        subscription.state === WalletSubscriptionState.GRACE_PERIOD ||
        subscription.state === WalletSubscriptionState.RETRYING ||
        subscription.state === WalletSubscriptionState.CANCELED
    );

    const expiredSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.EXPIRED
    );

    return (
        <>
            <SHeader title="Subscriptions" />
            <SScrollView>

                { activeSubscriptions.length > 0 && (
                    <ZListGroup header="Active">
                        { activeSubscriptions.map(subscription => (
                            <SubscriptionView {...subscription} />
                        ))}
                    </ZListGroup>
                )}

                { expiredSubscriptions.length > 0 && (
                    <ZListGroup header="Expired">
                        { expiredSubscriptions.map(subscription => (
                            <SubscriptionView {...subscription} />
                        ))}
                    </ZListGroup>
                )}

            </SScrollView>
        </>
    );
});

export const Subscriptions = withApp(SubscriptionsComponent);