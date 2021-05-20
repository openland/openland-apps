import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView, XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { showAddCard } from './modals/showAddCard';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { CardView } from './components/CardView';
import { TransactionView } from './components/TransactionView';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { css, cx } from 'linaria';
import { showWithdrawFunds } from './components/WithdrawFunds';
import AddIcon from 'openland-icons/s/ic-plus-glyph-24.svg';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const balanceWrapper = css`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    margin: 16px 16px 0;
    height: 80px;
    border-radius: 8px;
`;

const balanceWrapperFilled = css`
    background: linear-gradient(
        180deg,
        var(--backgroundTertiaryTrans) 0%,
        var(--backgroundTertiary) 100%
    );
`;

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    const messenger = React.useContext(MessengerContext);
    const walletEngine = messenger.wallet;
    const walletState = walletEngine.state.useState();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const balance = walletState.balance;
    const transactions = [...walletState.pendingTransactions, ...walletState.historyTransactions];

    return (
        <UFlatList
            track="settings_wallet"
            loadMore={walletEngine.loadMoreTransactions}
            items={transactions}
            loading={walletState.historyLoading}
            title="Wallet"
            padded={false}
            renderItem={(transaction) => (
                <TransactionView key={transaction.id} item={transaction} />
            )}
        >
            <UHeader title="Wallet" />
            <UListGroup
                header="Payment methods"
                action={
                    cards.length > 0
                        ? { title: 'Add card', onClick: () => showAddCard() }
                        : undefined
                }
            >
                {cards.length === 0 && (
                    <UListItem
                        title="Add card"
                        label={true}
                        leftElement={
                            <XView
                                width={40}
                                height={28}
                                borderRadius={4}
                                backgroundColor="var(--backgroundTertiaryTrans)"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <UIcon
                                    icon={<AddIcon />}
                                    color="var(--foregroundSecondary)"
                                    size={18}
                                />
                            </XView>
                        }
                        useRadius={true}
                        onClick={() => showAddCard()}
                    />
                )}
                {cards.map((card) => (
                    <CardView item={card} key={card.id} />
                ))}
                <XView flexDirection="row" paddingHorizontal={16} marginTop={16}>
                    <UButton
                        text="Payments FAQ"
                        size="large"
                        flexGrow={1}
                        marginRight={16}
                        style="secondary"
                        onClick={() =>
                            window.open(
                                'https://www.notion.so/openland/FAQ-d5314c72f67948d49437d021fb221405',
                                '_blank',
                            )
                        }
                    />
                    <UButton
                        text="Payments help"
                        size="large"
                        flexGrow={1}
                        style="secondary"
                        onClick={() => router.navigate('/zoebp1bZA0F5P5oL5ZgrFwEMA4')}
                    />
                </XView>
            </UListGroup>
            <UListGroup
                header="Your balance"
                action={
                    balance !== 0
                        ? { title: 'Withdraw', onClick: () => showWithdrawFunds(router) }
                        : undefined
                }
            >
                {balance === 0 && <div className={cx('x', balanceWrapper)}>No earnings yet</div>}
                {balance !== 0 && (
                    <div className={cx('x', balanceWrapper, balanceWrapperFilled)}>
                        <XView flexDirection="column">
                            <XView {...TextStyles.Title1} color="var(--foregroundPrimary)">
                                <Money amount={balance} />
                            </XView>
                        </XView>
                    </div>
                )}
            </UListGroup>
            {transactions.length > 0 && <UListHeader text="Transactions" />}
        </UFlatList>
    );
});
