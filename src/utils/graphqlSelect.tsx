import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DocumentNode } from 'graphql';
import { XSelectAsync, XSelectAsyncProps } from '../components/X/XSelect';
import { ApolloClient } from 'apollo-client';

export function graphqlSelect(document: DocumentNode) {
    return class XSelectGraphQL extends React.Component<Partial<XSelectAsyncProps>> {
        static contextTypes = {
            client: PropTypes.object.isRequired,
        };
        loadOptions = async (input: string) => {
            let client: ApolloClient<{}> = this.context.client;
            let res = await client.query({ query: document, variables: { query: input } });
            let items = (res.data as any).items as [{ id: string, title: string, subtitle?: string | null }];
            let opts = items.map((v) => ({ value: v.id, label: v.subtitle ? v.title + ' (' + v.subtitle + ')' : v.title }));
            return {
                options: opts
            };
        }

        render() {
            return <XSelectAsync {...this.props} loadOptions={this.loadOptions} filterOptions={(options) => options} />;
        }
    };
}