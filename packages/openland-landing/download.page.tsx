import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { DownloadAppsComponent } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';

export const DownloadPage = React.memo(() => (
    <Page>
        <XDocumentHead
            title="Download"
            titleWithoutReverse={true}
        />
        <DownloadAppsComponent
            title="Get Openland apps"
            text="Openland is better experience as a mobile and desktop app. Install your app now."
            hideLogo={true}
        />
    </Page>
));