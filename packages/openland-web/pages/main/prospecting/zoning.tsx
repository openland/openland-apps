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
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('Zoning Review', 'viewer', () => {
    return (
        <>
            <XHead title="Zoning Review" />
            <AppContent>
                <XTab>
                    <XTab.Item path="/prospecting" asArrow={true}>Incoming</XTab.Item>
                    <XTab.Item path="/prospecting/zoning" asArrow={true}>Zoning Review</XTab.Item>
                    <XTab.Item path="/prospecting/unit" asArrow={true}>Unit Placement</XTab.Item>
                    <XTab.Item path="/prospecting/approved">Approved</XTab.Item>
                    <XTab.Item path="/prospecting/rejected">Rejected</XTab.Item>
                    <XTab.Item path="/prospecting/snoozed">Snoozed</XTab.Item>
                </XTab>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Zoning Review">
                        <XButton style="dark" path="/prospecting/review?stage=zoning">Start Review</XButton>
                    </XCard.Header>
                    <OpportunitiesTable variables={{ state: 'APPROVED_INITIAL' }} stage="zoning">
                        <XCard.Empty text="Review your first parcel at " icon="sort">
                            <Link path="/prospecting">Incoming page</Link>
                        </XCard.Empty>
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});