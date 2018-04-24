import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { XLink } from '../../../components/X/XLink';
import { withProspectingStats } from '../../../api';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { OpportunityState } from 'openland-api/Types';
import * as qs from 'query-string';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('Incoming opportunities', 'viewer', withProspectingStats((props) => {
    let hasPublic = props.router.query.public ? true : false;
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
    let squery: string | null = null;
    if (hasPublic) {
        squery = '{"isPublic": true}';
    }
    return (
        <>
            <XHead title="Incoming opportunities" />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Incoming opportunities">
                        <XButton path={'/prospecting/map' + queryMap}>Map View</XButton>
                        <XButton style="dark" path={'/prospecting/review' + query}>Begin Review</XButton>
                    </XHeader>

                    <OpportunitiesTable variables={{ state: OpportunityState.INCOMING, query: squery }}>
                        <XCard.Empty text="You can find your first parcel at" icon="sort">
                            <Link path="/">Explore page</Link>
                        </XCard.Empty>
                    </OpportunitiesTable>
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));