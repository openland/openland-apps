import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { OpportunitiesTable } from '../../../components/OpportunitiesTableUrbynReport';
import { OpportunityState } from 'openland-api/Types';
import { withRouter } from '../../../components/withRouter';
import { Scaffold } from '../../../components/Scaffold';

export default withApp('Reports Urbyn MHO', 'viewer', withRouter((props) => {
    return (
        <>
            <XHead title="Mini-Home Opportunities in New York City" />
            <Scaffold>
                <Scaffold.Content>
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED_ZONING, query: q.query }} stage="unit">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED_ZONING, query: q.query }} stage="unit">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));