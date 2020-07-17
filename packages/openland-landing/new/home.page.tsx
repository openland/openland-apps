import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { HomeApps } from './home/HomeApps';
import { Page } from './components/Page';
import { HomeIntro } from './home/HomeIntro';
import { HomeWhy } from './home/HomeWhy';
import { HomeExceptional } from './home/HomeExceptional';
import { HomeHelp } from './home/HomeHelp';

export const HomePage = React.memo(() => (
    <Page transparentHeader={true}>
        <XDocumentHead
            title="Inspiring chat communities"
            titleWithoutReverse={true}
            description="Discover and join communities for your industry, role, skills, interests, and location."
            imgUrl="https://cdn.openland.com/shared/og/og-global-2.png"
        />

        <HomeIntro />
        <HomeWhy />
        <HomeExceptional />
        <HomeHelp />
        <HomeApps />
    </Page>
));
