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
import { useText } from 'openland-mobile/text/useText';

const SubscriptionView = React.memo((props: SubscriptionConverted & { router?: SRouter }) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const { t } = useText();

    const showModal = React.useCallback(() => {
        const builder = new ActionSheetBuilder(t('done', 'Done'));
        const cancelable = ![WalletSubscriptionState.EXPIRED, WalletSubscriptionState.CANCELED].includes(props.state);

        const WrapComponent = cancelable ? (LinearGradient as any & typeof ViewComponent) : View;
        builder.view((ctx) => (
            <>
                <WrapComponent
                    colors={cancelable ? [theme.gradient0to100Start, theme.gradient0to100End] : undefined}
                    paddingTop={16}
                    paddingLeft={32}
                    paddingRight={32}
                    paddingBottom={16}
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
                        <View style={{ alignItems: 'center' }}>
                            <ZAvatar
                                photo={props.photo}
                                id={props.id || ''}
                                size='xx-large'
                            />
                            <View style={{ marginTop: 16 }}>
                                <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                                    {props.title}
                                </Text>
                            </View>
                            <View style={{ marginTop: 4 }}>
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
                        style={{
                            paddingTop: 32,
                            paddingBottom: 16,
                            paddingLeft: 32,
                            paddingRight: 32,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ZButton
                            title={t('subscriptionCancel', 'Cancel subscription')}
                            style="secondary"
                            action={async () => {
                                await client.mutateCancelSubscription({ id: props.subscriptionId });
                                await client.refetchSubscriptions();

                                ctx.hide();
                            }}
                        />
                        <View style={{ marginTop: 16 }}>
                            <Text allowFontScaling={false} style={{ ...TextStyles.Caption, color: theme.foregroundSecondary, textAlign: 'center' }}>
                                {t('subscriptionCancelDescription', {
                                    expireDate: displaySubscriptionDate(props.expires),
                                    defaultValue: 'If you cancel now, you can still access\nthe group until {{expireDate}}'
                                })}
                            </Text>
                        </View>
                    </View>
                )}
            </>
        ));

        builder.show();
    }, [props.state, t]);

    return props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING ? (
        <ZListItem
            text={props.title}
            subTitle={props.subtitle}
            leftAvatar={{ photo: props.photo, id: props.id || '' }}
            path="Wallet"
        />
    ) : (
        <ZListItem
            text={props.title}
            subTitle={props.subtitle}
            leftAvatar={{ photo: props.photo, id: props.id || '' }}
            onPress={showModal}
        />
    );
});

const SubscriptionsComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const { t } = useText();
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext);
    const subscriptions = client.useSubscriptions({ fetchPolicy: 'cache-and-network' }).subscriptions;
    const groupSubscriptions = subscriptions.filter(subscription => subscription.product.__typename === 'WalletProductGroup');
    const normalizedSubscriptions = groupSubscriptions.map(convertSubscription);
    const imgSrc = theme.type === 'Light' ? require('assets/art-empty.png') : require('assets/art-empty-dark.png');

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
        <View style={{ flexGrow: 1 }}>

            <SHeader title={t('subscriptions', 'Subscriptions')} />

            {activeSubscriptions.length === 0 && expiredSubscriptions.length === 0 && (
                <ASSafeAreaView style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <View
                        style={{
                            paddingLeft: 32,
                            paddingRight: 32,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Image
                            source={imgSrc}
                            style={{
                                width: 240,
                                height: 150,
                            }}
                        />
                        <View style={{ marginTop: 4 }}>
                            <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                                {t('subscriptionsEmpty', 'No subscriptions yet')}
                            </Text>
                        </View>
                        <View style={{ marginTop: 4 }}>
                            <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center' }}>
                                {t('subscriptionsEmptyDescription', 'Join any premium groups, and they will appear here')}
                            </Text>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <ZButton title={t('discoverGroups', 'Discover groups')} path="Explore" />
                        </View>
                    </View>
                </ASSafeAreaView>
            )}

            {(activeSubscriptions.length > 0 || expiredSubscriptions.length > 0) && (
                <SScrollView>
                    {haveBillingProblems && (
                        <LinearGradient
                            colors={[theme.gradient0to100Start, theme.gradient0to100End]}
                            style={{
                                paddingTop: 16,
                                paddingLeft: 32,
                                paddingRight: 32,
                                paddingBottom: 32,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <Image
                                source={require('assets/art-error.png')}
                                style={{
                                    width: 240,
                                    height: 150,
                                }}
                            />
                            <View style={{ marginTop: 4 }}>
                                <Text allowFontScaling={false} style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>
                                    {t('billingProblem', 'Billing problem')}
                                </Text>
                            </View>
                            <View style={{ marginTop: 4 }}>
                                <Text allowFontScaling={false} style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center' }}>
                                    {t('billingProblemDescription', 'A payment for some of your recent purchases or subscriptions has recently failed. Please update your payment method to keep your paid group memberships.')}
                                </Text>
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <ZButton title={t('paymentMethodUpdate', 'Update payment method')} path="Wallet" />
                            </View>
                        </LinearGradient>
                    )}

                    <ZListGroup header={t('active', 'Active')}>
                        {activeSubscriptions.map(subscription => <SubscriptionView key={subscription.id} {...subscription} router={router} />)}
                    </ZListGroup>

                    <ZListGroup header={t('expired', 'Expired')}>
                        {expiredSubscriptions.map(subscription => <SubscriptionView key={subscription.id} {...subscription} router={router} />)}
                    </ZListGroup>

                </SScrollView>
            )}
        </View>
    );
});

export const Subscriptions = withApp(SubscriptionsComponent);