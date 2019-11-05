import * as React from 'react';
import { css, cx } from 'linaria';
import { XInputProps, XInput } from 'openland-x/XInput';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcSearch from 'openland-icons/s/ic-search-16.svg';

let searchStyle = css`
    border: none !important;
    border-color: transparent !important;
    margin: 0 16px 16px;
    height: 40px !important;
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
        background-color: var(--backgroundSecondaryActive);
    }
    & .input-placeholder,
    & input {
        font-size: 15px;
        color: var(--foregroundTertiary);
        padding-left: 36px;
    }
    & input {
        background-color: var(--backgroundSecondaryActive);
        border-radius: 8px;
        padding-bottom: 3px;
        color: var(--foregroundPrimary);
    }
    > .icon {
        left: 12px !important;
        top: calc(50% - 8px) !important;
    }
`;

let marginInModalClass = css`
    margin: 8px 23px 12px;
`;

export const DialogSearchInput = React.forwardRef<XInput, XInputProps & { modal?: boolean }>(
    (props, ref) => {
        return (
            <XInput
                ref={ref}
                className={cx(searchStyle, props.modal && marginInModalClass)}
                size="large"
                placeholder="Search"
                icon={<UIcon icon={<IcSearch />} color="var(--foregroundTertiary)" />}
                cleanable={true}
                {...props}
            />
        );
    },
);
