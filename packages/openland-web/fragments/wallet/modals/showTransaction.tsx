import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextTitle2, TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import SuccessIcon from 'openland-icons/s/ic-success-16.svg';
import { DepositAvatar } from '../components/DepositAvatar';
import { convertTransaction, TransactionConvertedStatus } from 'openland-y-utils/wallet/transaction';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { cx, css } from 'linaria';

const titleBox = css`
    text-align: center;
    margin-top: 16px;
`;

const typeBox = css`
    text-align: center;
    margin-top: 8px;
    color: var(--foregroundSecondary);
`;

const statusBox = css`
    margin-left: 8px;
`;

const infoRowSecondaryLabel = css`
    color: var(--foregroundSecondary);
`;

const InfoRow = React.memo((props: { label: string; secondary?: boolean; children: any }) => (
    <XView flexDirection="row" justifyContent="space-between" paddingVertical={12} paddingLeft={props.secondary ? 16 : undefined}>
        <span className={cx(TextBody, props.secondary && infoRowSecondaryLabel)}>{props.label}</span>
        <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
            {props.children}
        </XView>
    </XView>
));

const StatusColor: { [key in TransactionConvertedStatus]: string } = {
    'pending': 'var(--foregroundSecondary)',
    'canceled': 'var(--foregroundSecondary)',
    'failing': 'var(--accentNegative)',
    'success': 'var(--accentPositive)',
};

const TransactionComponent = React.memo((props: { ctx: XModalController, transaction: WalletTransactionFragment }) => {
    const { avatar, title, type, dateTime, status, amount, walletAmount, chargeAmount, interval, paymentMethod, group } = convertTransaction(props.transaction);
    const hasSplittedAmount = !!walletAmount && !!chargeAmount;

    return (
        <XView paddingTop={12} paddingBottom={16} paddingHorizontal={24}>
            <XView alignItems="center" justifyContent="center" cursor="pointer" path={group ? '/mail/' + group.id : undefined} onClick={props.ctx.hide}>
                {avatar ? <UAvatar {...avatar} size='xx-large' /> : <DepositAvatar size="xx-large" />}

                <div className={cx(TextTitle2, titleBox)}>
                    {title}
                </div>
                <div className={cx(TextBody, typeBox)}>
                    {type}{!!interval && `, ${interval}`}{type === 'Transfer' && group ? `, ${group.title}` : ''}
                </div>
            </XView>
            <XView marginTop={16}>
                <InfoRow label="Total amount">{amount}</InfoRow>
                {hasSplittedAmount && (
                    <>
                        <InfoRow label="Your balance" secondary={true}>{walletAmount}</InfoRow>
                        <InfoRow label={paymentMethod!} secondary={true}>{chargeAmount}</InfoRow>
                    </>
                )}

                {paymentMethod && !hasSplittedAmount && <InfoRow label="Payment method">{paymentMethod}</InfoRow>}

                <InfoRow label="Date and time">{dateTime.date}, {dateTime.time}</InfoRow>
                <InfoRow label="Status">
                    <XView color={StatusColor[status]} alignItems="center" flexDirection="row">
                        {status === 'success' && <UIcon icon={<SuccessIcon />} color={StatusColor[status]} />}

                        <span className={statusBox}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    </XView>
                </InfoRow>
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