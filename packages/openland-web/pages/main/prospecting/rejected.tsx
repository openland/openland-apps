import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';
import { withRouter } from '../../../components/withRouter';
import { XButton } from '../../../components/X/XButton';

export default withApp('Rejected opportunities', 'viewer', withRouter((props) => {
    let hasPublic = props.router.query.public ? true : false;
    let squery: string | null = null;
    let queryMap = '';
    if (hasPublic) {
        squery = '{"isPublic": true}';
        queryMap = '&public=true';
    }
    return (
        <>
            <XHead title="Rejected opportunities" />
            <Scaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Rejected opportinities">
                        {!hasPublic && <XButton query={{ field: 'public', value: 'true' }}>Show only public land</XButton>}
                        {hasPublic && <XButton style="important" query={{ field: 'public' }}>Show only public land</XButton>}
                        <XButton path={'/prospecting/map?stage=rejected' + queryMap}>Map View</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.REJECTED, query: squery }}>
                        <XCard.Empty text="No rejected parcels" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));