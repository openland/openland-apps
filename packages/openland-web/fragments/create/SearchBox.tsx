import * as React from 'react';
import { USelect } from 'openland-web/components/unicorn/USelect';

interface SearchBoxProps {
    value: { label: string; value: string }[];
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
}

export const SearchBox = (props: SearchBoxProps) => (
    <USelect
        multi
        hideSelector
        placeholder="Search"
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onInputChange={props.onInputChange}
        options={props.value || []}
        onChange={props.onChange}
        value={props.value}
    />
);