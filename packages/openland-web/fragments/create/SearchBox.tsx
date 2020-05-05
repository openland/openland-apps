import * as React from 'react';
import { USelect, OptionType } from 'openland-web/components/unicorn/USelect';

interface SearchBoxProps {
    value: OptionType[];
    onInputChange: (data: string) => void;
    onChange: (data: OptionType[] | null) => void;
    small?: boolean;
    multi?: boolean;
}

export const SearchBox = (props: SearchBoxProps) => (
    <USelect
        multi={props.multi !== undefined ? props.multi : true}
        hideSelector={true}
        size={props.small ? 'small' : undefined}
        label="Search"
        onInputChange={props.onInputChange}
        searchable={true}
        options={props.value || []}
        onChange={props.onChange}
        value={props.value}
    />
);
