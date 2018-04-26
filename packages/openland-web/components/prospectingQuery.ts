import { XRouter } from './withRouter';
import { OpportunityState } from 'openland-api/Types';

function buildQuery(clauses: any[]): string | null {
    if (clauses.length === 0) {
        return null;
    } else if (clauses.length === 1) {
        return JSON.stringify(clauses[0]);
    } else {
        return JSON.stringify({
            '$and': clauses
        });
    }
}

export function buildProspectingQuery(state: OpportunityState, router: XRouter) {
    let clauses: any[] = [];
    let ownerClauses: any[] = [];
    if (router.query.public) {
        clauses.push({ isPublic: true });
        ownerClauses.push({ isPublic: true });
    } else {
        clauses.push({ '$not': [{ isPublic: true }] });
        ownerClauses.push({ '$not': [{ isPublic: true }] });
    }
    if (router.query.owner) {
        clauses.push({ ownerName: router.query.owner });
    }
    return {
        query: buildQuery(clauses),
        ownerQuery: buildQuery(ownerClauses)
    };
}