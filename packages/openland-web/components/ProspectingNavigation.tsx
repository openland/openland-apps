import * as React from 'react';
import { withProspectingStats } from '../api';
import { XTab } from './X/XTab';
import { withRouter } from 'next/router';
import * as qs from 'query-string';

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
    // let hasPublic = props.router.query.public ? true : false;
    // let squery: string | null = null;
    // if (hasPublic) {
    //     squery = '{"isPublic": true}';
    // }
    return (
        <XTab inline={true}>
            <XTab.Item path={'/prospecting' + query} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>
            <XTab.Item path={'/prospecting/zoning' + query} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>
            <XTab.Item path={'/prospecting/unit' + query} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>
            <XTab.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTab.Item>
            <XTab.Item path={'/prospecting/rejected' + query}>Rejected</XTab.Item>
            <XTab.Item path={'/prospecting/snoozed' + query}>Snoozed</XTab.Item>
        </XTab>
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
    );
}));

export const ProspectingNavigationMap = withProspectingStats(withRouter((props) => {
    let pub = props.router.query.public ? { public: true } : {};
    let query = qs.stringify(Object.assign({}, pub));
    if (query.length > 0) {
        query = '?' + query;
    }
    return (
        <XTab inline={true}>
            {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
            {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
            {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
            {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
            {props.router.routeQuery.stage === 'approved' && <XTab.Item path={'/prospecting/approved' + query} active={true} asArrow={true}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'approved' && <XTab.Item query={{ field: 'stage', value: 'approved' }} asArrow={true}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
            {props.router.routeQuery.stage === 'rejected' && <XTab.Item path={'/prospecting/rejected' + query} active={true} asArrow={true}>Rejected</XTab.Item>}
            {props.router.routeQuery.stage !== 'rejected' && <XTab.Item query={{ field: 'stage', value: 'rejected' }} asArrow={true}>Rejected</XTab.Item>}
            {props.router.routeQuery.stage === 'snoozed' && <XTab.Item path={'/prospecting/snoozed' + query} active={true} asArrow={true}>Snoozed</XTab.Item>}
            {props.router.routeQuery.stage !== 'snoozed' && <XTab.Item query={{ field: 'stage', value: 'snoozed' }} asArrow={true}>Snoozed</XTab.Item>}
        </XTab>
    );
}));