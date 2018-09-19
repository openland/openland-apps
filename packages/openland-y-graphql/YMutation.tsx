import * as React from 'react';
import { GraphqlTypedMutation, GraphqlTypedQuery } from './typed';
import { Mutation, MutationFn } from 'react-apollo';

export interface YMutationProps<MUTATION, VARIABLES> {
    refetchQueries?: GraphqlTypedQuery<any, any>[];
    refetchQueriesVars?: { query: GraphqlTypedQuery<any, any>, variables?: any }[];
    mutation: GraphqlTypedMutation<MUTATION, VARIABLES>;
    variables?: VARIABLES;
    children: (mutation: MutationFn<MUTATION, VARIABLES>) => React.ReactNode;
}

export class YMutation<QUERY, VARIABLES> extends React.PureComponent<YMutationProps<QUERY, VARIABLES>> {
    render() {
        return (
            <Mutation
                mutation={this.props.mutation.document}
                variables={this.props.variables}
                refetchQueries={this.props.refetchQueries ? this.props.refetchQueries.map((v) => ({ query: v.document })) : this.props.refetchQueriesVars ? this.props.refetchQueriesVars.map((v) => ({ query: v.query.document, variables: v.variables })) : undefined}
            >
                {this.props.children}
            </Mutation>
        );
    }
}