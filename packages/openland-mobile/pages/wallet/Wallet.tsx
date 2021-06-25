import * as React from 'react';
import { Linking, View, Text } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SFlatList } from 'react-native-s/SFlatList';
import LinearGradient from 'react-native-linear-gradient';
import { SRouterContext } from 'react-native-s/SRouterContext';

import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-api/useClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Money } from 'openland-y-utils/wallet/Money';
import { useText } from 'openland-mobile/text/useText';
import { useSupportRoom } from 'openland-mobile/utils/useSupportRoom';

import { CardView } from './components/CardView';
import { TransactionView } from './components/TransactionView';
import { AddCardItem } from './components/AddCardItem';
import { showWithdrawFunds } from './components/showWithdrawFunds';

const WalletComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const theme = useTheme();
    const { t } = useText();
    const navigateToSupport = useSupportRoom();
    const router = React.useContext(SRouterContext)!;
    const walletEngine = getMessenger().engine.wallet;
    const walletState = walletEngine.state.useState();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const balance = walletState.balance;
    const transactions = [...walletState.pendingTransactions, ...walletState.historyTransactions];

    const onFaqPress = React.useCallback(() => {
        Linking.openURL('https://www.notion.so/openland/FAQ-d5314c72f67948d49437d021fb221405');
    }, []);

    const handleAddCard = React.useCallback(() => {
        props.router.push('AddCard');
    }, []);

    const content = (
        <>
            <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]}>
                <ZListGroup
                    header={t('paymentMethods', 'Payment methods')}
                    actionRight={
                        cards.length > 0 ? { title: t('addCard', 'Add card'), onPress: handleAddCard } : undefined
                    }
                >
                    {cards.length === 0 && <AddCardItem onPress={handleAddCard} />}
                    {cards.map((card) => (
                        <CardView key={card.id} item={card} />
                    ))}
                </ZListGroup>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 16,
                        marginTop: 16,
                        marginBottom: 24,
                    }}
                >
                    <ZButton
                        title={t('paymentsFaq', 'Payments FAQ')}
                        size="large"
                        flexGrow={1}
                        marginRight={16}
                        style="secondary"
                        onPress={onFaqPress}
                    />
                    <ZButton
                        title={t('paymentsHelp', 'Payments help')}
                        size="large"
                        flexGrow={1}
                        flexShrink={1}
                        style="secondary"
                        onPress={navigateToSupport}
                    />
                </View>
            </LinearGradient>
            <ZListGroup
                header={t('yourBalance', 'Your balance')}
                actionRight={
                    balance !== 0
                        ? { title: t('withdraw', 'Withdraw'), onPress: () => showWithdrawFunds(router) }
                        : undefined
                }
            >
                {balance === 0 && (
                    <Text
                        style={{
                            ...TextStyles.Body,
                            textAlign: 'center',
                            color: theme.foregroundSecondary,
                            marginTop: 8,
                        }}
                        allowFontScaling={false}
                    >
                        {t('walletEmpty', 'No earnings yet')}
                    </Text>
                )}
                {balance !== 0 && (
                    <View
                        style={{
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.backgroundTertiaryTrans,
                            marginHorizontal: 16,
                            marginBottom: 24,
                            marginTop: 8,
                            borderRadius: 12,
                        }}
                    >
                        <Text style={{ ...TextStyles.Title1, color: theme.foregroundPrimary }} allowFontScaling={false}>
                            <Money amount={balance} />
                        </Text>
                    </View>
                )}
            </ZListGroup>
            {transactions.length > 0 && <ZListHeader text={t('transactions', 'Transactions')} />}
        </>
    );

    return (
        <>
            <SHeader title={t('wallet', 'Wallet')} />
            <SFlatList
                data={transactions}
                renderItem={({ item }) => <TransactionView item={item} />}
                keyExtractor={(item, index) => index + '-' + item.id}
                ListHeaderComponent={content}
                onEndReached={walletEngine.loadMoreTransactions}
                refreshing={walletState.historyLoading}
            />
        </>
    );
});

export const Wallet = withApp(WalletComponent);
