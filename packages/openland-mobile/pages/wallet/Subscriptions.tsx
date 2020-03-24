import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState } from 'openland-api/spacex.types';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, Text, Image, ViewComponent } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { convertSubscription, SubscriptionConverted, displaySubscriptionDate } from 'openland-y-utils/wallet/subscription';
import { SRouter } from 'react-native-s/SRouter';
import { TouchableOpacity } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';

const SubscriptionView = React.memo((props: SubscriptionConverted & { router?: SRouter }) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();

    const showModal = React.useCallback(() => {
        const builder = new ActionSheetBuilder('Done');
        const cancelable = ![WalletSubscriptionState.EXPIRED, WalletSubscriptionState.CANCELED].includes(props.state);

        const WrapComponent = cancelable ? (LinearGradient as any & typeof ViewComponent) : View;
        builder.view((ctx) => (
            <>
                <WrapComponent
                    colors={cancelable ? [theme.gradient0to100Start, theme.gradient0to100End] : undefined}
                    paddingTop={16}
                    paddingLeft={32}
                    paddingRight={32}
                    paddingBottom={32}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => {
                            ctx.hide();
                            if (props.product.__typename === 'WalletProductGroup') {
                                console.warn(props.product.__typename);
                                props.router?.push('Conversation', { id: props.id });
                            } else if (props.product.__typename === 'WalletProductDonation') {
                                props.router?.push('ProfileUser', { id: props.id });
                            }
                        }}
                    >
                        <View alignItems="center">
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
                                    {props.amountSubtitle}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </WrapComponent>
                {cancelable && (
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
                            action={async () => {
                                await client.mutateCancelSubscription({ id: props.subscriptionId });
                                await client.refetchSubscriptions();

                                ctx.hide();
                            }}
                        />
                        <View marginTop={16}>
                            <Text allowFontScaling={false} style={{ ...TextStyles.Caption, color: theme.foregroundSecondary, textAlign: 'center' }}>
                                If you cancel now, you can still access {"\n"} the group until {displaySubscriptionDate(props.expires)}
                            </Text>
                        </View>
                    </View>
                )}
            </>
        ));

        builder.show();
    }, [props.state]);

    return props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING ? (
        <ZListItem
            text={props.title}
            subTitle={props.subtitle}
            leftAvatar={{ photo: props.photo, id: props.id, title: props.title }}
            path="Wallet"
        />
    ) : (
            <ZListItem
                text={props.title}
                subTitle={props.subtitle}
                leftAvatar={{ photo: props.photo, id: props.id, title: props.title }}
                onPress={showModal}
            />
        );
});

const SubscriptionsComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext);
    const subscriptions = client.useSubscriptions({ fetchPolicy: 'cache-and-network' }).subscriptions;
    const groupSubscriptions = subscriptions.filter(subscription => subscription.product.__typename === 'WalletProductGroup');
    const normalizedSubscriptions = groupSubscriptions.map(convertSubscription);

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
                <ASSafeAreaView flexGrow={1} alignItems="center" justifyContent="center" flexDirection="column">
                    <View
                        paddingLeft={32}
                        paddingRight={32}
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
                            <ZButton title='Discover groups' path="Explore" />
                        </View>
                    </View>
                </ASSafeAreaView>
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
                                    Billing problem
                            </Text>
                            </View>
                            <View marginTop={4}>
                                <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center' }}>
                                    A payment for some of your recent purchases or subscriptions has recently failed. Please update your payment method to keep your paid group memberships.
                            </Text>
                            </View>
                            <View marginTop={16}>
                                <ZButton title='Update payment method' path="Wallet" />
                            </View>
                        </LinearGradient>
                    )}

                    <ZListGroup header="Active">
                        {activeSubscriptions.map(subscription => <SubscriptionView key={subscription.id} {...subscription} router={router} />)}
                    </ZListGroup>

                    <ZListGroup header="Expired">
                        {expiredSubscriptions.map(subscription => <SubscriptionView key={subscription.id} {...subscription} router={router} />)}
                    </ZListGroup>

                </SScrollView>
            )}
        </View>
    );
});

export const Subscriptions = withApp(SubscriptionsComponent);