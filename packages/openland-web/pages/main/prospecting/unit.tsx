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

export default withApp('Unit placement', 'viewer', () => {
    return (
        <>
            <XHead title="Unit placement" />
            <AppContent>
                <ProspectingNavigation />
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Unit placement">
                        <XButton style="dark" path="/prospecting/review?stage=unit">Start Review</XButton>
                    </XCard.Header>
                    <OpportunitiesTable variables={{ state: 'APPROVED_ZONING' }} stage="unit">
                        <XCard.Empty text="Review your first parcel at " icon="sort">
                            <Link path="/prospecting">Incoming page</Link>
                        </XCard.Empty>
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
});