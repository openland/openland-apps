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

export default withApp('Unit placement', 'viewer', () => {
    return (
        <>
            <XHead title="Unit placement" />
            <Scaffold>
                <Scaffold.Content bottomOffset={true}>
                    <ProspectingNavigation />
                    <XHeader text="Unit placement">
                        <XButton style="dark" path="/prospecting/review?stage=unit">Begin review</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: 'APPROVED_ZONING' }} stage="unit">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});