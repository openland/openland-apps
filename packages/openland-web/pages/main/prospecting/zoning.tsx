import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { XLink } from '../../../components/X/XLink';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('Zoning Review', 'viewer', () => {
    return (
        <>
            <XHead title="Zoning Review" />
            <AppContent>
                <ProspectingNavigation />
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Zoning Review">
                        <XButton style="dark" path="/prospecting/review?stage=zoning">Begin review</XButton>
                    </XCard.Header>
                    <OpportunitiesTable variables={{ state: 'APPROVED_INITIAL' }} stage="zoning">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});