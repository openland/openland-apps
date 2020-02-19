import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
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
    const { avatar, title, type, dateTime, status, amount, interval, source } = convertTransaction(props.item);
    const payment = source.operation.payment;
    const actionRequired = status === 'failing';
    const color = (actionRequired || status === 'canceled') ? 'var(--accentNegative)' : (source.operation.amount > 0 ? 'var(--accentPositive)' : 'var(--foregroundPrimary)');

    return (
        <>
            <UListItem
                leftElement={!avatar ? <DepositAvatar /> : undefined}
                avatar={avatar}
                title={title}
                description={type + (!!interval ? `, ${interval}` : '')}
                useRadius={true}
                rightElement={
                    <XView marginRight={8} alignItems="flex-end">
                        <XView {...TextStyles.Label1} color={color}>{amount}</XView>
                        <XView {...TextStyles.Subhead} color="var(--foregroundSecondary)">
                            {dateTime.isToday ? dateTime.time : dateTime.date}
                            {status !== 'success' && `, ${status}`}
                        </XView>
                    </XView>
                }
                onClick={() => {
                    if (actionRequired && payment && payment.intent) {
                        showConfirmPayment(payment.intent.id, payment.intent.clientSecret);
                    } else {
                        showTransaction(source);
                    }
                }}
            />

            {actionRequired && (
                <XView paddingVertical={8} paddingLeft={72} paddingRight={16} >
                    <XView
                        borderRadius={8}
                        backgroundColor="var(--accentNegative)"
                        color="var(--foregroundContrast)"
                        flexDirection="row"
                        position="relative"
                        cursor="pointer"
                        onClick={() => {
                            showConfirmPayment(payment!.intent!.id, payment!.intent!.clientSecret);
                        }}
                    >
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
                        >
                            Try again
                        </XView>
                    </XView>
                </XView>
            )}
        </>
    );
});