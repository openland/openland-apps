import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { HomeApps } from './home/HomeApps';
import { Page } from './components/Page';
import { HomeIntro } from './home/HomeIntro';
import { HomeIdeas } from './home/HomeIdeas';
import { HomeScreenshots } from './home/HomeScreenshots';
import { HomeCreators } from './home/HomeCreators';

export const HomePage = React.memo(() => (
    <Page transparentHeader={true}>
        <XDocumentHead
            title="Inspiring chat communities"
            titleWithoutReverse={true}
            description="Discover and join communities for your industry, role, skills, interests, and location."
            imgUrl="https://cdn.openland.com/shared/og/og-find.png"
        />

        <HomeIntro />
        <HomeIdeas />
        <HomeScreenshots />
        <HomeCreators />

        <HomeApps />
    </Page>
));
