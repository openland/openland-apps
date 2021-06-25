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
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useConvertedTransaction } from 'openland-web/utils/useConvertedTransaction';
import { useSupportRoom } from 'openland-web/utils/useSupportRoom';

const arrowBox = css`
    position: absolute;
    top: -5px;
    right: 16px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--accentNegative);
`;

const tryAgainButton = css`
    background-color: #fff;
    color: var(--accentNegative);

    &:hover,
    :focus {
        background-color: #f2f3f5;
    }
`;

const contactUs = css`
    color: var(--accentPrimary);
    cursor: pointer;
    margin-left: 8px;

    &:hover {
        color: var(--accentPrimaryHover);
    }
`;

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = React.memo((props: TransactionViewProps) => {
    const {
        avatar,
        title,
        type,
        dateTime,
        status,
        amount,
        interval,
        source,
        group,
    } = useConvertedTransaction(props.item);
    const navigateToSupport = useSupportRoom();
    const payment = source.operation.payment;
    const actionRequired = status === 'failing';
    const color =
        actionRequired || status === 'canceled'
            ? 'var(--accentNegative)'
            : source.operation.amount > 0
                ? 'var(--accentPositive)'
                : 'var(--foregroundPrimary)';
    const donationDescription = group ? `, ${group.title}` : '';
    return (
        <>
            <UListItem
                leftElement={!avatar ? <DepositAvatar /> : undefined}
                avatar={avatar}
                title={title}
                description={type + (!!interval ? `, ${interval}` : '') + donationDescription}
                useRadius={true}
                rightElement={
                    <XView marginRight={8} alignItems="flex-end">
                        <XView {...TextStyles.Label1} color={color}>
                            {amount}
                        </XView>
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
                <XView paddingVertical={8} paddingLeft={72} paddingRight={16}>
                    <XView
                        paddingVertical={12}
                        paddingLeft={16}
                        paddingRight={12}
                        borderRadius={8}
                        backgroundColor="var(--accentNegative)"
                        color="var(--foregroundContrast)"
                        flexDirection="row"
                        alignItems="center"
                        position="relative"
                        cursor="pointer"
                        onClick={() => {
                            showConfirmPayment(payment!.intent!.id, payment!.intent!.clientSecret);
                        }}
                    >
                        <div className={arrowBox} />

                        <XView flexGrow={1} flexDirection="row" alignItems="center">
                            <XView marginRight={8}>
                                <UIcon icon={<FailureIcon />} color="var(--foregroundContrast)" />
                            </XView>
                            <XView {...TextStyles.Body}>Transaction failed</XView>
                        </XView>

                        <UButton text="Try again" className={tryAgainButton} height={32} />
                    </XView>
                    <XView flexDirection="row" marginTop={8} color="var(--foregroundPrimary)">
                        Need help?
                        <span className={contactUs} onClick={navigateToSupport}>
                            Contact us
                        </span>
                    </XView>
                </XView>
            )}
        </>
    );
});
