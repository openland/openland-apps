import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';
import { XLink } from '../../../components/X/XLink';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('Unit placement', 'viewer', () => {
    return (
        <>
            <XHead title="Unit placement" />
            <AppContent>
                <XTab>
                    <XTab.Item path="/sourcing" asArrow={true}>Incoming</XTab.Item>
                    <XTab.Item path="/sourcing/zoning" asArrow={true}>Zoning Review</XTab.Item>
                    <XTab.Item path="/sourcing/unit" asArrow={true}>Unit Placement</XTab.Item>
                    <XTab.Item path="/sourcing/approved">Approved</XTab.Item>
                    <XTab.Item path="/sourcing/rejected">Rejected</XTab.Item>
                    <XTab.Item path="/sourcing/snoozed">Snoozed</XTab.Item>
                </XTab>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Unit placement">
                        <XButton style="dark">Start Review</XButton>
                    </XCard.Header>
                    <XCard.Empty text="Review your first parcel at " icon="sort">
                        <Link path="/sourcing">
                            Incoming page
                        </Link>
                    </XCard.Empty>
                </XCard>
            </AppContent>
        </>
    );
});