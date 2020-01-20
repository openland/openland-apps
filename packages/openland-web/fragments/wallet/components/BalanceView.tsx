import * as React from 'react';
import { XView } from 'react-mental';
import { Money } from 'openland-web/components/Money';
import { showAddFunds } from './showAddFunds';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextStyles } from 'openland-web/utils/TextStyles';

interface BallanceViewProps {
    value: number;
}

export const BallanceView = React.memo((props: BallanceViewProps) => {
    const { value } = props;

    return (
        <XView flexDirection="row">
            <XView flexGrow={1}>
                <XView {...TextStyles.Title3} marginBottom={4}>
                    Total balance
                </XView>
                <XView {...TextStyles.Title1} color={value === 0 ? 'var(--foregroundTertiary)' : 'var(--accentPrimary)'}>
                    <Money amount={value} />
                </XView>
            </XView>
            <XView flexDirection="row" alignItems="center">
                <UButton text="Add funds" onClick={() => showAddFunds()} />
            </XView>
        </XView>
    );
});