import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { ZLoader } from './ZLoader';
import { FetchPolicy } from 'apollo-client';

export interface ZQueryProps<QUERY, VARIABLES> {
    query: GraphqlTypedQuery<QUERY, VARIABLES>;
    variables?: VARIABLES;
    fetchPolicy?: FetchPolicy;
    children: (result: QueryResult<QUERY, VARIABLES> & { data: QUERY }) => React.ReactNode;
}

export class ZQuery<QUERY, VARIABLES> extends React.PureComponent<ZQueryProps<QUERY, VARIABLES>> {
    render() {
        return (
            <Query query={this.props.query.document} variables={this.props.variables} fetchPolicy={this.props.fetchPolicy}>
                {(resp) => {
                    if (resp.loading || !resp.data) {
                        return <ZLoader />;
                    }
                    return this.props.children(resp);
                }}
            </Query>
        );
    }
}