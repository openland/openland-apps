import * as React from 'react';
import { withProspectingStats } from '../api/withProspectingStats';
import * as qs from 'query-string';
import { buildProspectingQuery } from './prospectingQuery';
import { withRouter } from 'openland-x-routing/withRouter';
import { XTabs } from 'openland-x/XTabs';

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
        <XTabs inline={true}>
            <XTabs.Item path={'/prospecting' + query} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTabs.Item>
            <XTabs.Item path={'/prospecting/zoning' + query} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTabs.Item>
            <XTabs.Item path={'/prospecting/unit' + query} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTabs.Item>
            <XTabs.Item path={'/prospecting/approved' + query}>Approved{convertNumber(props.data.approved)}</XTabs.Item>
            <XTabs.Item path={'/prospecting/rejected' + query}>Rejected</XTabs.Item>
            <XTabs.Item path={'/prospecting/snoozed' + query}>Snoozed</XTabs.Item>
        </XTabs>
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
        <XTabs inline={true}>
            {props.router.routeQuery.stage === undefined && <XTabs.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTabs.Item>}
            {props.router.routeQuery.stage !== undefined && <XTabs.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'zoning' && <XTabs.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTabs.Item>}
            {props.router.routeQuery.stage !== 'zoning' && <XTabs.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'unit' && <XTabs.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTabs.Item>}
            {props.router.routeQuery.stage !== 'unit' && <XTabs.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTabs.Item>}
            
            {props.router.routeQuery.stage === 'approved' && <XTabs.Item path={'/prospecting/approved' + query} active={true} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTabs.Item>}
            {props.router.routeQuery.stage !== 'approved' && <XTabs.Item query={{ field: 'stage', value: 'approved' }} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'rejected' && <XTabs.Item path={'/prospecting/rejected' + query} active={true} asArrow={false}>Rejected</XTabs.Item>}
            {props.router.routeQuery.stage !== 'rejected' && <XTabs.Item query={{ field: 'stage', value: 'rejected' }} asArrow={false}>Rejected</XTabs.Item>}
            {props.router.routeQuery.stage === 'snoozed' && <XTabs.Item path={'/prospecting/snoozed' + query} active={true} asArrow={false}>Snoozed</XTabs.Item>}
            {props.router.routeQuery.stage !== 'snoozed' && <XTabs.Item query={{ field: 'stage', value: 'snoozed' }} asArrow={false}>Snoozed</XTabs.Item>}
        </XTabs>
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
        <XTabs inline={true}>
            {props.router.routeQuery.stage === undefined && <XTabs.Item path={'/prospecting' + query} active={true} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTabs.Item>}
            {props.router.routeQuery.stage !== undefined && <XTabs.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'zoning' && <XTabs.Item path={'/prospecting/zoning' + query} active={true} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTabs.Item>}
            {props.router.routeQuery.stage !== 'zoning' && <XTabs.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'unit' && <XTabs.Item path={'/prospecting/unit' + query} active={true} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTabs.Item>}
            {props.router.routeQuery.stage !== 'unit' && <XTabs.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'approved' && <XTabs.Item path={'/prospecting/approved' + query} active={true} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTabs.Item>}
            {props.router.routeQuery.stage !== 'approved' && <XTabs.Item query={{ field: 'stage', value: 'approved' }} asArrow={false}>Approved{convertNumber(props.data.approved)}</XTabs.Item>}
            {props.router.routeQuery.stage === 'rejected' && <XTabs.Item path={'/prospecting/rejected' + query} active={true} asArrow={false}>Rejected</XTabs.Item>}
            {props.router.routeQuery.stage !== 'rejected' && <XTabs.Item query={{ field: 'stage', value: 'rejected' }} asArrow={false}>Rejected</XTabs.Item>}
            {props.router.routeQuery.stage === 'snoozed' && <XTabs.Item path={'/prospecting/snoozed' + query} active={true} asArrow={false}>Snoozed</XTabs.Item>}
            {props.router.routeQuery.stage !== 'snoozed' && <XTabs.Item query={{ field: 'stage', value: 'snoozed' }} asArrow={false}>Snoozed</XTabs.Item>}
        </XTabs>
    );
}));

export const ProspectingNavigationMap = withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (<ProspectingNavigationMapBase variables={{ query: q.query }} />);
});