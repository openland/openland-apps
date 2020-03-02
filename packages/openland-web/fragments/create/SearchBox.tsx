import * as React from 'react';
import { USelect } from 'openland-web/components/unicorn/USelect';

interface SearchBoxProps {
    value: { label: string; value: string }[];
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
    small?: boolean;
    multi?: boolean;
}

export const SearchBox = (props: SearchBoxProps) => (
    <USelect
        multi={props.multi !== undefined ? props.multi : true}
        hideSelector={true}
        size={props.small ? 'small' : undefined}
        placeholder="Search"
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onInputChange={props.onInputChange}
        options={props.value || []}
        onChange={props.onChange}
        value={props.value}
    />
);
