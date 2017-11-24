import * as React from 'react';
// import { Spreadsheet } from '../Components/Spreadsheet';
import { Page, Background, Content, Section, PageTitle } from '../Components/Page';
import { Header } from '../Components/Header';
import { withPermitsQuery } from '../../api/Permits';
import { withLoader } from '../Components/withLoader';

let PermitsList = withPermitsQuery(withLoader((props) => {
    console.warn(props.data!!.permits);
    return (
        <div>
            {props.data!!.permits.edges.map((p) => {
                return (<div key={p.node.id}>
                    {p.node.id}
                </div>);
            })}
            <a onClick={(e) => { e.preventDefault(); props.data!!.loadMoreEntries(); }}>Load More...</a>
        </div>
    );
}));

export default function () {
    return (
        <Page title="Manage">
            <Header title="Manage" />
            <Background />
            <Content>
                <Section>
                    <PageTitle title="Manage" />
                    <PermitsList />
                </Section>
            </Content>
        </Page>
    );
}