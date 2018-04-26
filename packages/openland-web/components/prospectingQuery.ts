import { XRouter } from './withRouter';
import * as qs from 'query-string';

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

export function buildQs(src: any) {
    let res = qs.stringify(src);
    if (res.length > 0) {
        return '?' + res;
    } else {
        return '';
    }
}

export function buildProspectingQuery(router: XRouter) {
    let clauses: any[] = [];
    let ownerClauses: any[] = [];
    if (!router.query.pipeline) {
        clauses.push({ '$not': [{ isPublic: true }] });
        ownerClauses.push({ '$not': [{ isPublic: true }] });
    } else if (router.query.pipeline === 'public') {
        clauses.push({ isPublic: true });
        ownerClauses.push({ isPublic: true });
    } else if (router.query.pipeline === 'hpd') {
        clauses.push({ '$and': [{ isPublic: true }, { '$or': [{ ownerName: 'HPD NYC' }, { ownerName: 'hpd' }, { ownerName: 'Housing Preservation' }] }] });
        ownerClauses.push({ '$and': [{ isPublic: true }, { '$or': [{ ownerName: 'HPD NYC' }, { ownerName: 'hpd' }, { ownerName: 'Housing Preservation' }] }] });
    } else {
        clauses.push({ '$not': [{ isPublic: true }] });
        ownerClauses.push({ '$not': [{ isPublic: true }] });
    }
    if (router.query.owner) {
        clauses.push({ ownerName: router.query.owner });
    }

    let sort = router.query.sort ? { sort: router.query.sort } : {};
    let pub = router.query.pipeline ? { pipeline: router.query.pipeline } : {};
    // let query = qs.stringify(Object.assign({}, sort, pub));
    // let queryMap = qs.stringify(Object.assign({}, pub));
    // if (query.length > 0) {
    //     query = '?' + query;
    // }
    // if (queryMap.length > 0) {
    //     queryMap = '?' + queryMap;
    // }

    let q1 = buildQuery(clauses);
    let q2 = buildQuery(ownerClauses);
    return {
        query: q1 ? JSON.stringify(q1) : null,
        queryRaw: q1,
        ownerQuery: q2 ? JSON.stringify(q2) : null,

        qsReview: Object.assign({}, pub, sort),
        qsMap: Object.assign({}, pub)
    };
}