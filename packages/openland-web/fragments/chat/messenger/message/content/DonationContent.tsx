import * as React from 'react';
import { XView } from 'react-mental';
import { PurchaseState } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-web/utils/TextStyles';

interface DonationContentProps {
    amount: number;
    state: PurchaseState;
}

export const DonationContent = (props: DonationContentProps) => {
    return (
        <XView 
            flexGrow={0}
            paddingHorizontal={24} 
            paddingVertical={20}
            borderRadius={8}
            color={'var(--foregroundContrast)'} 
            backgroundColor={'var(--accentPay)'}
            alignItems="center"
            {...TextStyles.Title1}
        >
            {formatMoney(props.amount)}
            {props.state === PurchaseState.PENDING && <XView color="var(--foregroundTertiary)" {...TextStyles.Caption}>Pending</XView>}
        </XView>
    );
};
