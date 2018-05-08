import * as React from 'react';
import { withSourcing, withSourcingAll } from '../api';
import { XWithRole } from './X/XWithRole';
import { ParcelNumber } from './ParcelNumber';
import ATypes from 'openland-api';
import { withRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XArea } from 'openland-x-format/XArea';
import { XDate } from 'openland-x-format/XDate';
import { XTable } from 'openland-x/XTable';
import { XFooter } from 'openland-x/XFooter';
import { XModalRouted } from 'openland-x-modal/XModalRouted';
import { XLoader } from 'openland-x/XLoader';

// import { OpportunityState } from 'openland-api/Types';
// import { OpportunitiesTable as _OpportunitiesTable } from './OpportunitiesTableUrbynReport';

export const ExportModal = withSourcingAll(withRouter((props) => {
    const exportCVS = () => {
        let wrap = (data: any) => {
            return '"' + (data !== null && data !== undefined ? data : '') + '"';
        };

        let parcelNumberFormat = (parcel: {
            id: {
                borough: string | null,
                boroughId: string | null,
                block: string | null,
                blockPadded: string | null,
                lot: string | null,
                lotPadded: string | null,
                title: string,
            },
            compact?: boolean,
            city?: string
        }) => {
            if (parcel.id.borough && parcel.id.block && parcel.id.lot) {
                return (parcel.city ? parcel.city : '') + parcel.id.boroughId + '-' + (parcel.id.blockPadded || parcel.id.block + '-' + parcel.id.lotPadded || parcel.id.lot);
            } else if (parcel.id.block && parcel.id.lot) {
                return (parcel.city ? parcel.city + ' | ' : '') + (parcel.id.blockPadded || parcel.id.block) + ' - ' + (parcel.id.lotPadded || parcel.id.lot);
            } else {
                return (parcel.city ? parcel.city + ' | ' : '') + parcel.id.title;
            }
        };

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Borough,';
        csvContent += 'Parcel,';
        csvContent += 'Address,';
        csvContent += 'Area,';
        csvContent += 'Zoning,';
        csvContent += 'Units,';
        csvContent += 'Owner,';
        // csvContent += 'Date';
        csvContent += '\r\n';
        for (let row of props.data.alphaAllOpportunities!!) {
            csvContent += wrap(row.parcel.extrasBorough) + ',';
            csvContent += wrap(parcelNumberFormat({ id: row.parcel.number })) + ',';
            csvContent += wrap(row.parcel.address) + ',';
            csvContent += wrap(row.parcel.area ? Math.round(row.parcel.area.value * 10.7639) : '') + ',';
            csvContent += wrap(row.parcel.extrasZoning) + ',';
            csvContent += wrap(row.parcel.extrasUnitCapacity) + ',';
            csvContent += wrap(row.parcel.extrasOwnerName) + ',';
            // csvContent += wrap(row.updatedAt);
            csvContent += '\r\n';
        }

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', props.data.variables.state + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <XLoader loading={(props.data.loading || false)}>
            <XButton style="primary" onClick={exportCVS} text={'Download' + props.data.variables + '.csv'} />
        </XLoader>

    );
})) as React.ComponentType<{ variables?: ATypes.SourcingAllQueryVariables, stage?: 'unit' | 'zoning' | 'approved' | 'rejected' | 'snoozed' }>;

// function buildQuery(clauses: any[]): any | null {
//     if (clauses.length === 0) {
//         return null;
//     } else if (clauses.length === 1) {
//         return clauses[0];
//     } else {
//         return {
//             '$and': clauses
//         };
//     }
// }

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

    const exportCVS = () => {
        let wrap = (data: any) => {
            return '"' + (data !== null && data !== undefined ? data : '') + '"';
        };

        let parcelNumberFormat = (parcel: {
            id: {
                borough: string | null,
                boroughId: string | null,
                block: string | null,
                blockPadded: string | null,
                lot: string | null,
                lotPadded: string | null,
                title: string,
            },
            compact?: boolean,
            city?: string
        }) => {
            if (parcel.id.borough && parcel.id.block && parcel.id.lot) {
                return (parcel.city ? parcel.city : '') + parcel.id.boroughId + '-' + (parcel.id.blockPadded || parcel.id.block + '-' + parcel.id.lotPadded || parcel.id.lot);
            } else if (parcel.id.block && parcel.id.lot) {
                return (parcel.city ? parcel.city + ' | ' : '') + (parcel.id.blockPadded || parcel.id.block) + ' - ' + (parcel.id.lotPadded || parcel.id.lot);
            } else {
                return (parcel.city ? parcel.city + ' | ' : '') + parcel.id.title;
            }
        };

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Borough,';
        csvContent += 'Parcel,';
        csvContent += 'Address,';
        csvContent += 'Area,';
        csvContent += 'Zoning,';
        csvContent += 'Units,';
        csvContent += 'Owner,';
        // csvContent += 'Date';
        csvContent += '\r\n';
        for (let row of props.data.alphaOpportunities.edges) {
            csvContent += wrap(row.node.parcel.extrasBorough) + ',';
            csvContent += wrap(parcelNumberFormat({ id: row.node.parcel.number })) + ',';
            csvContent += wrap(row.node.parcel.address) + ',';
            csvContent += wrap(row.node.parcel.area ? Math.round(row.node.parcel.area.value * 10.7639) : '') + ',';
            csvContent += wrap(row.node.parcel.extrasZoning) + ',';
            csvContent += wrap(row.node.parcel.extrasUnitCapacity) + ',';
            csvContent += wrap(row.node.parcel.extrasOwnerName) + ',';
            // csvContent += wrap(row.updatedAt);
            csvContent += '\r\n';
        }

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', props.data.variables.state + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // let clauses1: any[] = [];
    // clauses1.push({ isPublic: true });
    // let qPublic = buildQuery(clauses1);

    // let clauses2: any[] = [];
    // clauses2.push({ '$and': [{ isPublic: true }, { '$or': [{ ownerName: 'HPD NYC' }, { ownerName: 'hpd' }, { ownerName: 'Housing Preservation' }] }] });
    // let qHpd = buildQuery(clauses2);

    return (
        <XLoader loading={(props.data.loading || false) && (!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0)}>
            <XModalRouted title="Export to CVS" query="export">
                <ExportModal
                    variables={(props as any).variables}
                    // variables={{ state: OpportunityState.APPROVED_INITIAL, query: JSON.stringify(qPublic), page: props.router.query.page_hpd ? props.router.query.page_hpd : undefined, first: 10 }}
                    stage="unit" />
                {/* <_OpportunitiesTable
                    variables={(props as any).variables}
                    // variables={{ state: OpportunityState.APPROVED_INITIAL, query: JSON.stringify(qPublic) }}
                    stage="unit"
                    type="hpd"
                    title="HPD Mini-Home Opportunity Sites"
                >
                    <XCard.Empty text="There are no parcels for review" icon="sort" />
                </_OpportunitiesTable> */}
            </XModalRouted>

            {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length !== 0 && (
                <>
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell width={120}>Borough</XTable.Cell>
                            <XTable.Cell width={150}>Parcel</XTable.Cell>
                            <XTable.Cell>Address</XTable.Cell>
                            <XTable.Cell
                                width={100}
                                textAlign="right"
                                orderBy={sVal === 'AREA_DESC' ? 'DESC' : sVal === 'AREA_ASC' ? 'ASC' : 'NO_SORT'}
                                query={{ field: 'sort', value: (sVal === 'AREA_DESC' ? 'AREA_ASC' : 'AREA_DESC') }}
                            >
                                Area
                            </XTable.Cell>
                            <XTable.Cell width={140} textAlign="right">Zoning</XTable.Cell>
                            <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
                                <XTable.Cell
                                    width={90}
                                    textAlign="right"
                                    orderBy={sVal === 'CAPACITY_DESC' ? 'DESC' : sVal === 'CAPACITY_ASC' ? 'ASC' : 'NO_SORT'}
                                    query={{ field: 'sort', value: (sVal === 'CAPACITY_DESC' ? 'CAPACITY_ASC' : 'CAPACITY_DESC') }}
                                >
                                    Units
                                </XTable.Cell>
                            </XWithRole>
                            <XTable.Cell
                                width={140}
                                textAlign="right"
                                orderBy={sVal === 'DATE_ADDED_ASC' ? 'ASC' : sVal === undefined ? 'DESC' : 'NO_SORT'}
                                query={{ field: 'sort', value: (sVal === 'DATE_ADDED_ASC' ? undefined : 'DATE_ADDED_ASC') }}
                            >
                                Date
                            </XTable.Cell>
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
                                        {v.node.parcel && v.node.parcel.area && <XArea value={v.node.parcel.area.value} />}
                                    </XTable.Cell>
                                    <XTable.Cell textAlign="right">
                                        {v.node.parcel.extrasZoning}
                                    </XTable.Cell>
                                    <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
                                        <XTable.Cell textAlign="right">
                                            {Boolean(v.node.parcel.area && v.node.parcel.extrasUnitCapacityDencity && v.node.parcel.extrasUnitCapacityFar) ? v.node.parcel.extrasUnitCapacity : ''}
                                        </XTable.Cell>
                                    </XWithRole>
                                    <XTable.Cell textAlign="right">
                                        <XDate format="humanize" value={v.node.updatedAt} />
                                    </XTable.Cell>
                                </XTable.Row>
                            ))}
                        </XTable.Body>
                    </XTable>
                    <XFooter text={props.data.alphaOpportunities.pageInfo.itemsCount + ' items'}>
                        {props.data.alphaOpportunities.pageInfo.currentPage > 1 && (
                            <XButton query={{ field: 'page', value: (props.data.alphaOpportunities.pageInfo.currentPage - 1).toString() }} text="Prev"/>
                        )}
                        {(props.data.alphaOpportunities.pageInfo.currentPage < props.data.alphaOpportunities.pageInfo.pagesCount - 1) && (
                            <XButton query={{ field: 'page', value: (props.data.alphaOpportunities.pageInfo.currentPage + 1).toString() }} text="Next"/>
                        )}
                        <XWithRole role={['super-admin', 'software-developer', 'feature-customer-kassita']}>
                            {/* <XButton query={{ field: 'export', value: 'true' }} style="dark">Export</XButton> */}
                            <XButton onClick={exportCVS} style="primary" text="Export page"/>
                        </XWithRole>

                    </XFooter>
                </>
            )}
            {(!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0) && (
                <>
                    {props.children}
                </>
            )}
        </XLoader>
    );
})) as React.ComponentType<{ variables?: ATypes.SourcingQueryVariables, stage?: 'unit' | 'zoning' | 'approved' | 'rejected' | 'snoozed' }>;