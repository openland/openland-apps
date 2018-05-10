/* tslint:disable */
export class GraphqlTypedQuery<QUERY, VARIABLES> {
    query: QUERY;
    ____vars: VARIABLES;
    constructor(query: QUERY) {
        this.query = query;
    }
}

export class GraphqlTypedMutation<QUERY, VARIABLES> {
    query: QUERY;
    ____vars: VARIABLES;
    constructor(query: QUERY) {
        this.query = query;
    }
}

export function typedQuery<QUERY, VARIABLES>(query: QUERY) {
    return new GraphqlTypedQuery<QUERY, VARIABLES>(query);
}

export function typedMutation<MUTATION, VARIABLES>(mutation: MUTATION) {
    return new GraphqlTypedMutation<MUTATION, VARIABLES>(mutation);
}