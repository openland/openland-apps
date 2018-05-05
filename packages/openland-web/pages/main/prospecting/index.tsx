import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from 'openland-x/XButton';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { withProspectingStats, OwnersSelect } from '../../../api';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';
import { buildProspectingQuery, buildQs } from '../../../components/prospectingQuery';
import { CapacityIndicator } from '../../../components/CapacityIndicator';
import { XLink } from 'openland-x/XLink';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

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

export default withApp('Incoming opportunities', 'viewer', withProspectingStats((props) => {
    let q = buildProspectingQuery(props.router);
    return (
        <>
            <XHead title="Incoming opportunities" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader
                        text="Incoming opportunities"
                        description={<CapacityIndicator variables={{ state: OpportunityState.INCOMING, query: q.query }} />}
                    >
                        <OwnersSelectStyled>
                            <OwnersSelect
                                variables={{ query: q.ownerQuery, state: OpportunityState.INCOMING }}
                                placeholder="Owner name"
                                value={props.router.query.owner}
                                onChange={(v) => props.router.pushQuery('owner', v ? (v as any).value as string : undefined)}
                            />
                        </OwnersSelectStyled>
                        <XButton size="small" path={'/prospecting/map' + buildQs(q.qsMap)}>Map view</XButton>
                        <XButton size="small" style="primary" path={'/prospecting/review' + buildQs(q.qsReview)}>Begin review</XButton>
                    </XHeader>

                    <OpportunitiesTable variables={{ state: OpportunityState.INCOMING, query: q.query }}>
                        <XCard.Empty text="You can find your first parcel at" icon="sort">
                            <Link path="/">Explore page</Link>
                        </XCard.Empty>
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));