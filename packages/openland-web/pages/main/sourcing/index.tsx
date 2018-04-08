import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';
import { XLink } from '../../../components/X/XLink';
import { withSourcing } from '../../../api';
import { XTable } from '../../../components/X/XTable';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('Incoming opportunities', 'viewer', withSourcing((props) => {
    return (
        <>
            <XHead title="Incoming opportunities" />
            <AppContent>
                <XTab>
                    <XTab.Item path="/sourcing" asArrow={true}>Incoming</XTab.Item>
                    <XTab.Item path="/sourcing/zoning" asArrow={true}>Zoning Review</XTab.Item>
                    <XTab.Item path="/sourcing/unit" asArrow={true}>Unit Placement</XTab.Item>
                    <XTab.Item path="/sourcing/approved">Approved</XTab.Item>
                    <XTab.Item path="/sourcing/rejected">Rejected</XTab.Item>
                    <XTab.Item path="/sourcing/snoozed">Snoozed</XTab.Item>
                </XTab>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Incoming opportunities">
                        <XButton>Add</XButton>
                        <XButton style="dark">Start Review</XButton>
                    </XCard.Header>
                    <XCard.Loader loading={(props.data.loading || false) || props.data.alphaOpportunities.edges.length === 0}>
                        {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length !== 0 && (
                            <>
                                <XTable>
                                    <XTable.Header>
                                        <XTable.Cell>Title</XTable.Cell>
                                    </XTable.Header>
                                    <XTable.Body>
                                        {props.data.alphaOpportunities.edges.map((v) => (
                                            <XTable.Row key={v.node.id}>
                                                <XTable.Cell>
                                                    {v.node.parcel.title}
                                                </XTable.Cell>
                                            </XTable.Row>
                                        ))}
                                    </XTable.Body>
                                </XTable>
                                <XCard.Footer text={props.data.alphaOpportunities.pageInfo.itemsCount + ' items'}>
                                    {props.data.alphaOpportunities.pageInfo.currentPage > 1 && (
                                        <XButton query={{ field: 'page', value: (props.data.alphaOpportunities.pageInfo.currentPage - 1).toString() }}>Prev</XButton>
                                    )}
                                    {(props.data.alphaOpportunities.pageInfo.currentPage < props.data.alphaOpportunities.pageInfo.pagesCount - 1) && (
                                        <XButton query={{ field: 'page', value: (props.data.alphaOpportunities.pageInfo.currentPage + 1).toString() }}>Next</XButton>
                                    )}
                                </XCard.Footer>
                            </>
                        )}
                        {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length === 0 && (
                            <XCard.Empty text="You can find your first parcel at" icon="sort">
                                <Link path="/">
                                    Explore page
                                </Link>
                            </XCard.Empty>
                        )}
                    </XCard.Loader>
                </XCard>
            </AppContent>
        </>
    );
}));