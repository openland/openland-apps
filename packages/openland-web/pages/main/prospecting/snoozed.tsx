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
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';

export default withApp('NYC Lots', 'viewer', withRouter((props) => {
    let hasPublic = props.router.query.public ? true : false;
    let squery: string | null = null;
    let queryMap = '';
    if (hasPublic) {
        squery = '{"isPublic": true}';
        queryMap = '&public=true';
    }
    return (
        <>
            <XHead title="NYC Lots" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />

                    <XHeader text="NYC Lots">
                        <XButton path={'/prospecting/map?stage=snoozed' + queryMap}>Map View</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.SNOOZED, query: squery }}>
                        <XCard.Empty text="No snoozed parcels" icon="sort" />
                    </OpportunitiesTable>

                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));