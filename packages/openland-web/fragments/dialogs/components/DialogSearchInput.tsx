import * as React from 'react';
import { css } from 'linaria';
import { XInputProps, XInput } from 'openland-x/XInput';
import SearchIcon from 'openland-icons/ic-search-small.svg';

let searchStyle = css`
    border-color: transparent !important;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 5px;
    margin-bottom: 12px;
    height: 36px !important;
    & svg > path {
        fill: #c8c8c8;
    }
    &:focus-within,
    &:focus {
        box-shadow: none !important;
    }
    &:focus-within svg > path {
        fill: rgba(23, 144, 255, 0.5);
    }
    & .input-placeholder,
    & input {
        padding-left: 33px;
    }
    & input {
        background-color: #f6f6f6;
        border-radius: 10px;
    }
    > .icon {
        left: 12px !important;
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
