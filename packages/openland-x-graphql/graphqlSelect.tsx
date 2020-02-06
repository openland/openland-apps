import * as React from 'react';
import { XSelectAsync } from 'openland-x/XSelect';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { useClient } from 'openland-web/utils/useClient';

export function graphqlSelect<V = {}>(query: GraphqlTypedQuery<any, any>) {
    return (
        props: {
            onChange: (value: any) => void;
            value: string;
        } & { variables?: V }, // &  Partial<XSelectAsyncProps>
    ) => {
        let client = useClient();
        return (
            <XSelectAsync
                {...props}
                loadOptions={async (input: string) => {
                    let vars = { query: input };
                    if (props.variables) {
                        vars = { query: input, ...(props.variables as any) };
                    }
                    let res = await client.client.query(query, vars);
                    let items = (res as any).items as [
                        { id: string; title: string; subtitle?: string | null } | string
                    ];
                    let opts = items.map(v => {
                        if (typeof v === 'string') {
                            return { value: v, label: v, _obj: v };
                        } else {
                            return {
                                value: v.id,
                                label: v.subtitle ? v.title + ' (' + v.subtitle + ')' : v.title,
                                _obj: v,
                            };
                        }
                    });
                    return {
                        options: opts,
                    };
                }}
                filterOptions={options => options}
                onChange={value => props.onChange(value)}
                value={props.value || 'unknown'}
            />
        );
    };
}
