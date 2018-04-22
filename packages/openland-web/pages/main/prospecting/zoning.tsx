import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';

export default withApp('Zoning Review', 'viewer', () => {
    return (
        <>
            <XHead title="Zoning Review" />
            <Scaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Zoning Review">
                        <XButton style="dark" path="/prospecting/review?stage=zoning">Begin review</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED_INITIAL }} stage="zoning">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});