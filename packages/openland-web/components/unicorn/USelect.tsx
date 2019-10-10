import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
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
import { FormField } from 'openland-form/useField';

const style = css`
    &.Select {
        display: flex;
        flex-shrink: 1;
        flex-grow: 1;
        position: relative;
        background-color: var(--backgroundTertiary);
        border-radius: 8px;
        max-width: 100%;
    }
    &.Select input::-webkit-contacts-auto-fill-button,
    &.Select input::-webkit-credentials-auto-fill-button,
    &.Select input::-ms-clear,
    &.Select input::-ms-reveal {
        display: none !important;
    }
    &.Select.is-searchable.is-open > .Select-control,
    &.Select.is-searchable.is-focused:not(.is-open) > .Select-control {
        cursor: text;
    }
    &.Select.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    & .Select-control {
        display: flex;
        align-items: center;
        flex-grow: 1;
        flex-shrink: 1;
        padding: 6px 16px;
        min-height: 56px;
        cursor: default;
        overflow: hidden;
        position: relative;
    }
    & .Select-input {
        display: flex;
        flex-grow: 1;
        flex-shrink: 1;
    }
    & .Select-input > input {
        background: none transparent;
        border: 0 none;
        box-shadow: none;
        cursor: default;
        display: flex;
        flex-grow: 1;
        flex-shrink: 1;
        font-family: inherit;
        margin: 0;
        outline: none;
        font-size: 15px;
        color: var(--foregroundPrimary);
        -webkit-appearance: none;
    }
    &.is-focused .Select-input > input {
        cursor: text;
    }
    &.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    & .Select-clear-zone {
        cursor: pointer;
        display: flex;
        flex-shrink: 0;
        align-self: center;
        align-items: center;
        justify-content: center;
        position: relative;
        max-width: 40px;
        max-height: 40px;
    }
    & .Select-multi-value-wrapper {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
        flex-shrink: 1;
        align-items: center;
        overflow: hidden;
    }
    &.Select--multi.has-value .Select-multi-value-wrapper {
        margin-left: -4px;
    }
    &.Select .Select-aria-only {
        display: none;
    }
    &.Select--multi.has-value .Select-input {
        margin-left: 5px;
    }
`;

const placeholderMultiStyle = css`
    &.Select--multi .Select-placeholder {
        color: var(--foregroundTertiary);
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: absolute;
        max-width: 100%;
    }
`;

const placeholderSingleStyle = css`
    &.Select--single .Select-placeholder {
        display: none;
    }
    &.Select--single + .Stranger-placeholder {
        color: var(--foregroundTertiary);
        pointer-events: none;
        font-size: 15px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.15s ease;
        max-width: 100%;
        position: absolute;
        top: 14px;
        left: 16px;
    }
    &.Select--single.is-searchable.is-focused + .Stranger-placeholder,
    &.Select--single.has-value + .Stranger-placeholder {
        font-size: 13px;
        line-height: 18px;
        color: var(--foregroundTertiary);
        top: 8px;
    }

    &.Select--single.has-value .Select-multi-value-wrapper,
    &.Select--single.is-searchable .Select-multi-value-wrapper {
        margin-top: 18px;
    }
`;

const smallStyle = css`
    & .Select-control {
        padding: 2px 8px;
        min-height: 40px;
    }

    &.Select--single + .Stranger-placeholder {
        top: 8px;
        left: 8px;
    }
    &.Select--single.is-searchable.is-focused + .Stranger-placeholder,
    &.Select--single.has-value + .Stranger-placeholder {
        top: 2px;
    }

    &.Select--single.has-value .Select-multi-value-wrapper,
    &.Select--single.is-searchable .Select-multi-value-wrapper {
        margin-top: 12px;
    }
`;

const Placeholder = (props: { placeholder?: string }) => (
    <div className="Stranger-placeholder">{props.placeholder}</div>
);

const withMenuStyle = css`
    &.Select.is-disabled .Select-arrow-zone {
        cursor: default;
        pointer-events: none;
        opacity: 0.35;
    }
    & .Select-arrow-zone {
        cursor: pointer;
        display: flex;
        flex-shrink: 0;
        align-self: center;
        align-items: center;
        justify-content: center;
        position: relative;
        max-width: 40px;
        max-height: 40px;
    }
    & .Select-menu-outer {
        background-color: #fff;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        max-height: 200px;
        position: absolute;
        left: 0;
        margin-top: 8px;
        top: 100%;
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
    min-height: 40px;
`;

const optionLabelStyle = css`
    color: var(--foregroundPrimary);
    word-wrap: break-word;
`;

const optionSubtitleStyle = css`
    margin-top: 4px;
    color: var(--foregroundSecondary);
`;

interface OptionType<T = string | number | boolean | undefined> {
    value: T;
    label: string;
    labelShort?: string | null;
    subtitle?: string | null;
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
    display: flex;
    margin: 4px;
    padding: 4px 8px 4px 12px;
`;

const multiValueSmallContainer = css`
    padding: 0px 8px 0px 8px;
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

interface ValueRenderProps extends ValueComponentProps {
    size?: 'default' | 'small';
}

const MultiValueRender = (props: ValueRenderProps) => (
    <div
        className={cx(
            multiValueContainer,
            props.size === 'small' && multiValueSmallContainer,
            TextBody,
        )}
    >
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    flex-shrink: 1;
`;

const SingleValueRender = (props: ValueRenderProps) => {
    return (
        <div className={singleValueContainer}>
            {props.value.labelShort ? props.value.labelShort : props.value.label}
        </div>
    );
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

interface ContainerProps {
    flexGrow?: number | null;
    flexShrink?: number | null;
    flexBasis?: number | null;
    minHeight?: number | string | null;
    minWidth?: number | string | null;
    maxHeight?: number | string | null;
    maxWidth?: number | string | null;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
}

const Container = (props: ContainerProps & { children: any }) => (
    <XView {...props}>{props.children}</XView>
);

export type USelectBasicProps = ReactSelectProps &
    ContainerProps & {
        size?: 'default' | 'small';
        options: OptionType[];
        placeholder?: string;
        creatable?: boolean;
        hideSelector?: boolean;
    };

export const USelect = (props: USelectBasicProps) => {
    const { creatable, hideSelector, size = 'default', ...other } = props;
    return (
        <>
            {props.creatable && (
                <Container {...other}>
                    <Creatable
                        clearRenderer={ClearRender}
                        optionRenderer={props.optionRenderer ? props.optionRenderer : OptionRender}
                        arrowRenderer={!hideSelector ? ArrowRender : null}
                        valueComponent={valueProps =>
                            props.multi ? (
                                <MultiValueRender size={size} {...valueProps} />
                            ) : (
                                <SingleValueRender size={size} {...valueProps} />
                            )
                        }
                        clearable={props.clearable || false}
                        className={cx(
                            style,
                            props.size === 'small' && smallStyle,
                            !hideSelector ? withMenuStyle : hideMenuSelector,
                            props.multi && placeholderMultiStyle,
                            !props.multi && placeholderSingleStyle,
                        )}
                        {...other}
                    />
                    {!props.multi && <Placeholder placeholder={props.placeholder} />}
                </Container>
            )}
            {!props.creatable && (
                <Container {...other}>
                    <Select
                        clearRenderer={ClearRender}
                        optionRenderer={props.optionRenderer ? props.optionRenderer : OptionRender}
                        arrowRenderer={!hideSelector ? ArrowRender : null}
                        valueComponent={valueProps =>
                            props.multi ? (
                                <MultiValueRender size={size} {...valueProps} />
                            ) : (
                                <SingleValueRender size={size} {...valueProps} />
                            )
                        }
                        clearable={props.clearable || false}
                        className={cx(
                            style,
                            props.size === 'small' && smallStyle,
                            !hideSelector ? withMenuStyle : hideMenuSelector,
                            props.multi && placeholderMultiStyle,
                            !props.multi && placeholderSingleStyle,
                        )}
                        {...other}
                    />
                    {!props.multi && <Placeholder placeholder={props.placeholder} />}
                </Container>
            )}
        </>
    );
};

export const USelectField = (
    props: USelectBasicProps & { field: FormField<OptionType> },
) => {
    const { field, ...other } = props;
    return (
        <USelect
            onChange={(val: OptionType | any) => {
                field.input.onChange(val ? (val.value ? val.value : val) : null);
            }}
            value={field.input.value}
            {...other}
        />
    );
};
