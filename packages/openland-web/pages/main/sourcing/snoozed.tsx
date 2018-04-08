import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';

export default withApp('Snoozed opportunities', 'viewer', () => {
    return (
        <>
            <XHead title="Snoozed opportunities" />
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
                    <XCard.Header text="Snoozed opportinities" />
                    <OpportunitiesTable variables={{ state: 'SNOOZED' }}>
                        <XCard.Empty text="Here will be snoozed opportunities" icon="sort" />
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});