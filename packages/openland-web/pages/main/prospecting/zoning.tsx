import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';
import { withRouter } from '../../../components/withRouter';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';
import { buildProspectingQuery, buildQs } from '../../../components/prospectingQuery';
import { OwnersSelect } from '../../../api';

let OwnersSelectStyled = Glamorous(OwnersSelect)({
    width: 300
});

export default withApp('Zoning Review', 'viewer', withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (
        <>
            <XHead title="Zoning Review" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Zoning Review">
                        <OwnersSelectStyled
                            variables={{ query: q.ownerQuery, state: OpportunityState.APPROVED_INITIAL }}
                            placeholder="Owner name"
                            value={props.router.query.owner}
                            onChange={(v) => props.router.pushQuery('owner', v ? (v as any).value as string : undefined)}
                        />
                        <XButton path={'/prospecting/map' + buildQs({ stage: 'zoning', ...q.qsMap })}>Map view</XButton>
                        <XButton style="dark" path={'/prospecting/review' + + buildQs({ stage: 'zoning', ...q.qsMap })}>Begin review</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED_INITIAL, query: q.query }} stage="zoning">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));