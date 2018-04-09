import * as React from 'react';
import { withProspectingStats } from '../api';
import { XTab } from './X/XTab';

function convertNumber(value?: number) {
    if (value !== undefined && value > 0) {
        if (value > 1000) {
            return ' (' + Math.round(value / 1000) + 'k)';
        }
        return ' (' + value.toString() + ')';
    } else {
        return '';
    }
}

export const ProspectingNavigation = withProspectingStats((props) => {
    return (
        <XTab>
            <XTab.Item path="/prospecting" asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>
            <XTab.Item path="/prospecting/zoning" asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>
            <XTab.Item path="/prospecting/unit" asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>
            <XTab.Item path="/prospecting/approved">Approved{convertNumber(props.data.approved)}</XTab.Item>
            <XTab.Item path="/prospecting/rejected">Rejected</XTab.Item>
            <XTab.Item path="/prospecting/snoozed">Snoozed</XTab.Item>
        </XTab>
    );
});

export const ProspectingNavigationReview = withProspectingStats((props) => {
    return (
        <XTab>
            <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming{convertNumber(props.data.incoming)}</XTab.Item>
            <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review{convertNumber(props.data.approved_initial)}</XTab.Item>
            <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement{convertNumber(props.data.approved_zoning)}</XTab.Item>
            <XTab.Item path="/prospecting/approved">Approved{convertNumber(props.data.approved)}</XTab.Item>
            <XTab.Item path="/prospecting/rejected">Rejected</XTab.Item>
            <XTab.Item path="/prospecting/snoozed">Snoozed</XTab.Item>
        </XTab>
    );
});