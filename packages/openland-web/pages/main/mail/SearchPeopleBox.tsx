import * as React from 'react';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XSelect } from 'openland-x/XSelect';

interface SearchPeopleBoxProps {
    value: { label: string; value: string }[] | null;
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
}

export const SearchPeopleBox = (props: SearchPeopleBoxProps) => (
    <XSelect
        multi={true}
        render={
            <XSelectCustomUsersRender
                popper={false}
                placeholder="Search"
                onInputChange={props.onInputChange}
                onChange={data => props.onChange(data as any)}
                options={props.value || []}
                value={props.value || []}
            />
        }
    />
);
