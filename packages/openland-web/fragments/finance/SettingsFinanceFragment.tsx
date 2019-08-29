import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { StripeCardComponent } from './components/StripeCardComponent';

export const SettingsFinanceFragment = React.memo(() => {
    return (
        <Page>
            <UHeader title="Finance" />
            <XView flexDirection="column">
                <XView paddingHorizontal={16}>
                    <StripeCardComponent />
                </XView>
            </XView>
        </Page>
    );
});