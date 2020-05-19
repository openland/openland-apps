import * as React from 'react';
import { css, cx } from 'linaria';
import { PurchaseState } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { TextTitle1, TextCaption } from 'openland-web/utils/TextStyles';

const donationContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 20px 24px;
    border-radius: 8px;
    color: var(--foregroundContrast);
    background-color: var(--accentPay);
`;

const pendingContent = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    color: var(--foregroundTertiary);
`;

interface DonationContentProps {
    amount: number;
    state: PurchaseState;
}

export const DonationContent = React.memo((props: DonationContentProps) => {
    return (
        <div className={cx(donationContainer, TextTitle1)}>
            {formatMoney(props.amount)}
            {props.state === PurchaseState.PENDING && (
                <div className={cx(pendingContent, TextCaption)}>
                    Pending
                </div>
            )}
        </div>
    );
});
