import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';

export default withApp('Zoning Review', 'viewer', () => {
    return (
        <>
            <XHead title="Zoning Review" />
            <AppContent>
                <ProspectingNavigation />
                <XCard shadow="medium" separators={true}>
                    <XHeader text="Zoning Review">
                        <XButton style="dark" path="/prospecting/review?stage=zoning">Begin review</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: 'APPROVED_INITIAL' }} stage="zoning">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});