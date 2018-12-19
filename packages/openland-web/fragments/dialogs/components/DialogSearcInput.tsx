import * as React from 'react';
import { css } from 'linaria';
import { XInputProps, XInput } from 'openland-x/XInput';
import SearchIcon from '../../../components/icons/ic-search-small.svg';

let searchStyle = css`
    margin-left: 16px;
    margin-righ: 16px;
    margin-top: 5px;
    margin-bottom: 12px;
    height: 36px;
    & svg > g > path:last-child {
        fill: #c8c8c8;
    }
    &:focus-within svg > g > path:last-child {
        fill: rgba(23, 144, 255, 0.5);
    }
    & .input-placeholder, & input {
        padding-left: 33px;
    }  
    > .icom {
        left: 12px;
    }
`;

export const DialogSearchInput = React.forwardRef<XInput, XInputProps>((props, ref) => {
    return (
        <XInput
            ref={ref}
            className={searchStyle}
            size="large"
            placeholder="Search"
            icon={<SearchIcon />}
            cleanable={true}
            {...props}
        />
    );
});