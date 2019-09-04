import * as React from 'react';
import { css, cx } from 'linaria';
import Select, {
    ReactSelectProps,
    Creatable,
    ValueComponentProps,
    ArrowRendererProps,
} from 'react-select';
import { TextLabel1, TextDensed, TextBody } from 'openland-web/utils/TextStyles';
import IcBack from 'openland-icons/s/ic-back-24.svg';
import IcClear from 'openland-icons/s/ic-close-16.svg';
import { UIcon } from './UIcon';

const style = css`
    &.Select {
        position: relative;
        background-color: var(--backgroundTertiary);
        border-radius: 8px;
    }
    &.Select input::-webkit-contacts-auto-fill-button,
    &.Select input::-webkit-credentials-auto-fill-button,
    &.Select input::-ms-clear,
    &.Select input::-ms-reveal {
        display: none !important;
    }
    &.Select,
    &.Select div,
    &.Select input,
    &.Select span {
        box-sizing: border-box;
    }
    &.Select.is-searchable.is-open > .Select-control,
    &.Select.is-searchable.is-focused:not(.is-open) > .Select-control {
        cursor: text;
    }
    &.Select.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
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
        color: var(--foregroundPrimary);
    }
    &.is-focused .Select-input > input {
        cursor: text;
    }
    &.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    &.Select--single.has-value .Select-input {
        padding-left: 0;
    }
    & .Select-control:not(.is-searchable) > .Select-input {
        outline: none;
    }
    & .Select-clear-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 40px;
    }
    & .Select-control > *:last-child {
        padding-right: 16px;
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

const withMenuStyle = css`
    &.Select.is-disabled .Select-arrow-zone {
        cursor: default;
        pointer-events: none;
        opacity: 0.35;
    }
    & .Select-arrow-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 25px;
        padding-right: 16px;
    }
    & .Select--rtl .Select-arrow-zone {
        padding-right: 0;
        padding-left: 5px;
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
`;

const hideMenuSelector = css`
    & .Select-menu-outer {
        display: none;
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
                <UIcon icon={<IcClear />} color="rgba(255, 255, 255, 0.5)" />
            </div>
        </div>
    </div>
);

const singleValueContainer = css`
    color: var(--foregroundPrimary);
    font-size: 15px;
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

const SingleValueRender = (props: ValueComponentProps) => {
    return <div className={singleValueContainer}>{props.value.label}</div>;
};

const ClearRender = () => (
    <div>
        <UIcon icon={<IcClear />} size={20} color="var(--foregroundTertiary)" />
    </div>
);

const arrowStyle = css`
    transform: rotate(-90deg);
`;

const arrowOpenStyle = css`
    transform: rotate(-270deg);
`;

const ArrowRender = (props: ArrowRendererProps) => {
    const isOpen = props.isOpen;
    return (
        <UIcon
            icon={<IcBack className={cx(arrowStyle, isOpen && arrowOpenStyle)} />}
            size={20}
            color="var(--foregroundTertiary)"
        />
    );
};

export type USelectBasicProps = ReactSelectProps & {
    options: OptionType[];
    invalid?: boolean;
    creatable?: boolean;
    hideSelector?: boolean;
};

export const USelect = React.memo((props: USelectBasicProps) => {
    const { creatable, onChange, ...other } = props;
    return (
        <>
            {props.creatable && (
                <Creatable
                    onChange={onChange}
                    clearRenderer={ClearRender}
                    optionRenderer={OptionRender}
                    className={cx(style, !props.hideSelector ? withMenuStyle : hideMenuSelector)}
                    arrowRenderer={!props.hideSelector ? ArrowRender : null}
                    valueComponent={props.multi ? MultiValueRender : SingleValueRender}
                    {...other}
                />
            )}
            {!props.creatable && (
                <Select
                    onChange={onChange}
                    clearRenderer={ClearRender}
                    optionRenderer={OptionRender}
                    className={cx(style, !props.hideSelector ? withMenuStyle : hideMenuSelector)}
                    arrowRenderer={!props.hideSelector ? ArrowRender : null}
                    valueComponent={props.multi ? MultiValueRender : SingleValueRender}
                    {...other}
                />
            )}
        </>
    );
});
