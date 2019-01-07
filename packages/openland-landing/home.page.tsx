import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

export default class HomePage extends React.Component {
    render() {
        return (
            <Page>
                <XDocumentHead title="Modern Messenger for Work" titleWithoutReverse={true} />
                Home
            </Page>
        );
    }
}
