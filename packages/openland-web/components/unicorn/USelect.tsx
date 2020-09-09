import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import Select, {
    components,
    OptionProps,
    IndicatorProps,
    StylesConfig,
    InputActionMeta,
    MultiValueProps,
    ValueType,
    MenuListComponentProps,
} from 'react-select';
import { emoji } from 'openland-y-utils/emoji';
import { FormField } from 'openland-form/useField';
import { TextStyles, TextBody, TextDensed, TextLabel1 } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcClear from 'openland-icons/s/ic-close-16.svg';
import IcDropdown from 'openland-icons/s/ic-dropdown-16.svg';
import IcCheck from 'openland-icons/s/ic-done-new-16.svg';
import { FixedSizeList } from 'react-window';

type USelectSize = 'small' | 'default';

interface CustomStylesConfig {
    size: USelectSize;
    withCustomPlaceholder: boolean;
    hideSelector: boolean;
    optionRender: boolean;
}

const customStyles = (config: CustomStylesConfig) =>
    ({
        control: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
            backgroundColor: 'var(--backgroundTertiaryTrans)',
            '&:hover': {
                backgroundColor: 'var(--backgroundTertiaryHoverTrans)',
            },
            padding: state.isMulti ? '0px 16px' : '8px 16px',
            paddingLeft: state.isMulti && state.hasValue ? 4 : undefined,
            transition: 'none',
            boxShadow: 'none',
            border: 'none',
            borderRadius: 8,
            minHeight: config.size === 'default' ? 56 : 40,
        }),
        container: (styles) => ({
            ...styles,
        }),
        valueContainer: (styles) => ({
            ...styles,
            padding: 0,
            marginTop: config.withCustomPlaceholder ? 16 : undefined,
            overflow: config.withCustomPlaceholder ? 'visible' : undefined,
        }),
        input: (style) => ({
            ...style,
            ...TextStyles.Body,
            color: 'var(--foregroundPrimary)',
            paddingTop: 0,
            paddingBottom: 4,
            margin: 0,
        }),
        placeholder: (styles) => ({
            ...styles,
            ...TextStyles.Body,
            color: 'var(--foregroundTertiary)',
            marginRight: 0,
            marginLeft: 0,
            display: config.withCustomPlaceholder ? 'none' : undefined,
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            padding: 0,
            display: config.hideSelector ? 'none' : undefined,
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        indicatorsContainer: (styles) => ({
            ...styles,
        }),
        multiValue: (styles) => ({
            ...styles,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 4,
            borderRadius: 4,
            backgroundColor: 'var(--accentPrimary)',
            padding: '3px 8px',
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            ...TextStyles.Caption,
            padding: 0,
            paddingLeft: 0,
            color: '#fff',
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 4,
            color: '#fff',
            opacity: 0.84,
            '&:hover': {
                backgroundColor: 'var(--accentPrimary)',
                color: '#fff',
                opacity: 1,
            },
        }),
        menu: (styles) => ({
            ...styles,
            boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08)',
            borderRadius: 8,
            display: config.hideSelector ? 'none' : undefined,
        }),
        menuPortal: (styles) => ({
            ...styles,
            zIndex: 5,
        }),
        menuList: (styles) => ({
            ...styles,
            paddingTop: 8,
            paddingBottom: 8,
        }),
        option: (styles, state: any) => ({
            ...TextStyles.Body,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'var(--foregroundPrimary)',
            padding: config.size === 'small' ? '8px 16px' : '6px 16px',
            backgroundColor: state.isFocused ? 'var(--backgroundPrimaryHover)' : undefined,
            paddingLeft: config.optionRender ? 0 : undefined,
            paddingTop: config.optionRender ? 0 : undefined,
            paddingBottom: config.optionRender ? 0 : undefined,
            minHeight: 40,
            '& > div *': {
                pointerEvents: 'none',
            },
        }),
        singleValue: (styles) => ({
            ...styles,
            ...TextStyles.Body,
            color: 'var(--foregroundPrimary)',
            marginLeft: 0,
            marginRight: 0,
        }),
    } as StylesConfig);

const placeholderStyle = css`
    pointer-events: none;
    position: absolute;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 15px;
    color: var(--foregroundTertiary);
    line-height: 24px;
    top: 14px;
    transition: all 0.15s ease;
`;

const placeholderValueStyle = css`
    font-size: 13px;
    line-height: 18px;
    color: var(--foregroundSecondary);
    top: 8px;
`;

const placeholderInvalidStyle = css`
    color: var(--accentNegative) !important;
`;

type AnyObject = { [key: string]: any };

export type OptionType = {
    value: string | number | boolean | null | undefined;
    label: string | number | boolean | undefined;
    labelShort?: string;
    subtitle?: string;
} & AnyObject;

const arrowStyle = css`
    transform: rotate(0deg);
`;

const arrowOpenStyle = css`
    transform: rotate(180deg);
`;

const DropdownIndicatorComponent = (props: IndicatorProps<OptionType>) => (
    <components.DropdownIndicator {...props}>
        <UIcon
            icon={
                <IcDropdown
                    className={cx(arrowStyle, props.selectProps.menuIsOpen && arrowOpenStyle)}
                />
            }
            size={16}
            color="var(--foregroundTertiary)"
        />
    </components.DropdownIndicator>
);

const ClearIndicatorComponent = (props: IndicatorProps<OptionType>) => (
    <components.ClearIndicator {...props}>
        <UIcon icon={<IcClear />} size={16} color="var(--foregroundTertiary)" />
    </components.ClearIndicator>
);

const MultiValueLabelComponent = (props: MultiValueProps<OptionType>) => (
    <components.MultiValueLabel {...props}>
        {emoji(props.data.label ? String(props.data.label) : '')}
    </components.MultiValueLabel>
);

const optionContainer = css`
    display: flex;
    flex-direction: column;
`;

const optionLabelStyle = css`
    font-weight: normal;
    color: var(--foregroundPrimary);
    word-wrap: break-word;
`;

const optionSubtitleStyle = css`
    color: var(--foregroundSecondary);
`;

const selectedIcon = css`
    margin-left: 8px;
`;

const OptionRender = (option: OptionType) => {
    if (option.subtitle && option.labelShort) {
        return (
            <div className={optionContainer}>
                <div className={cx(TextLabel1, optionLabelStyle)}>
                    {emoji(String(option.label))}
                </div>
                <div className={cx(TextDensed, optionSubtitleStyle)}>{emoji(option.subtitle)}</div>
            </div>
        );
    }
    return (
        <div className={optionContainer}>
            <div className={cx(TextBody, optionLabelStyle)}>{emoji(String(option.label))}</div>
        </div>
    );
};

const OptionComponent = React.memo((
    props: OptionProps<OptionType> & {
        customChild?: (option: OptionType) => React.ReactElement;
    },
) => {
    const { data, customChild } = props;
    const option = data as OptionType;
    const isSelected = props.isSelected;
    return (
        <components.Option {...props}>
            {customChild ? customChild(option) : <OptionRender {...option} />}
            {isSelected && (
                <div className={selectedIcon}>
                    <UIcon icon={<IcCheck />} color="var(--foregroundTertiary)" size={16} />
                </div>
            )}
        </components.Option>
    );
});

interface USelectBasicProps {
    options: OptionType[];
    onInputChange?: (v: string) => void;
    size?: USelectSize;
    disabled?: boolean;
    hideSelector?: boolean;
    optionRender?: (option: OptionType) => React.ReactElement;
    clearable?: boolean;
    searchable?: boolean;
    label?: string;
    invalid?: boolean;
    useMenuPortal?: boolean;
    autoFocus?: boolean;
    virtual?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onMenuClose?: () => void;
    filterOption?: (option: { label: string, value: string }, rawInput: string) => boolean;
}

export interface USelectProps extends USelectBasicProps, XViewProps {
    value: ValueType<OptionType>;
    onChange: (v: ValueType<OptionType>) => void;
    multi?: boolean;
}

const VirtualMenuList = (props: MenuListComponentProps<OptionType> & { children?: React.ReactNode[] }) => {
    const { children, options, maxHeight, getValue, getStyles } = props;
    const safeChildren = children || [];
    const paddingBottom = 8;
    const itemHeight = 40;
    const itemsCount = safeChildren.length || 1;
    const height = Math.min(itemsCount * itemHeight + paddingBottom, maxHeight);
    const valueWrapper = getValue();
    const value = valueWrapper ? valueWrapper[0] : undefined;
    const initialOffset = value ? options.indexOf(value) * itemHeight : 0;
    let noOptions = !safeChildren.length;

    return (
        <FixedSizeList
            style={{ marginTop: 8, paddingBottom }}
            height={height}
            itemCount={itemsCount}
            itemSize={itemHeight}
            width={320}
            initialScrollOffset={initialOffset}
        >
            {({ index, style }) => (
                <div style={{ ...style, ...noOptions ? getStyles('placeholder', props) : {} }}>
                    {noOptions ? 'No options' : safeChildren[index]}
                </div>
            )
            }
        </FixedSizeList>
    );
};

export const USelect = React.memo(
    React.forwardRef((props: USelectProps, ref: any) => {
        const {
            options,
            value,
            onChange,
            onInputChange,
            optionRender,
            size = 'default',
            disabled,
            hideSelector = false,
            multi = false,
            clearable = false,
            searchable = false,
            label,
            invalid,
            useMenuPortal,
            autoFocus,
            onBlur,
            onFocus,
            onMenuClose,
            filterOption,
            virtual,
            ...xViewProps
        } = props;

        const [inputValue, setInputValue] = React.useState('');

        const onInputChangeHandler = (v: string, params: InputActionMeta) => {
            if (params.action === 'input-change') {
                setInputValue(v);
                if (onInputChange) {
                    onInputChange(v);
                }
            }
            if (params.action === 'menu-close' && v === '') {
                setInputValue('');
            }
        };

        React.useLayoutEffect(() => {
            setInputValue('');
            if (onInputChange) {
                onInputChange('');
            }
        }, [value]);

        return (
            <XView {...xViewProps}>
                <Select
                    ref={ref}
                    autoFocus={autoFocus}
                    openMenuOnFocus={true}
                    options={options}
                    value={value}
                    onChange={onChange}
                    isDisabled={disabled}
                    isMulti={multi}
                    isClearable={clearable}
                    onInputChange={onInputChangeHandler}
                    inputValue={inputValue}
                    isSearchable={searchable}
                    placeholder={label}
                    filterOption={filterOption}
                    menuPortalTarget={useMenuPortal ? document.querySelector('body') : undefined}
                    styles={customStyles({
                        size: size,
                        withCustomPlaceholder: !multi && size === 'default',
                        hideSelector: hideSelector,
                        optionRender: !!optionRender,
                    })}
                    components={{
                        Option: optionRender
                            ? (v) => <OptionComponent {...v} customChild={optionRender} />
                            : (v) => <OptionComponent {...v} />,
                        DropdownIndicator: DropdownIndicatorComponent,
                        ClearIndicator: ClearIndicatorComponent,
                        MultiValueLabel: MultiValueLabelComponent,
                        ...virtual ? { MenuList: VirtualMenuList } : {}
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onMenuClose={onMenuClose}
                />
                {!multi && size === 'default' && (
                    <div
                        className={cx(
                            placeholderStyle,
                            (Array.isArray(value) ? !!value.length : !!value) &&
                            placeholderValueStyle,
                            invalid && placeholderInvalidStyle,
                        )}
                    >
                        {label}
                    </div>
                )}
            </XView>
        );
    }),
);

type UselectFieldType = string | number | boolean | null | undefined;

export const USelectField = React.forwardRef(
    (props: USelectBasicProps & { field: FormField<UselectFieldType> }, ref: any) => {
        const { field, ...other } = props;
        return (
            <USelect
                ref={ref}
                onChange={(val: OptionType) => {
                    field.input.onChange(!!val ? val.value : null);
                }}
                multi={false}
                value={props.options.filter((i) => i.value === field.value)}
                invalid={field.input.invalid}
                {...other}
            />
        );
    },
);
