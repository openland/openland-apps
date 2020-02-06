import * as React from 'react';
import { XSelectAsync } from 'openland-x/XSelect';
import { useClient } from 'openland-web/utils/useClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';

export function graphqlSelect(query: (query: string, src: OpenlandClient) => Promise<any>) {
    return (
        props: {
            onChange: (value: any) => void;
            value: string;
        }
    ) => {
        let client = useClient();
        return (
            <XSelectAsync
                {...props}
                loadOptions={async (input: string) => {
                    let res = await query(input, client);
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
