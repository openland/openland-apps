import * as React from 'react';
import { GraphqlTypedQuery } from './typed';
import { Query, QueryResult } from 'react-apollo';

export interface YQueryProps<QUERY, VARIABLES> {
    retry?: boolean;
    query: GraphqlTypedQuery<QUERY, VARIABLES>;
    variables?: VARIABLES;
    children: (result: QueryResult<QUERY, VARIABLES>) => React.ReactNode;
}

export class YQuery<QUERY, VARIABLES> extends React.PureComponent<YQueryProps<QUERY, VARIABLES>> {
    render() {
        return (
            <Query query={this.props.query.document} variables={this.props.variables}>
                {this.props.children}
            </Query>
        );
    }
}