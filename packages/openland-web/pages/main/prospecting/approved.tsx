import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { AppContent } from '../../../components/App/AppContent';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';

export default withApp('Approved opportunities', 'viewer', () => {
    return (
        <>
            <XHead title="Approved opportunities" />
            <AppContent>
                <ProspectingNavigation />
                <XCard shadow="medium" separators={true}>
                    <XHeader text="Approved opportinities" />
                    <OpportunitiesTable variables={{ state: 'APPROVED' }}>
                        <XCard.Empty text="No approved parcels" icon="sort" />
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});