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
import { XButton } from '../../../components/X/XButton';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';
import { buildProspectingQuery, buildQs } from '../../../components/prospectingQuery';
import { OwnersSelect } from '../../../api';
import { CapacityIndicator } from '../../../components/CapacityIndicator';
import { withRouter } from 'openland-x-routing/withRouter';

let OwnersSelectStyled = Glamorous.div({
    fontSize: 14,
    '& > .Select': {
        width: 300
    },
    '&.has-value': {
        '& .Select-arrow': {
            marginBottom: '0px !important'
        }
    },
    '& .Select-option': {
        height: 36,
        lineHeight: '18px'
    },
    '& .Select-placeholder, & .Select-value-label': {
        lineHeight: '32px'
    },
    '& .Select-input > input': {
        padding: '0 !important'
    }
});

export default withApp('Approved opportunities', 'viewer', withRouter((props) => {
    let q = buildProspectingQuery(props.router);
    return (
        <>
            <XHead title="Approved opportunities" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader
                        text="Approved opportinities"
                        description={<CapacityIndicator variables={{ state: OpportunityState.APPROVED, query: q.query }} />}
                    >
                        <OwnersSelectStyled>
                            <OwnersSelect
                                variables={{ query: q.ownerQuery, state: OpportunityState.APPROVED }}
                                placeholder="Owner name"
                                value={props.router.query.owner}
                                onChange={(v) => props.router.pushQuery('owner', v ? (v as any).value as string : undefined)}
                            />
                        </OwnersSelectStyled>
                        <XButton path={'/prospecting/map' + buildQs({ stage: 'approved', ...q.qsMap })}>Map view</XButton>
                    </XHeader>
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED, query: q.query }} stage="approved">
                        <XCard.Empty text="No approved parcels" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));