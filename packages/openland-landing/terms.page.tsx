import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

export default class TermsPage extends React.Component {
    render() {
        return (
            <Page>
                <XDocumentHead title="Terms" />
                Terms
            </Page>
        );
    }
}
