import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { HomeIntro } from './components/home/HomeIntro';
import { HomeTasks } from './components/home/HomeTasks';
import { HomeTools } from './components/home/HomeTools';
import { HomeAccess } from './components/home/HomeAccess';
import { XTrack } from 'openland-x-analytics/XTrack';

export default class HomePage extends React.Component {
    render() {
        return (
            <Page>
                <XTrack event="root_view" />
                <XDocumentHead title="Modern Messenger for Work" titleWithoutReverse={true} />
                <HomeIntro />
                <HomeTasks />
                <HomeTools />
                <HomeAccess />
            </Page>
        );
    }
}
