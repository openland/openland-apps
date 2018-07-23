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

export class GraphqlTypedTask<QUERY, VARIABLES, RESULT> {
    document: any;
    ____vars?: VARIABLES;
    ____query?: QUERY;
    ____result?: RESULT;
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

export function typedTask<MUTATION, VARIABLES, RESULT>(mutation: MUTATION) {
    return new GraphqlTypedTask<MUTATION, VARIABLES, RESULT>(mutation);
}