import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XSelectAsync, XSelectAsyncProps } from 'openland-x/XSelect';
import { ApolloClient } from 'apollo-client';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';

export function graphqlSelect<V = {}>(query: GraphqlTypedQuery<any, any>) {
    return class XSelectGraphQL extends React.Component<Partial<XSelectAsyncProps> & { variables?: V }> {
        static contextTypes = {
            client: PropTypes.object.isRequired,
        };
        loadOptions = async (input: string) => {
            let client: ApolloClient<{}> = this.context.client;
            let vars = { query: input };
            if (this.props.variables) {
                vars = { query: input, ...(this.props.variables as any) };
            }
            let res = await client.query({ query: query.document, variables: vars });
            let items = (res.data as any).items as [{ id: string, title: string, subtitle?: string | null } | string];
            let opts = items.map((v) => {
                if (typeof v === 'string') {
                    return { value: v, label: v, _obj: v };
                } else {
                    return { value: v.id, label: v.subtitle ? v.title + ' (' + v.subtitle + ')' : v.title, _obj: v };
                }
            });
            return {
                options: opts
            };
        }

        render() {
            return <XSelectAsync {...this.props} loadOptions={this.loadOptions} filterOptions={(options) => options} />;
        }
    };
}