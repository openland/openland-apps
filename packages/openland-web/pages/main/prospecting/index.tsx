import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { XButton } from 'openland-x/XButton';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { withProspectingStats, OwnersSelect } from '../../../api';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';
import { buildProspectingQuery, buildQs } from '../../../components/prospectingQuery';
import { CapacityIndicator } from '../../../components/CapacityIndicator';
import { XLink } from 'openland-x/XLink';
import { XEmpty } from 'openland-x/XEmpty';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

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
            <XDocumentHead title="Incoming opportunities" />
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
                        <XButton path={'/prospecting/map' + buildQs(q.qsMap)} text="Map view" />
                        <XButton style="primary" path={'/prospecting/review' + buildQs(q.qsReview)} text="Begin review" />
                    </XHeader>

                    <OpportunitiesTable variables={{ state: OpportunityState.INCOMING, query: q.query }}>
                        <XEmpty text="You can find your first parcel at" icon="sort">
                            <Link path="/">Explore page</Link>
                        </XEmpty>
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));