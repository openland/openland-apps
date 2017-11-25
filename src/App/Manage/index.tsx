import * as React from 'react';
import { Page, Background, Content, Section, PageTitle } from '../Components/Page';
import { Header } from '../Components/Header';
import { withPermitsQuery } from '../../api/Permits';

let PermitsList = withPermitsQuery((props) => {
    if (!props.data!!.items) {
        return (<div />);
    }
    return (
        <div>
            <table>
                <tr>
                    <th>Permit Id</th>
                    <th>Issued</th>
                </tr>
                {props.data!!.items.edges.map((p) => {
                    return (<tr key={p.node.id}>
                        <td>{p.node.id}</td>
                        <td>{p.node.issuedAt}</td>
                    </tr>);
                })}
            </table>
            {props.data!!.items.pageInfo.hasNextPage &&
                (<a onClick={(e) => { e.preventDefault(); props.data!!.loadMoreEntries(); }}>Load More...</a>)}
        </div>
    );
});

class PermitsListComponent extends React.Component<{}, { filter: string }> {
    constructor() {
        super();
        this.state = { filter: '' };
    }
    render() {
        return (
            <div>
                <input value={this.state.filter} onChange={(v) => this.setState({ filter: v.target.value })} />
                <PermitsList filter={this.state.filter + '%'} />
            </div>
        );
    }
}

export default function () {
    return (
        <Page title="Manage">
            <Header title="Manage" />
            <Background />
            <Content>
                <Section>
                    <PageTitle title="Manage" />
                    <PermitsListComponent />
                </Section>
            </Content>
        </Page>
    );
}