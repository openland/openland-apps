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
    height: 40px !important;
    & svg > path,
    &:focus-within svg > path,
    &:focus svg > path {
        fill: #78808F !important;
    }
    & a {
        top: calc(50% - 10px) !important;
        width: 20px;
        height: 20px;
    }
    & a > svg {
        width: 10px;
        height: 10px;
    }
    &:focus-within,
    &:focus {
        box-shadow: none !important;
    }
    &:focus-within input,
    &:focus input {
        background-color: #F0F2F5;
    }
    & .input-placeholder,
    & input {
        font-size: 15px;
        font-weight: 500;
        color: #78808F;
        padding-left: 33px;
    }
    & input {
        background-color: #F0F2F5;
        border-radius: 10px;
        padding-bottom: 3px;
    }
    > .icon {
        left: 12px !important;
    }
    & .icon svg path:last-child {
        fill: #78808F !important;
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
