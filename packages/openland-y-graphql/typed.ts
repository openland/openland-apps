/* tslint:disable */
export class GraphqlTypedQuery<QUERY, VARIABLES> {
    document: any;
    ____vars?: VARIABLES;
    ____query?: QUERY;
    constructor(document: QUERY) {
        this.document = document;
    }
}

export class GraphqlTypedFragment<FRAGMENT> {
    document: any;
    ____query?: FRAGMENT;
    constructor(document: FRAGMENT) {
        this.document = document;
    }
}

export class GraphqlTypedSubscription<SUBSCRIPTION, VARIABLES> {
    document: any;
    ____vars?: VARIABLES;
    ____query?: SUBSCRIPTION;
    constructor(document: SUBSCRIPTION) {
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

export function typedSubscription<SUBSCRIPTION, VARIABLES>(subscription: SUBSCRIPTION) {
    return new GraphqlTypedSubscription<SUBSCRIPTION, VARIABLES>(subscription);
}

export function typedFragment<FRAGMENT>(fragment: FRAGMENT) {
    return new GraphqlTypedFragment<FRAGMENT>(fragment);
}