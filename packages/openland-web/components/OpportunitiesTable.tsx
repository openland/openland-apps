import * as React from 'react';
import { withSourcing } from '../api';
import { XCard } from './X/XCard';
import { XTable } from './X/XTable';
import { XButton } from './X/XButton';
import { XArea } from './X/XArea';

export const OpportunitiesTable = withSourcing((props) => {
    return (
        <XCard.Loader loading={(props.data.loading || false) || props.data.alphaOpportunities.edges.length === 0}>
            {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length !== 0 && (
                <>
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell>Parcel</XTable.Cell>
                            <XTable.Cell width={200}>Location</XTable.Cell>
                            <XTable.Cell textAlign="right">Area</XTable.Cell>
                            <XTable.Cell>Priority</XTable.Cell>
                        </XTable.Header>
                        <XTable.Body>
                            {props.data.alphaOpportunities.edges.map((v) => (
                                <XTable.Row key={v.node.id}>
                                    <XTable.Cell>
                                        {v.node.parcel.title}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.parcel.extrasAddress}
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="right">
                                            {v.node.parcel && v.node.parcel.extrasArea != null && <XArea area={v.node.parcel.extrasArea} />}
                                        </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.priority}
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
                <>
                    {props.children}
                </>
            )}
        </XCard.Loader>
    );
});