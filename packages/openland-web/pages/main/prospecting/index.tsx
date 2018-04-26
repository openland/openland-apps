import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { XLink } from '../../../components/X/XLink';
import { withProspectingStats, OwnersSelect } from '../../../api';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';
import * as qs from 'query-string';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';
import { buildProspectingQuery } from '../../../components/prospectingQuery';

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

    let sort = props.router.query.sort ? { sort: props.router.query.sort } : {};
    let pub = props.router.query.public ? { public: true } : {};
    let query = qs.stringify(Object.assign({}, sort, pub));
    let queryMap = qs.stringify(Object.assign({}, pub));
    if (query.length > 0) {
        query = '?' + query;
    }
    if (queryMap.length > 0) {
        queryMap = '?' + queryMap;
    }
    let q = buildProspectingQuery(OpportunityState.INCOMING, props.router);

    return (
        <>
            <XHead title="Incoming opportunities" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Incoming opportunities">
                        <OwnersSelectStyled>
                            <OwnersSelect
                                variables={{ query: q.ownerQuery, state: OpportunityState.INCOMING }}
                                placeholder="Owner name"
                                value={props.router.query.owner}
                                onChange={(v) => props.router.pushQuery('owner', v ? (v as any).value as string : undefined)}
                            />
                        </OwnersSelectStyled>
                        <XButton path={'/prospecting/map' + queryMap}>Map view</XButton>
                        <XButton style="dark" path={'/prospecting/review' + query}>Begin review</XButton>
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