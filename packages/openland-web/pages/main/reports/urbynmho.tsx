import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { OpportunitiesTable } from '../../../components/OpportunitiesTableUrbynReport';
import { OpportunityState } from 'openland-api/Types';
import { withRouter } from '../../../components/withRouter';
import { Scaffold } from '../../../components/Scaffold';

const UrbinHeaderWrapper = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 206,
    backgroundColor: '#78a9c7',
    marginBottom: 18,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    padding: 50
});

const UrbinLogo = Glamorous.img({
    width: 65,
    height: 22,
    marginBottom: 11,
    objectFit: 'contain'
});

const NYLogo = Glamorous.img({
    position: 'absolute',
    right: 12,
    bottom: 0,
    height: '100%',
    width: 530,
    objectFit: 'contain'
});

const UrbinTitle = Glamorous.div({
    fontSize: 28,
    fontWeight: 500,
    lineHeight: 1.07,
    letterSpacing: -0.2,
    color: '#78a9c7',
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: '7px 12px 7px 10px',
    alignSelf: 'flex-start'
});

const UrbinHeader = () => (
    <UrbinHeaderWrapper>
        <NYLogo src="/static/img/icons/reports/ny-bei-nacht.svg"/>
        <UrbinLogo src="/static/img/icons/reports/urbyn.png" srcSet="/static/img/icons/reports/urbyn@2x.png 2x"/>
        <UrbinTitle>Mini-Home Opportunities in New York City</UrbinTitle>
    </UrbinHeaderWrapper>
);

export default withApp('Reports Urbyn MHO', 'viewer', withRouter((props) => {
    let clauses1: any[] = [];
    clauses1.push({ isPublic: true });
    let q1 = buildQuery(clauses1);

    let clauses2: any[] = [];
    clauses2.push({ '$and': [{ isPublic: true }, { '$or': [{ ownerName: 'HPD NYC' }, { ownerName: 'hpd' }, { ownerName: 'Housing Preservation' }] }] });
    let q2 = buildQuery(clauses2);
    return (
        <>
            <XHead title="Mini-Home Opportunities in New York City" />
            <Scaffold>
                <Scaffold.Content>
                    <UrbinHeader />
                    <OpportunitiesTable variables={{ state: OpportunityState.APPROVED_INITIAL, query: JSON.stringify(q1), page: props.router.query.page_hpd ? props.router.query.page_hpd : undefined}} stage="zoning"  type="hpd" >
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                    <OpportunitiesTable variables={{ state: OpportunityState.INCOMING, query: JSON.stringify(q2), page: props.router.query.page_public ? props.router.query.page_public : undefined }} stage="zoning" type="public">
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    </OpportunitiesTable>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));

function buildQuery(clauses: any[]): any | null {
    if (clauses.length === 0) {
        return null;
    } else if (clauses.length === 1) {
        return clauses[0];
    } else {
        return {
            '$and': clauses
        };
    }
}