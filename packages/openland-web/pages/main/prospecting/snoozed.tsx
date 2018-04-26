import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
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
import { buildProspectingQuery, buildQs } from '../../../components/prospectingQuery';
import { OwnersSelect } from '../../../api';

let OwnersSelectStyled = Glamorous(OwnersSelect)({
    width: 300
});

export default withApp('Snoozed opportunities', 'viewer', withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (
        <>
            <XHead title={'Snoozed opportunities'} />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />

                    <XHeader text={'Snoozed opportunities'}>
                        <OwnersSelectStyled
                            variables={{ query: q.ownerQuery, state: OpportunityState.SNOOZED }}
                            placeholder="Owner name"
                            value={props.router.query.owner}
                            onChange={(v) => props.router.pushQuery('owner', v ? (v as any).value as string : undefined)}
                        />
                        <XButton path={'/prospecting/map' + buildQs({ stage: 'snoozed', ...q.qsMap })}>Map view</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.SNOOZED, query: q.query }} stage="snoozed">
                        <XCard.Empty text="No snoozed parcels" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));