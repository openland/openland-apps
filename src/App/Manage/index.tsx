import * as React from 'react';
import { Spreadsheet } from '../Components/Spreadsheet';
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
                    <Spreadsheet />
                </Section>
            </Content>
        </Page>
    );
}