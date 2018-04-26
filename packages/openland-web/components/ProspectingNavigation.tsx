import * as React from 'react';
import { withProspectingStats } from '../api';
import { XTab } from './X/XTab';
import * as qs from 'query-string';
import { withRouter } from './withRouter';
import { buildProspectingQuery } from './prospectingQuery';

function convertNumber(value?: number) {
    if (value !== undefined && value > 0) {
        return ' (' + value.toString() + ')';
    } else {
        return '';
    }
}

const ProspectingNavigationBase = withProspectingStats(withRouter((props) => {
    let sort = props.router.query.sort ? { sort: props.router.query.sort } : {};
    let pipeline = props.router.query.pipeline ? { pipeline: props.router.query.pipeline } : {};
    let query = qs.stringify(Object.assign({}, sort, pipeline));
    if (query.length > 0) {
        query = '?' + query;
    }
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

export const ProspectingNavigation = withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (<ProspectingNavigationBase variables={{ query: q.query }} />);
});

const ProspectingNavigationReviewBase = withProspectingStats(withRouter((props) => {
    let sort = props.router.query.sort ? { sort: props.router.query.sort } : {};
    let pipeline = props.router.query.pipeline ? { pipeline: props.router.query.pipeline } : {};
    let query = qs.stringify(Object.assign({}, sort, pipeline));
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
// =======
//         <>
//             {/* <XWithRole role="feature-customer-kassita" negate={true}> */}
//             <XTab inline={true}>
//                 {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
//                 {props.router.routeQuery.stage !== undefined && <XTab.Item query={moveUp ? undefined : { field: 'stage' }} path={moveUp ? ('/prospecting' + query) : undefined} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
//                 {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
//                 {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={moveUp ? undefined : { field: 'stage', value: 'zoning' }} path={moveUp ? ('/prospecting/zoning' + query) : undefined} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
//                 {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
//                 {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={moveUp ? undefined : { field: 'stage', value: 'unit' }} path={moveUp ? ('/prospecting/unit' + query) : undefined} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
//                 <XTab.Item path={'/prospecting/approved' + query} active={props.router.query.stage === 'approved'}>Approved{convertNumber(props.data.approved)}</XTab.Item>
//                 <XTab.Item path={'/prospecting/rejected' + query} active={props.router.query.stage === 'rejected'}>Rejected</XTab.Item>
//                 <XTab.Item path={'/prospecting/snoozed' + query} active={props.router.query.stage === 'snoozed'}>Snoozed</XTab.Item>

//             </XTab>
//             {/* </XWithRole>
//             <XWithRole role="feature-customer-kassita">
//                 <XTab inline={true}>
//                     {props.router.routeQuery.stage === undefined && <XTab.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
//                     {props.router.routeQuery.stage !== undefined && <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>}
//                     {props.router.routeQuery.stage === 'zoning' && <XTab.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
//                     {props.router.routeQuery.stage !== 'zoning' && <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>}
//                     {props.router.routeQuery.stage === 'unit' && <XTab.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
//                     {props.router.routeQuery.stage !== 'unit' && <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>}
//                     <XTab.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTab.Item>
//                     <XTab.Item path={'/prospecting/nyc' + query}>NYC Lots{convertNumber(props.data.snoozed)}</XTab.Item>
//                     <XTab.Item path={'/prospecting/rejected' + query}>Rejected</XTab.Item>
//                 </XTab>
//             </XWithRole> */}
//         </>
// >>>>>>> 5ea3cf544464e7273bb612193568d798df44d19c
    );
}));

export const ProspectingNavigationReview = withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (<ProspectingNavigationReviewBase variables={{ query: q.query }} />);
});

const ProspectingNavigationMapBase = withProspectingStats(withRouter((props) => {
    let pipeline = props.router.query.pipeline ? { pipeline: props.router.query.pipeline } : {};
    let query = qs.stringify(Object.assign({}, pipeline));
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
            {props.router.routeQuery.stage === 'approved' && <XTab.Item path={'/prospecting/approved' + query} active={true} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
            {props.router.routeQuery.stage !== 'approved' && <XTab.Item query={{ field: 'stage', value: 'approved' }} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTab.Item>}
            {props.router.routeQuery.stage === 'rejected' && <XTab.Item path={'/prospecting/rejected' + query} active={true} asArrow={false}>Rejected</XTab.Item>}
            {props.router.routeQuery.stage !== 'rejected' && <XTab.Item query={{ field: 'stage', value: 'rejected' }} asArrow={false}>Rejected</XTab.Item>}
            {props.router.routeQuery.stage === 'snoozed' && <XTab.Item path={'/prospecting/snoozed' + query} active={true} asArrow={false}>Snoozed</XTab.Item>}
            {props.router.routeQuery.stage !== 'snoozed' && <XTab.Item query={{ field: 'stage', value: 'snoozed' }} asArrow={false}>Snoozed</XTab.Item>}
        </XTab>
    );
}));

export const ProspectingNavigationMap = withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (<ProspectingNavigationMapBase variables={{ query: q.query }} />);
});