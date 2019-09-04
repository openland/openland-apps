import * as React from 'react';
import { css, cx } from 'linaria';
import Select, { ReactSelectProps, Creatable, ValueComponentProps } from 'react-select';
import { TextLabel1, TextDensed, TextBody } from 'openland-web/utils/TextStyles';
import IcClose from 'openland-icons/s/ic-close-16.svg';
import { UIcon } from './UIcon';

const style = css`
    &.Select {
        position: relative;
        background-color: var(--backgroundTertiary);
        border-radius: 8px;
    }
    &.Select input::-webkit-contacts-auto-fill-button,
    &.Select input::-webkit-credentials-auto-fill-button {
        display: none !important;
    }
    &.Select input::-ms-clear {
        display: none !important;
    }
    &.Select input::-ms-reveal {
        display: none !important;
    }
    &.Select,
    &.Select div,
    &.Select input,
    &.Select span {
        box-sizing: border-box;
    }
    &.Select.is-disabled .Select-arrow-zone {
        cursor: default;
        pointer-events: none;
        opacity: 0.35;
    }
    &.Select.is-open > .Select-control .Select-arrow {
        top: -2px;
        border-color: transparent transparent #999;
        border-width: 0 5px 5px;
    }
    &.Select.is-searchable.is-open > .Select-control {
        cursor: text;
    }
    &.Select.is-searchable.is-focused:not(.is-open) > .Select-control {
        cursor: text;
    }
    &.Select.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    &.Select.is-open .Select-arrow,
    &.Select .Select-arrow-zone:hover > .Select-arrow {
        border-top-color: #666;
    }
    &.Select.Select--rtl {
        direction: rtl;
        text-align: right;
    }
    & .Select-control {
        height: 56px;
        cursor: default;
        display: table;
        outline: none;
        overflow: hidden;
        position: relative;
        width: 100%;
    }
    & .Select-control .Select-input:focus {
        outline: none;
    }
    & .Select-placeholder {
        color: var(--foregroundTertiary);
        line-height: 56px;
        font-size: 15px;
        padding-left: 16px;
        padding-right: 16px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    & .Select-input {
        display: inline-block;
        height: 56px;
        padding-left: 16px;
        padding-right: 16px;
        vertical-align: middle;
    }
    & .Select-input > input {
        height: 100%;
        width: 100%;
        background: none transparent;
        border: 0 none;
        box-shadow: none;
        cursor: default;
        display: inline-block;
        font-family: inherit;
        font-size: inherit;
        margin: 0;
        outline: none;
        -webkit-appearance: none;
        
        //inputttt
        
        font-size: 15px;
        color: var(--foregroundTertiary);
    }
    &.is-focused .Select-input > input {
        cursor: text;
    }
    &.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    & .Select-control:not(.is-searchable) > .Select-input {
        outline: none;
    }
    & .Select-loading-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 16px;
    }
    & .Select-loading {
        animation: Select-animation-spin 400ms infinite linear;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #ccc;
        border-right-color: #333;
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }
    & .Select-clear-zone {
        animation: Select-animation-fadeIn 200ms;
        color: #999;
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 17px;
    }
    & .Select-clear-zone:hover {
        color: #d0021b;
    }
    & .Select-clear {
        display: inline-block;
        font-size: 18px;
        line-height: 1;
    }
    &.Select--multi .Select-clear-zone {
        width: 17px;
    }
    & .Select-arrow-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 25px;
        padding-right: 5px;
    }
    & .Select--rtl .Select-arrow-zone {
        padding-right: 0;
        padding-left: 5px;
    }
    & .Select-arrow {
        border-color: #999 transparent transparent;
        border-style: solid;
        border-width: 5px 5px 2.5px;
        display: inline-block;
        height: 0;
        width: 0;
        position: relative;
    }
    & .Select-control > *:last-child {
        padding-right: 5px;
    }
    & .Select-multi-value-wrapper {
        height: 100%;
    }
    &.Select--multi .Select-multi-value-wrapper {
        height: 100%;
        display: inline-block;
        padding-top: 4px;
    }
    &.Select .Select-aria-only {
        position: absolute;
        display: inline-block;
        height: 1px;
        width: 1px;
        margin: -1px;
        clip: rect(0, 0, 0, 0);
        overflow: hidden;
        float: left;
    }
    @keyframes Select-animation-fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    & .Select-menu-outer {
        background-color: #fff;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
        border-radius: 8px;
        max-height: 200px;
        position: absolute;
        left: 0;
        top: calc(100% + 8px);
        width: 100%;
        z-index: 1;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
    }
    & .Select-menu {
        padding: 8px 0;
        max-height: 198px;
        overflow-y: auto;
    }
    & .Select-option {
        box-sizing: border-box;
        background-color: #fff;
        color: #666666;
        cursor: pointer;
        display: block;
    }
    & .Select-option.is-selected {
        background-color: var(--backgroundPrimaryHover);
    }
    & .Select-option.is-focused {
        background-color: var(--backgroundPrimaryHover);
    }
    & .Select-option.is-disabled {
        opacity: 0.5;
        cursor: default;
    }
    & .Select-noresults {
        box-sizing: border-box;
        color: var(--foregroundPrimary);
        opacity: 0.5;
        cursor: default;
        display: block;
        padding: 8px 10px;
    }
    &.Select--multi .Select-input {
        vertical-align: middle;
        margin-left: 10px;
        margin-top: -4px;
        padding: 0;
    }
    &.Select--multi.Select--rtl .Select-input {
        margin-left: 0;
        margin-right: 10px;
    }
    &.Select--multi.has-value .Select-input {
        margin-left: 5px;
    }
`;

const optionContainer = css`
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
`;

const optionShortContainer = css`
    height: 40px;
`;

const optionLabelStyle = css`
    color: var(--foregroundPrimary);
`;

const optionSubtitleStyle = css`
    margin-top: 4px;
    color: var(--foregroundSecondary);
`;

interface OptionType<T = string | number | boolean> {
    value: T;
    label: string;
    labelShort?: string;
    subtitle?: string;
}

const OptionRender = (option: OptionType) => {
    if (option.subtitle && option.labelShort) {
        return (
            <div className={optionContainer}>
                <div className={cx(TextLabel1, optionLabelStyle)}>{option.label}</div>
                <div className={cx(TextDensed, optionSubtitleStyle)}>{option.subtitle}</div>
            </div>
        );
    }
    return (
        <div className={cx(optionContainer, optionShortContainer)}>
            <div className={cx(TextLabel1, optionLabelStyle)}>{option.label}</div>
        </div>
    );
};

const multiValueContainer = css`
    background-color: var(--accentPrimary);
    border-radius: 8px;
    color: #fff;
    display: inline-block;
    margin-left: 8px;
    margin-top: 8px;
    vertical-align: top;
    padding: 4px 8px 4px 12px;
`;

const multiValueContent = css`
    display: flex;
    align-items: center;
`;

const multiValueIcon = css`
    padding-top: 2px;
    margin-left: 4px;
    cursor: pointer;
    &:hover svg {
        path {
            fill: #fff;
        }
    }
`;

const MultiValueRender = (props: ValueComponentProps) => (
    <div className={cx(multiValueContainer, TextBody)}>
        <div className={multiValueContent}>
            {props.value.label}
            <div onClick={() => props.onRemove!!(props.value)} className={multiValueIcon}>
                <UIcon icon={<IcClose />} color="rgba(255, 255, 255, 0.5)" />
            </div>
        </div>
    </div>
);

const singleValueContainer = css`
    color: #aaa;
    line-height: 56px;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    float: left;
`;

const ValueRender = (props: ValueComponentProps) => {
    return <div className={singleValueContainer}>{props.value.label}</div>;
};

export type USelectBasicProps = ReactSelectProps & {
    options: OptionType[];
    invalid?: boolean;
    creatable?: boolean;
};

export const USelect = React.memo((props: USelectBasicProps) => {
    const { creatable, onChange, ...other } = props;
    return (
        <>
            {props.creatable && (
                <Creatable
                    className={style}
                    onChange={onChange}
                    optionRenderer={OptionRender}
                    valueComponent={props.multi ? MultiValueRender : ValueRender}
                    {...other}
                />
            )}
            {!props.creatable && (
                <Select
                    className={style}
                    onChange={onChange}
                    optionRenderer={OptionRender}
                    valueComponent={props.multi ? MultiValueRender : ValueRender}
                    {...other}
                />
            )}
        </>
    );
});
