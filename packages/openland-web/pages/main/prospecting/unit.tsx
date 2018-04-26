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
import { buildProspectingQuery } from '../../../components/prospectingQuery';
import { OwnersSelect } from '../../../api';

let OwnersSelectStyled = Glamorous(OwnersSelect)({
    width: 300
});

export default withApp('Unit placement', 'viewer', withRouter((props) => {
    let hasPublic = props.router.query.public ? true : false;
    let queryMap = '';
    if (hasPublic) {
        queryMap = '&public=true';
    }
    let q = buildProspectingQuery(OpportunityState.APPROVED_ZONING, props.router);
    return (
        <>
            <XHead title="Unit placement" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Unit placement">
                        <OwnersSelectStyled
                            variables={{ query: q.ownerQuery, state: OpportunityState.APPROVED_ZONING }}
                            placeholder="Owner name"
                            value={props.router.query.owner}
                            onChange={(v) => props.router.pushQuery('owner', v ? (v as any).value as string : undefined)}
                        />
                        <XButton path={'/prospecting/map?stage=unit' + queryMap}>Map view</XButton>
                        <XButton style="dark" path={'/prospecting/review?stage=unit' + queryMap}>Begin review</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED_ZONING, query: q.query }} stage="unit">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));