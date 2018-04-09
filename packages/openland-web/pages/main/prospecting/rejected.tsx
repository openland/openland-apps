import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';

export default withApp('Rejected opportunities', 'viewer', () => {
    return (
        <>
            <XHead title="Rejected opportunities" />
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
                    <XCard.Header text="Rejected opportinities" />
                    <OpportunitiesTable variables={{ state: 'REJECTED' }}>
                        <XCard.Empty text="Here will be rejected opportunities" icon="sort" />
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});