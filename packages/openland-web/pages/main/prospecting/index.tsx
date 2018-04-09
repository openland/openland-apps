import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { XLink } from '../../../components/X/XLink';
import { withProspectingStats } from '../../../api';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('Incoming opportunities', 'viewer', withProspectingStats((props) => {
    return (
        <>
            <XHead title="Incoming opportunities" />
            <AppContent>
                <ProspectingNavigation />
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Incoming opportunities">
                        <XButton style="dark" path="/prospecting/review">Begin Review</XButton>
                    </XCard.Header>
                    <OpportunitiesTable variables={{ state: 'INCOMING' }}>
                        <XCard.Empty text="You can find your first parcel at" icon="sort">
                            <Link path="/">Explore page</Link>
                        </XCard.Empty>
                    </OpportunitiesTable>
                </XCard>
            </AppContent>
        </>
    );
}));