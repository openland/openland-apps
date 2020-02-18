import * as React from 'react';
import { WalletTransactionFragment, PaymentStatus } from 'openland-api/spacex.types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showConfirmPayment } from '../modals/showConfirmPayment';
import { showTransaction } from '../modals/showTransaction';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { css } from 'linaria';
import FailureIcon from 'openland-icons/s/ic-failure-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { DepositAvatar } from './DepositAvatar';
import { convertTransaction } from 'openland-y-utils/wallet/transaction';

const arrowBox = css`
    position: absolute;
    top: -5px; right: 16px;
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--accentNegative);
`;

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = React.memo((props: TransactionViewProps) => {
    const converted = convertTransaction(props.item);
    const operation = props.item.operation;
    const payment = operation.payment;
    const actionRequired = payment && payment.intent && (payment.status === PaymentStatus.FAILING || payment.status === PaymentStatus.ACTION_REQUIRED);
    const color = actionRequired ? 'var(--accentNegative)' : (operation.__typename === 'WalletTransactionDeposit' ? 'var(--accentPositive)' : 'var(--foregroundPrimary)');

    return (
        <>
            <UListItem
                leftElement={!converted.avatar ? <DepositAvatar /> : undefined}
                avatar={converted.avatar}
                title={converted.title}
                description={converted.type + (operation.__typename === 'WalletTransactionSubscription' ? (', ' + converted.interval) : '')}
                useRadius={true}
                rightElement={
                    <XView marginRight={8} alignItems="flex-end">
                        <XView {...TextStyles.Label1} color={color}>{converted.amount}</XView>
                        <XView {...TextStyles.Subhead} color="var(--foregroundSecondary)">
                            {converted.dateTime.isToday ? converted.dateTime.time : converted.dateTime.date}
                            {payment && payment.status === PaymentStatus.PENDING && ', pending'}
                            {actionRequired && ', failing'}
                        </XView>
                    </XView>
                }
                onClick={() => {
                    if (actionRequired) {
                        showConfirmPayment(payment!.intent!.id, payment!.intent!.clientSecret);
                    } else {
                        showTransaction(props.item);
                    }
                }}
            />

            {actionRequired && (
                <XView paddingVertical={8} paddingLeft={72} paddingRight={16}>
                    <XView borderRadius={8} backgroundColor="var(--accentNegative)" color="var(--foregroundContrast)" flexDirection="row" position="relative">
                        <div className={arrowBox} />

                        <XView flexGrow={1} paddingVertical={8} paddingLeft={16} flexDirection="row" alignItems="center">
                            <XView marginRight={8}>
                                <UIcon icon={<FailureIcon />} color="var(--foregroundContrast)" />
                            </XView>
                            <XView {...TextStyles.Body}>
                                Couldn’t charge this amount
                            </XView>
                        </XView>

                        <XView
                            {...TextStyles.Label1}
                            paddingVertical={8}
                            paddingHorizontal={16}
                            cursor="pointer"
                            onClick={() => {
                                showConfirmPayment(payment!.intent!.id, payment!.intent!.clientSecret);
                            }}
                        >
                            Try again
                        </XView>
                    </XView>
                </XView>
            )}
        </>
    );
});