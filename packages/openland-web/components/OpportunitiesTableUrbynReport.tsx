import * as React from 'react';
import Glamorous from 'glamorous';
import { withSourcingAll, withSourcingFirst } from '../api';
import { XCard } from './X/XCard';
import { XHeader } from './X/XHeader';
import { XTable } from './X/XTable';
import { XModalRouted } from './X/XModalRouted';
import { XButton } from './X/XButton';
import { XArea } from './X/XArea';
import { XWithRole } from './X/XWithRole';
import { ParcelNumber } from './ParcelNumber';
import ATypes from 'openland-api';
import { withRouter } from './withRouter';

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
            <XButton style="dark" onClick={exportCVS}>{'Download' + props.data.variables + '.csv'}</XButton>
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
    maxHeight: props.collapse ? 241 : 550,
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

class CollapsingTable extends React.Component<{ children: any }, { collapse: boolean, btnText: string }> {
    constructor(props: { children: any }) {
        super(props);

        this.state = {
            collapse: true,
            btnText: 'Show full table'
        };
    }

    collapseHandler() {
        this.setState({
            collapse: !this.state.collapse,
            btnText: (this.state.collapse === true) ? 'Show full table' : 'Hide table'
        });
    }

    render() {
        return (
            <CollapsingTableWrapper collapse={this.state.collapse}>
                <CollapseGradient collapse={this.state.collapse} />
                <CollapsWrapper collapse={this.state.collapse}>
                    {this.props.children}
                </CollapsWrapper>
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
            {v.node.parcel.extrasBorough}
        </XTable.Cell>
        <XTable.Cell>
            <ParcelNumber compact={true} id={v.node.parcel.number} />
        </XTable.Cell>
        <XTable.Cell>
            {v.node.parcel.address}
        </XTable.Cell>
        <XTable.Cell>
            {v.node.parcel && v.node.parcel.area && <XArea area={v.node.parcel.area.value} />}
        </XTable.Cell>
        <XTable.Cell>
            {v.node.parcel.extrasZoning}
        </XTable.Cell>
        <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
            <XTable.Cell>
                {Boolean(v.node.parcel.area && v.node.parcel.extrasUnitCapacityDencity && v.node.parcel.extrasUnitCapacityFar) ? v.node.parcel.extrasUnitCapacity : ''}
            </XTable.Cell>
        </XWithRole>
    </>
);

export const OpportunitiesTable = withSourcingFirst(withRouter((props) => {
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
        link.setAttribute('download', (props as any).title + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <XCard.Loader loading={(props.data.loading || false) && (!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0)}>
            <XModalRouted title="Export to CVS" query="export">
                <ExportModal />
            </XModalRouted>

            {props.data.alphaOpportunities && props.data.alphaOpportunities.edges.length !== 0 && (
                <>
                    <XHeader text={(props as any).title} separated={true}>
                        <XWithRole role={['super-admin', 'software-developer', 'feature-customer-kassita']}>
                            <DownloadButton onClick={exportCVS} style="dark">
                                <img src="/static/img/icons/reports/download-icon.svg" style={{ marginRight: 6, marginBottom: -1 }} />
                                <span>Export list</span>
                            </DownloadButton>
                        </XWithRole>
                    </XHeader>
                    {
                        (props.data.alphaOpportunities.edges.length <= 5) ? (
                            <>
                                <XTable>
                                    <TableHeader />
                                    <XTable.Body>
                                        {props.data.alphaOpportunities.edges.map((v) => {
                                            return (
                                                <XTable.Row key={v.node.id} path={useDirect ? '/parcels/' + v.node.parcel.id : ('/prospecting/review?initialId=' + v.node.id + stage + sort)}>
                                                    {TableRows(v)}
                                                </XTable.Row>
                                            );
                                        })}
                                    </XTable.Body>
                                </XTable>
                                <XCard.Footer text={props.data.alphaOpportunities.pageInfo.itemsCount + ' items'}>
                                    {props.data.alphaOpportunities.pageInfo.currentPage > 1 && (
                                        <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage - 1).toString() }}>Prev</SwitchButton>
                                    )}
                                    {(props.data.alphaOpportunities.pageInfo.currentPage < props.data.alphaOpportunities.pageInfo.pagesCount - 1) && (
                                        <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage + 1).toString() }}>Next</SwitchButton>
                                    )}
                                </XCard.Footer>
                            </>
                        ) : (
                                <CollapsingTable>
                                    <XTable>
                                        <TableHeader />
                                        <XTable.Body>
                                            {props.data.alphaOpportunities.edges.map((v) => {
                                                return (
                                                    <XTable.Row key={v.node.id} path={useDirect ? '/parcels/' + v.node.parcel.id : ('/prospecting/review?initialId=' + v.node.id + stage + sort)}>
                                                        {TableRows(v)}
                                                    </XTable.Row>
                                                );
                                            })}
                                        </XTable.Body>
                                    </XTable>
                                    <XCard.Footer text={props.data.alphaOpportunities.pageInfo.itemsCount + ' items'}>
                                        {props.data.alphaOpportunities.pageInfo.currentPage > 1 && (
                                            <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage - 1).toString() }}>Prev</SwitchButton>
                                        )}
                                        {(props.data.alphaOpportunities.pageInfo.currentPage < props.data.alphaOpportunities.pageInfo.pagesCount - 1) && (
                                            <SwitchButton query={{ field: 'page_' + (props as any).type, value: (props.data.alphaOpportunities.pageInfo.currentPage + 1).toString() }}>Next</SwitchButton>
                                        )}
                                    </XCard.Footer>
                                </CollapsingTable>
                            )
                    }
                </>
            )}
            {(!props.data.alphaOpportunities || props.data.alphaOpportunities.edges.length === 0) && (
                <>
                    {props.children}
                </>
            )}
        </XCard.Loader>
    );
})) as React.ComponentType<{ variables?: ATypes.SourcingFirstQueryVariables, stage?: 'unit' | 'zoning' | 'approved' | 'rejected' | 'snoozed', type?: string, title?: string }>;