import * as React from 'react';
import { withProspectingStats } from '../api';
import { XTab } from './X/XTab';
import { withRouter } from 'next/router';

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
    let sort = props.router.query.sort ? '?sort=' + props.router.query.sort : '';
    return (
        <XTab inline={true}>
            <XTab.Item path={'/prospecting' + sort} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>
            <XTab.Item path={'/prospecting/zoning' + sort} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>
            <XTab.Item path={'/prospecting/unit' + sort} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>
            <XTab.Item path={'/prospecting/approved' + sort}>Approved{convertNumber(props.data.approved)}</XTab.Item>
            <XTab.Item path={'/prospecting/rejected' + sort}>Rejected</XTab.Item>
            <XTab.Item path={'/prospecting/snoozed' + sort}>Snoozed</XTab.Item>
        </XTab>
    );
}));

export const ProspectingNavigationReview = withProspectingStats(withRouter((props) => {
    let sort = props.router.query.sort ? '?sort=' + props.router.query.sort : '';
    return (
        <XTab inline={true}>
            {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + sort} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
            {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
            {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + sort} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
            {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + sort} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
            <XTab.Item path={'/prospecting/approved' + sort}>Approved{convertNumber(props.data.approved)}</XTab.Item>
            <XTab.Item path={'/prospecting/rejected' + sort}>Rejected</XTab.Item>
            <XTab.Item path={'/prospecting/snoozed' + sort}>Snoozed</XTab.Item>
        </XTab>
    );
}));

export const ProspectingNavigationMap = withProspectingStats(withRouter((props) => {
    return (
        <XTab inline={true}>
            {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting'} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
            {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
            {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning'} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
            {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit'} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
            <XTab.Item path={'/prospecting/approved'}>Approved{convertNumber(props.data.approved)}</XTab.Item>
            <XTab.Item path={'/prospecting/rejected'}>Rejected</XTab.Item>
            <XTab.Item path={'/prospecting/snoozed'}>Snoozed</XTab.Item>
        </XTab>
    );
}));