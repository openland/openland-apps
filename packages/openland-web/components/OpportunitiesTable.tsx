import * as React from 'react';
import { withSourcing } from '../api';
import { XCard } from './X/XCard';
import { XTable } from './X/XTable';
import { XButton } from './X/XButton';
import { XArea } from './X/XArea';
import { PriorityIndicator } from './PriorityIndicator';
import { ParcelNumber } from './ParcelNumber';
import { XDate } from './X/XDate';
import ATypes from 'openland-api';
import { withRouter } from './withRouter';

export const OpportunitiesTable = withSourcing(withRouter((props) => {
    let stage = '';
    if ((props as any).stage) {
        stage = '&stage=' + (props as any).stage;
    }
    if (props.router.query.pipeline) {
        stage = stage + '&pipeline=' + props.router.query.pipeline;
    }
//     let useDirect = false;
//     if (props.data.variables.state === 'APPROVED') {
//         useDirect = true;
//     } else if (props.data.variables.state === 'REJECTED') {
//         useDirect = true;
//     } else if (props.data.variables.state === 'SNOOZED') {
//         useDirect = true;
//     }
// =======
    let useDirect = false; 
    
    let sVal = props.router.query.sort;
    let sort = props.router.query.sort ? '&sort=' + props.router.query.sort : '';
    return (
        <XCard.Loader loading={(props.data.loading || false) && (!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0)}>
            {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length !== 0 && (
                <>
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell width={120}>Borough</XTable.Cell>
                            <XTable.Cell width={150}>Parcel</XTable.Cell>
                            <XTable.Cell>Address</XTable.Cell>
                            <XTable.Cell width={100} textAlign="right"
                                orderBy={sVal === 'AREA_DESC' ? 'DESC' : sVal === 'AREA_ASC' ? 'ASC' : 'NO_SORT'}
                                query={{ field: 'sort', value: (sVal === 'AREA_DESC' ? 'AREA_ASC' : sVal === 'AREA_ASC' ? undefined : 'AREA_DESC') }}
                            >
                                Area
                            </XTable.Cell>
                            <XTable.Cell width={90} textAlign="left">Zoning</XTable.Cell>
                            <XTable.Cell width={120} textAlign="right">Priority</XTable.Cell>
                            <XTable.Cell width={140} textAlign="right">{}</XTable.Cell>
                        </XTable.Header>
                        <XTable.Body>
                            {props.data.alphaOpportunities.edges.map((v) => (
                                <XTable.Row key={v.node.id} path={useDirect ? '/parcels/' + v.node.parcel.id : ('/prospecting/review?initialId=' + v.node.id + stage + sort)}>
                                    <XTable.Cell>
                                        {v.node.parcel.extrasBorough}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        <ParcelNumber compact={true} id={v.node.parcel.number} />
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.parcel.address}
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="right">
                                        {v.node.parcel && v.node.parcel.area && <XArea area={v.node.parcel.area.value} />}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {v.node.parcel.extrasZoning}
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="right">
                                        <PriorityIndicator priority={v.node.priority} />
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="right">
                                        <XDate format="humanize" date={v.node.updatedAt} />
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
})) as React.ComponentType<{ variables?: ATypes.SourcingQueryVariables, stage?: 'unit' | 'zoning'| 'approved'| 'rejected' | 'snoozed' }>;