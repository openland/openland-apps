import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Container } from './components/Container';

export default class PrivacyPage extends React.Component {
    render() {
        return (
            <Page withBorder={true}>
                <XDocumentHead title="Privacy" />
                <Container>Privacy</Container>
            </Page>
        );
    }
}
