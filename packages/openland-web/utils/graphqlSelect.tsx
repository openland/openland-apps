import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DocumentNode } from 'graphql';
import { XSelectAsync, XSelectAsyncProps } from 'openland-x/XSelect';
import { ApolloClient } from 'apollo-client';

export function graphqlSelect<V = {}>(document: DocumentNode) {
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
            let res = await client.query({ query: document, variables: vars });
            let items = (res.data as any).items as [{ id: string, title: string, subtitle?: string | null } | string];
            let opts = items.map((v) => {
                if (typeof v === 'string') {
                    return { value: v, label: v };
                } else {
                    return { value: v.id, label: v.subtitle ? v.title + ' (' + v.subtitle + ')' : v.title };
                }
            }
            );
            return {
                options: opts
            };
        }

        render() {
            return <XSelectAsync {...this.props} loadOptions={this.loadOptions} filterOptions={(options) => options} />;
        }
    };
}