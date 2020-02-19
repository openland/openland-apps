import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState, Subscriptions_subscriptions_product_WalletProductGroup } from 'openland-api/spacex.types';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, Text, Image } from 'react-native';
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
                    photo={props.photo}
                    title={props.title}
                    id={props.id}
                    size='xx-large'
                />
                <View marginTop={16}>
                    <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                        {props.title}
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
                        {generateSubTitle(props)}
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
                        photo={props.photo}
                        title={props.title}
                        id={props.id}
                        size='xx-large'
                    />
                    <View marginTop={16}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                            {props.title}
                        </Text>
                    </View>
                    <View marginTop={4}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundTertiary }}>
                            {generateSubTitle(props)}
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
            leftAvatar={{ photo: props.photo, id: props.id, title: props.title }}
            path="Wallet"
        />
    ) : (
            <ZListItem
                text={props.title}
                subTitle={generateSubTitle(props)}
                leftAvatar={{ photo: props.photo, id: props.id, title: props.title }}
                onPress={props.state === WalletSubscriptionState.STARTED ? showModalWithCancel : showModal}
            />
        );
});

const SubscriptionsComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const theme = React.useContext(ThemeContext);
    const subscriptions = client.useSubscriptions({ fetchPolicy: 'cache-and-network' }).subscriptions;
    const groupSubscriptions = subscriptions.filter(subscription => subscription.product.__typename === 'WalletProductGroup');
    const normalizedSubscriptions: NormalizedSubscription[] = groupSubscriptions.map(subscription => {
        const group = (subscription.product as Subscriptions_subscriptions_product_WalletProductGroup).group;

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

    const haveBillingProblems = normalizedSubscriptions.filter(
        subscription =>
            subscription.state === WalletSubscriptionState.RETRYING ||
            subscription.state === WalletSubscriptionState.GRACE_PERIOD
    ).length > 0;

    return (
        <View flexGrow={1}>

            <SHeader title="Subscriptions" />

            {activeSubscriptions.length === 0 && expiredSubscriptions.length === 0 && (
                <View
                    paddingLeft={32}
                    paddingRight={32}
                    // paddingBottom={32}
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Image
                        source={require('assets/art-empty.png')}
                        style={{
                            width: 240,
                            height: 150,
                        }}
                    />
                    <View marginTop={4}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                            No subscriptions yet
                        </Text>
                    </View>
                    <View marginTop={4}>
                        <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center' }}>
                            Join any premium groups, and they will appear here
                        </Text>
                    </View>
                    <View marginTop={16}>
                        <ZButton title='Discover groups' path="Discover" />
                    </View>
                </View>
            )}

            {(activeSubscriptions.length > 0 || expiredSubscriptions.length > 0) && (
                <SScrollView>
                    {haveBillingProblems && (
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
                            <Image
                                source={require('assets/art-error.png')}
                                style={{
                                    width: 240,
                                    height: 150,
                                }}
                            />
                            <View marginTop={4}>
                                <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                                    Billing problems
                            </Text>
                            </View>
                            <View marginTop={4}>
                                <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center' }}>
                                    Some transactions for subscriptions are failed. Complete them or add a new card to keep subscriptions ongoing
                            </Text>
                            </View>
                            <View marginTop={16}>
                                <ZButton title='Open wallet' path="Wallet" />
                            </View>
                        </LinearGradient>
                    )}

                    <ZListGroup header="Active">
                        {activeSubscriptions.map(subscription => <SubscriptionView key={subscription.id} {...subscription} />)}
                    </ZListGroup>

                    <ZListGroup header="Expired">
                        {expiredSubscriptions.map(subscription => <SubscriptionView key={subscription.id} {...subscription} />)}
                    </ZListGroup>

                </SScrollView>
            )}
        </View>
    );
});

export const Subscriptions = withApp(SubscriptionsComponent);