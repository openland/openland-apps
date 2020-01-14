import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showAddCard } from './components/showAddCard';

export const WalletFragment = React.memo(() => {
    let client = useClient();
    let cards = client.useMyCards();
    return (
        <Page track="settings_finance">
            <UHeader title="Finance" />
            <XView flexDirection="column">
                <XView
                    paddingHorizontal={16}
                    paddingVertical={16}
                >
                    <UButton text="Add Card" onClick={() => showAddCard()} />
                </XView>
                {cards.myCards.map((v) => (
                    <XView key={v.id}>**** **** **** {v.last4} | {v.expMonth}/{v.expYear}</XView>
                ))}
            </XView>
        </Page>
    );
});