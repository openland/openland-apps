import * as React from 'react';
import { Page, Background, Content, Section, PageTitle } from '../Components/Page';
import { Header } from '../Components/Header';

export default function () {
    return (
        <Page title="Manage">
            <Header title="Manage" />
            <Background />
            <Content>
                <Section>
                    <PageTitle title="Manage" />
                    
                </Section>
            </Content>
        </Page>
    );
}