import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { AppContent } from '../../../components/App/AppContent';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';

export default withApp('Rejected opportunities', 'viewer', () => {
    return (
        <>
            <XHead title="Rejected opportunities" />
            <AppContent>
                <ProspectingNavigation />
                <XCard shadow="medium" separators={true}>
                    <XHeader text="Rejected opportinities" />
                    <OpportunitiesTable variables={{ state: 'REJECTED' }}>
                        <XCard.Empty text="No rejected parcels" icon="sort" />
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});