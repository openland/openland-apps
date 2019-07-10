import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';

export const DownloadPage = React.memo((props) => (
    <Page>
        <XDocumentHead
            title="Download"
            titleWithoutReverse={true}
        />
        <NativeAppsModal
            title="Get Openland apps"
            text="Openland is better experience as a mobile and desktop app. Install your app now."
            hideLogo={true}
        />
    </Page>
));