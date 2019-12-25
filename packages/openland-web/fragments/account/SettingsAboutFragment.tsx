import * as React from 'react';
// import { XView } from 'react-mental';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';

export const SettingsAboutFragment = React.memo(() => {
    return (
        <Page track="account_about_us">
            <UHeader title="About us" />
            Hello!
        </Page>
    );
});
