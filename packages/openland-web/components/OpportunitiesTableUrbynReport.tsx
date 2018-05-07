import * as React from 'react';
import Glamorous from 'glamorous';
import { withSourcingAll } from '../api';
import { XCard } from './X/XCard';
import { XHeader } from './X/XHeader';
import { XModalRouted } from './X/XModalRouted';
import { XWithRole } from './X/XWithRole';
import { ParcelNumber } from './ParcelNumber';
import ATypes from 'openland-api';
import { withRouter } from 'openland-x-routing/withRouter';
import { XArea } from 'openland-x-format/XArea';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';

const SwitchButton = Glamorous(XButton)({
    boxShadow: 'none',
    border: 'none',
    background: 'tranparent',
    backgroundColor: 'tranparent',
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: 0.1,
    color: '#79a9c7',
    textDecoration: 'underline',
    padding: '0 !important',
    '&:focus, &:hover': {
        outline: 'none',
        boxShadow: 'none',
        color: '#79a9c7'
    }
});

const DownloadButton = Glamorous(XButton)({
    boxShadow: 'none',
    border: '1px solid rgba(229, 233, 242, 0.7)',
    color: '#79a9c7',
    backgroundColor: '#fff',
    padding: '6px 10px',
    '&:focus, &:hover': {
        outline: 'none',
        boxShadow: 'none',
        color: '#79a9c7'
    },
    '&:hover': {
        backgroundColor: '#eceff5'
    }
});

export const ExportModal = withSourcingAll((props) => {
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
        <XCard.Loader loading={(props.data.loading || false)}>
            <XButton style="primary" onClick={exportCVS} text={'Download' + props.data.variables + '.csv'} />
        </XCard.Loader>

    );
});

const CollapseBtn = Glamorous(SwitchButton)<{ collapse: boolean }>((props) => ({
    position: 'absolute',
    width: 200,
    bottom: props.collapse ? 10 : 15,
    left: 'calc(50% - 100px)',
    transition: 'all .2s',
    zIndex: 2
}));

const CollapsingTableWrapper = Glamorous.div<{ collapse: boolean }>((props) => ({
    position: 'relative',
    paddingBottom: props.collapse ? 46 : 0,
    transition: 'all .2s'
}));

const CollapsWrapper = Glamorous.div<{ collapse: boolean }>((props) => ({
    overflow: 'hidden',
    maxHeight: props.collapse ? 241 : undefined,
    transition: 'all .2s'
}));

const CollapseGradient = Glamorous.div<{ collapse: boolean }>((props) => ({
    position: 'absolute',
    left: 0,
    bottom: props.collapse ? 46 : 0,
    width: '100%',
    height: props.collapse ? 47 : 0,
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff)',
    zIndex: 1,
    visibility: props.collapse ? 'visible' : 'hidden',
    transition: 'all .2s'
}));

const ColapseFooterWrap = Glamorous.div({
    position: 'absolute',
    marginTop: -6
});

class CollapsingTable extends React.Component<{ children: any, count: number }, { collapse: boolean, btnText: string }> {
    constructor(props: { children: any, count: number }) {
        super(props);

        this.state = {
            collapse: true,
            btnText: 'Show full table'
        };
    }

    collapseHandler() {
        this.setState({
            collapse: !this.state.collapse,
            btnText: (!this.state.collapse === true) ? 'Show full table' : 'Minimize table'
        });
    }

    render() {
        return (
            <CollapsingTableWrapper collapse={this.state.collapse}>
                <CollapseGradient collapse={this.state.collapse} />
                <CollapsWrapper collapse={this.state.collapse}>
                    {this.props.children}
                </CollapsWrapper>
                {this.state.collapse && <ColapseFooterWrap>
                    <XCard.Footer text={this.props.count + ' items'} />
                </ColapseFooterWrap>}
                <CollapseBtn onClick={() => this.collapseHandler()} collapse={this.state.collapse}>{this.state.btnText}</CollapseBtn>
            </CollapsingTableWrapper>
        );
    }
}

let TableHeader = () => (
    <XTable.Header>
        <XTable.Cell>Borough</XTable.Cell>
        <XTable.Cell>Parcel</XTable.Cell>
        <XTable.Cell>Address</XTable.Cell>
        <XTable.Cell>Area</XTable.Cell>
        <XTable.Cell>Zoning</XTable.Cell>
        <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
            <XTable.Cell width={60}>Units</XTable.Cell>
        </XWithRole>
    </XTable.Header>
);

const TableRows = (v: any) => (
    <>
        <XTable.Cell>
            {v.parcel.extrasBorough}
        </XTable.Cell>
        <XTable.Cell>
            <ParcelNumber compact={true} id={v.parcel.number} />
        </XTable.Cell>
        <XTable.Cell>
            {v.parcel.address}
        </XTable.Cell>
        <XTable.Cell>
            {v.parcel && v.parcel.area && <XArea value={v.parcel.area.value} />}
        </XTable.Cell>
        <XTable.Cell>
            {v.parcel.extrasZoning}
        </XTable.Cell>
        <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
            <XTable.Cell>
                {Boolean(v.parcel.area && v.parcel.extrasUnitCapacityDencity && v.parcel.extrasUnitCapacityFar) ? v.parcel.extrasUnitCapacity : ''}
            </XTable.Cell>
        </XWithRole>
    </>
);

export const OpportunitiesTable = withSourcingAll(withRouter((props) => {
    let stage = '';

    if ((props as any).stage) {
        stage = '&stage=' + (props as any).stage;
    }
    if (props.router.query.pipeline) {
        stage = stage + '&pipeline=' + props.router.query.pipeline;
    }

    let useDirect = false;

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
        if (!props.data.alphaAllOpportunities) {
            return;
        }
        for (let row of props.data.alphaAllOpportunities) {
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
        link.setAttribute('download', (props as any).title + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <XCard.Loader loading={(props.data.loading || false) && (!props.data.alphaAllOpportunities || props.data.alphaAllOpportunities.length === 0)}>
            <XModalRouted title="Export to CVS" query="export">
                <ExportModal />
            </XModalRouted>

            {props.data.alphaAllOpportunities && props.data.alphaAllOpportunities.length !== 0 && (
                <>
                    <XHeader text={(props as any).title} separated={true}>
                        <XWithRole role={['super-admin', 'software-developer', 'feature-customer-kassita']}>
                            <DownloadButton onClick={exportCVS} style="primary" icon="download" text="Export list" />
                        </XWithRole>
                    </XHeader>
                    {
                        (props.data.alphaAllOpportunities.length <= 5) ? (
                            <>
                                <XTable>
                                    <TableHeader />
                                    <XTable.Body>
                                        {props.data.alphaAllOpportunities.map((v) => {
                                            return (
                                                <XTable.Row key={v.id} path={useDirect ? '/parcels/' + v.parcel.id : ('/prospecting/review?initialId=' + v.id + stage + sort)}>
                                                    {TableRows(v)}
                                                </XTable.Row>
                                            );
                                        })}
                                    </XTable.Body>
                                </XTable>
                                <XCard.Footer text={(props.data.alphaAllOpportunities ? props.data.alphaAllOpportunities.length : 0) + ' items'}>
                                    {/* {props.data.alphaOpportunities.pageInfo.currentPage > 1 && (
                                        <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage - 1).toString() }}>Prev</SwitchButton>
                                    )}
                                    {(props.data.alphaOpportunities.pageInfo.currentPage < props.data.alphaOpportunities.pageInfo.pagesCount - 1) && (
                                        <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage + 1).toString() }}>Next</SwitchButton>
                                    )} */}
                                </XCard.Footer>
                            </>
                        ) : (
                                <CollapsingTable count={props.data.alphaAllOpportunities ? props.data.alphaAllOpportunities.length : 0}>
                                    <XTable>
                                        <TableHeader />
                                        <XTable.Body>
                                            {props.data.alphaAllOpportunities.map((v) => {
                                                return (
                                                    <XTable.Row key={v.id} path={useDirect ? '/parcels/' + v.parcel.id : ('/prospecting/review?initialId=' + v.id + stage + sort)}>
                                                        {TableRows(v)}
                                                    </XTable.Row>
                                                );
                                            })}
                                        </XTable.Body>
                                    </XTable>
                                    <XCard.Footer text={(props.data.alphaAllOpportunities ? props.data.alphaAllOpportunities.length : 0) + ' items'}>
                                        {/* {props.data.alphaOpportunities.pageInfo.currentPage > 1 && (
                                            <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage - 1).toString() }}>Prev</SwitchButton>
                                        )}
                                        {(props.data.alphaOpportunities.pageInfo.currentPage < props.data.alphaOpportunities.pageInfo.pagesCount - 1) && (
                                            <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage + 1).toString() }}>Next</SwitchButton>
                                        )} */}
                                    </XCard.Footer>
                                </CollapsingTable>
                            )
                    }
                </>
            )}
            {(!props.data.alphaAllOpportunities || props.data.alphaAllOpportunities.length === 0) && (
                <>
                    {props.children}
                </>
            )}
        </XCard.Loader>
    );
})) as React.ComponentType<{ variables?: ATypes.SourcingAllQueryVariables, stage?: 'unit' | 'zoning' | 'approved' | 'rejected' | 'snoozed', type?: string, title?: string }>;