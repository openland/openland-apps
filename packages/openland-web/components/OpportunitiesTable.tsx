import * as React from 'react';
import { withSourcing } from '../api';
import { XCard } from './X/XCard';
import { XTable } from './X/XTable';
import { XButton } from './X/XButton';
import { XArea } from './X/XArea';
import { PriorityIndicator } from './PriorityIndicator';

export const OpportunitiesTable = withSourcing((props) => {
    let stage = '';
    if ((props as any).stage) {
        stage = '&stage=' + (props as any).stage;
    }
    let useDirect = false;
    if (props.data.variables.state === 'APPROVED') {
        useDirect = true;
    } else if (props.data.variables.state === 'REJECTED') {
        useDirect = true;
    } else if (props.data.variables.state === 'SNOOZED') {
        useDirect = true;
    }
    return (
        <XCard.Loader loading={(props.data.loading || false) && (!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0)}>
            {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length !== 0 && (
                <>
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell width={100}>City</XTable.Cell>
                            <XTable.Cell width={120}>Borough</XTable.Cell>
                            <XTable.Cell width={150}>Parcel</XTable.Cell>
                            <XTable.Cell>Address</XTable.Cell>
                            <XTable.Cell width={100} textAlign="right">Area</XTable.Cell>
                            <XTable.Cell width={100} textAlign="left">Zoning</XTable.Cell>
                            <XTable.Cell width={120}>Priority</XTable.Cell>
                        </XTable.Header>
                        <XTable.Body>
                            {props.data.alphaOpportunities.edges.map((v) => (
                                <XTable.Row key={v.node.id} path={useDirect ? '/parcels/' + v.node.parcel.id : ('/prospecting/review?initialId=' + v.node.id + stage)}>
                                    <XTable.Cell>
                                        {v.node.parcel.city.name}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.parcel.extrasBorough}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.parcel.title}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.parcel.extrasAddress}
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="right">
                                        {v.node.parcel && v.node.parcel.extrasArea != null && <XArea area={v.node.parcel.extrasArea} />}
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="left">
                                        {v.node.parcel.extrasZoning}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        <PriorityIndicator priority={v.node.priority} />
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
            {(!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0) && (
                <>
                    {props.children}
                </>
            )}
        </XCard.Loader>
    );
}) as React.ComponentType<{ variables?: any, stage?: 'unit' | 'zoning' }>;