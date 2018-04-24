import * as React from 'react';
import { withProspectingStats } from '../api';
import { XTab } from './X/XTab';
import { withRouter } from 'next/router';
import * as qs from 'query-string';
import { XWithRole } from './X/XWithRole';

function convertNumber(value?: number) {
    if (value !== undefined && value > 0) {
        // if (value > 1000) {
        //     return ' (' + Math.round(value / 1000) + 'k)';
        // }
        return ' (' + value.toString() + ')';
    } else {
        return '';
    }
}

export const ProspectingNavigation = withProspectingStats(withRouter((props) => {
    let sort = props.router.query.sort ? { sort: props.router.query.sort } : {};
    let pub = props.router.query.public ? { public: true } : {};
    let query = qs.stringify(Object.assign({}, sort, pub));
    if (query.length > 0) {
        query = '?' + query;
    }
    return (
        <>
            <XWithRole role="feature-customer-kassita" negate={true}>
                <XTab inline={true}>
                    <XTab.Item path={'/prospecting' + query} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>
                    <XTab.Item path={'/prospecting/zoning' + query} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>
                    <XTab.Item path={'/prospecting/unit' + query} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>
                    <XTab.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTab.Item>
                    <XTab.Item path={'/prospecting/rejected' + query}>Rejected</XTab.Item>
                    <XTab.Item path={'/prospecting/snoozed' + query}>Snoozed</XTab.Item>
                </XTab>
            </XWithRole>
            <XWithRole role="feature-customer-kassita">
                <XTab inline={true}>
                    <XTab.Item path={'/prospecting' + query} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>
                    <XTab.Item path={'/prospecting/zoning' + query} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>
                    <XTab.Item path={'/prospecting/unit' + query} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>
                    <XTab.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTab.Item>
                    <XTab.Item path={'/prospecting/nyc' + query}>NYC Lots{convertNumber(props.data.approved)}</XTab.Item>
                    <XTab.Item path={'/prospecting/rejected' + query}>Rejected</XTab.Item>
                </XTab>
            </XWithRole>
        </>
    );
}));

export const ProspectingNavigationReview = withProspectingStats(withRouter((props) => {
    let sort = props.router.query.sort ? { sort: props.router.query.sort } : {};
    let pub = props.router.query.public ? { public: true } : {};
    let query = qs.stringify(Object.assign({}, sort, pub));
    if (query.length > 0) {
        query = '?' + query;
    }
    return (
        <>
            <XWithRole role="feature-customer-kassita" negate={true}>
                <XTab inline={true}>
                    {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    <XTab.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTab.Item>
                    <XTab.Item path={'/prospecting/rejected' + query}>Rejected</XTab.Item>
                    <XTab.Item path={'/prospecting/snoozed' + query}>Snoozed</XTab.Item>
                </XTab>
            </XWithRole>
            <XWithRole role="feature-customer-kassita">
                <XTab inline={true}>
                    {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    <XTab.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTab.Item>
                    <XTab.Item path={'/prospecting/nyc' + query}>NYC Lots{convertNumber(props.data.snoozed)}</XTab.Item>
                    <XTab.Item path={'/prospecting/rejected' + query}>Rejected</XTab.Item>
                </XTab>
            </XWithRole>
        </>
    );
}));

export const ProspectingNavigationMap = withProspectingStats(withRouter((props) => {
    let pub = props.router.query.public ? { public: true } : {};
    let query = qs.stringify(Object.assign({}, pub));
    if (query.length > 0) {
        query = '?' + query;
    }
    return (
        <>
            <XWithRole role="feature-customer-kassita" negate={true}>
                <XTab inline={true}>
                    {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'approved' && <XTab.Item path={'/prospecting/approved' + query} active={true} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'approved' && <XTab.Item query={{ field: 'stage', value: 'approved' }} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'rejected' && <XTab.Item path={'/prospecting/rejected' + query} active={true} asArrow={false}>Rejected</XTab.Item>}
                    {props.router.routeQuery.stage !== 'rejected' && <XTab.Item query={{ field: 'stage', value: 'rejected' }} asArrow={false}>Rejected</XTab.Item>}
                    {props.router.routeQuery.stage === 'snoozed' && <XTab.Item path={'/prospecting/snoozed' + query} active={true} asArrow={false}>Snoozed</XTab.Item>}
                    {props.router.routeQuery.stage !== 'snoozed' && <XTab.Item query={{ field: 'stage', value: 'snoozed' }} asArrow={false}>Snoozed</XTab.Item>}
                </XTab>
            </XWithRole>
            <XWithRole role="feature-customer-kassita">
                <XTab inline={true}>
                    {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'approved' && <XTab.Item path={'/prospecting/approved' + query} active={true} asArrow={true}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'approved' && <XTab.Item query={{ field: 'stage', value: 'approved' }} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'nyc' && <XTab.Item path={'/prospecting/nyc' + query} active={true} asArrow={false}>NYC Lots{convertNumber(props.data.snoozed)}</XTab.Item>}
                    {props.router.routeQuery.stage !== 'nyc' && <XTab.Item query={{ field: 'stage', value: 'nyc' }} asArrow={false}>NYC Lots{convertNumber(props.data.snoozed)}</XTab.Item>}
                    {props.router.routeQuery.stage === 'rejected' && <XTab.Item path={'/prospecting/rejected' + query} active={true} asArrow={false}>Rejected</XTab.Item>}
                    {props.router.routeQuery.stage !== 'rejected' && <XTab.Item query={{ field: 'stage', value: 'rejected' }} asArrow={false}>Rejected</XTab.Item>}
                </XTab>
            </XWithRole>
        </>
    );
}));