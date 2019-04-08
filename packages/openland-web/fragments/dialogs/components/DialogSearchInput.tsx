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
    & svg > path,
    &:focus-within svg > path,
    &:focus svg > path {
        fill: #b0b2b3 !important;
    }
    & a {
        top: calc(50% - 10px) !important;
        width: 20px;
        height: 20px;
    }
    & a > svg {
        width: 20px;
        height: 20px;
    }
    &:focus-within,
    &:focus {
        box-shadow: none !important;
    }
    &:focus-within input,
    &:focus input {
        background-color: #eceef0;
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
        caret-color: #1790ff;
        padding-bottom: 3px;
    }
    > .icon {
        left: 12px !important;
    }
    & .icon svg path:last-child {
        fill: #b0b2b3 !important;
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
