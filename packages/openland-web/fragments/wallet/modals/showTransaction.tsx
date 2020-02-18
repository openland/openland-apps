import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextTitle2, TextBody } from 'openland-web/utils/TextStyles';
import SuccessIcon from 'openland-icons/s/ic-success-16.svg';
import { DepositAvatar } from '../components/DepositAvatar';
import { convertTransaction } from 'openland-y-utils/wallet/transaction';

const TransactionComponent = React.memo((props: { ctx: XModalController, transaction: WalletTransactionFragment }) => {
    const converted = convertTransaction(props.transaction);

    return (
        <XView paddingTop={20} paddingBottom={16}>
            <XView flexDirection="column" alignItems="center" justifyContent="center">
                {converted.avatar && <UAvatar {...converted.avatar} size='xx-large' />}
                {!converted.avatar && <DepositAvatar size="xx-large" />}
                <XView marginTop={16}>
                    <h2 className={TextTitle2}>{converted.title}</h2>
                </XView>
                <XView marginTop={8} color="var(--foregroundSecondary)">
                    {props.transaction.operation.__typename === 'WalletTransactionSubscription' && (
                        <span className={TextBody}>{converted.type}, {converted.interval}</span>
                    )}

                    {props.transaction.operation.__typename !== 'WalletTransactionSubscription' && (
                        <span className={TextBody}>{converted.type}</span>
                    )}
                </XView>
            </XView>
            <XView marginTop={16}>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Date and time</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            {converted.dateTime.date}, {converted.dateTime.time}
                        </span>
                    </XView>
                </XView>

                {converted.paymentMethod && (
                    <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                        <span className={TextBody}>Payment method</span>
                        <XView color="var(--foregroundSecondary)">
                            <span className={TextBody}>
                                {converted.paymentMethod}
                            </span>
                        </XView>
                    </XView>
                )}

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Total amount</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            {converted.amount}
                        </span>
                    </XView>
                </XView>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Status</span>
                    <XView color="var(--accentPositive)" alignItems="center" flexDirection="row">
                        <XView marginRight={8}>
                            <SuccessIcon />
                        </XView>
                        <span className={TextBody}>
                            Success
                        </span>
                    </XView>
                </XView>

            </XView>
        </XView>
    );
});

export function showTransaction(transaction: WalletTransactionFragment) {
    showModalBox({ title: 'Transaction', useTopCloser: true }, (ctx) => {
        return (
            <TransactionComponent ctx={ctx} transaction={transaction} />
        );
    });
} 