/* tslint:disable */
export class GraphqlTypedQuery<QUERY, VARIABLES> {
    document: any;
    ____vars?: VARIABLES;
    ____query?: QUERY;
    constructor(document: QUERY) {
        this.document = document;
    }
}

export class GraphqlTypedMutation<QUERY, VARIABLES> {
    document: any;
    ____vars?: VARIABLES;
    ____query?: QUERY;
    constructor(document: any) {
        this.document = document;
    }
}

export function typedQuery<QUERY, VARIABLES>(query: any) {
    return new GraphqlTypedQuery<QUERY, VARIABLES>(query);
}

export function typedMutation<MUTATION, VARIABLES>(mutation: MUTATION) {
    return new GraphqlTypedMutation<MUTATION, VARIABLES>(mutation);
}