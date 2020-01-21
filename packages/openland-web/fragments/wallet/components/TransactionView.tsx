import * as React from 'react';
import { WalletTransactions_walletTransactions_items } from 'openland-api/Types';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextStyles, TextCaption } from 'openland-web/utils/TextStyles';
import RecentIcon from 'openland-icons/s/ic-recent-16.svg';
import { Money } from 'openland-y-utils/wallet/Money';
import { css, cx } from 'linaria';

const digits = css`
    color: var(--foregroundSecondary);
`;

const dots = css`
    color: var(--foregroundTertiary);
`;

interface TransactionViewProps {
    item: WalletTransactions_walletTransactions_items;
}

export const TransactionView = React.memo((props: TransactionViewProps) => {
    const { amount, state } = props.item;

    return (
        <UListItem
            title="Community creators"
            description="Jan 14, 2020"
            avatar={{ photo: undefined, id: '1', title: 'Community creators' }}
            useRadius={true}
            interactive={false}
            rightElement={
                <XView alignItems="flex-end" paddingRight={8}>
                    <XView {...TextStyles.Label1} flexDirection="row">
                        <Money amount={amount} />
                        {state === 'pending' && (
                            <XView marginLeft={8}>
                                <UIcon icon={<RecentIcon />} color="var(--foregroundTertiary)" />
                            </XView>
                        )}
                    </XView>
                    <div className={cx(TextCaption, digits)}>
                        <span className={dots}>••</span> 3714
                    </div>
                </XView>
            }
        />
    );
});