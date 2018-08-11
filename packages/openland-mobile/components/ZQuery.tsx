import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { ZLoader } from './ZLoader';
import { FetchPolicy } from 'apollo-client';
import { Alert } from 'react-native';

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
                    // console.log(resp);
                    if (resp.error) {
                        Alert.alert(resp.error!!.message);
                    }
                    if ((resp.loading || !resp.data) && (resp.networkStatus !== 2)) {
                        return <ZLoader />;
                    }
                    return this.props.children(resp);
                }}
            </Query>
        );
    }
}