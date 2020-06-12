import * as React from 'react';
import { XView } from 'react-mental';
import IcDropdown from 'openland-icons/s/ic-dropdown-16.svg';
import { css, cx } from 'linaria';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { VariableSizeList } from 'react-window';
import { countriesMeta } from 'openland-y-utils/countriesMeta';
import { TextLabel1, TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import IcCheck from 'openland-icons/s/ic-done-16.svg';

export type OptionType = { label: string, value: string, shortname: string };
type GroupType = { label: string, options: OptionType[] };

const SPACE_REGEX = /\s/g;
const removeSpace = (s: string) => s.replace(SPACE_REGEX, '');
const US_LABEL = 'United States';

const groupedCountriesCodes = countriesMeta
    .reduce((acc, country) => {
        let countryLetter = country.label.toLowerCase()[0];
        let prevGroup = acc[acc.length - 1];
        if (prevGroup) {
            if (countryLetter === prevGroup.label.toLowerCase()[0]) {
                prevGroup.options.push(country);
            } else {
                acc.push({ label: countryLetter, options: [country] });
            }
        } else {
            acc.push({ label: countryLetter, options: [country] });
        }
        return acc;
    }, [] as GroupType[]);

const VirtualMenuList = (props: { children: React.ReactNode[], options: GroupType[], filtered: boolean, value: OptionType }) => {
    const listRef = React.useRef<VariableSizeList>(null);
    const { children, options, value, filtered } = props;
    const maxHeight = 272;
    const headerHeight = 48;
    const itemHeight = 40;
    const itemsHeigth = options.flatMap((x) => x.options).length * itemHeight;
    const optionsHeight = filtered ? itemsHeigth : options.length * headerHeight + itemsHeigth;
    const height = Math.min(optionsHeight, maxHeight);

    let foundOffset = options.reduce(({ offset, found }, group) => {
        if (found) {
            return { offset, found };
        }
        let localIndex = group.options.findIndex((v: OptionType) => v.value === value.value && v.label === value.label);
        if (localIndex === -1) {
            return { offset: offset + headerHeight + itemHeight * group.options.length, found: false };
        } else {
            return { offset: offset + headerHeight + itemHeight * localIndex, found: true };
        }
    }, { offset: -10, found: false } as { offset: number, found: boolean });

    React.useEffect(() => {
        if (listRef.current) {
            listRef.current.resetAfterIndex(0, true);
            setTimeout(() => {
                if (filtered) {
                    listRef.current?.scrollToItem(0, 'start');
                }
            }, 20);
        }
    }, [options]);

    return (
        <VariableSizeList
            ref={listRef}
            style={{ marginBottom: 8, position: 'relative' }}
            height={height}
            itemCount={options.length}
            itemSize={i => filtered ? options[i].options.length * itemHeight : options[i].options.length * itemHeight + headerHeight}
            width={320}
            initialScrollOffset={foundOffset.found ? foundOffset.offset : 0}
        >
            {({ index, style }) => (
                <div style={style}>
                    {options.length !== 0 ? children[index] : null}
                </div>
            )}
        </VariableSizeList>
    );
};

const wrapper = css`
    width: 100%;
    margin-top: 32px;
`;

const arrowWrapper = css`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
`;

const arrowStyle = css`
    transform: rotate(0deg);
`;

const arrowOpenStyle = css`
    transform: rotate(180deg);
`;

const triggerTextStyle = css`
    user-select: none;
    display: flex;
    align-items: center;
`;

const menuWrapper = css`
    position: absolute;
    top: calc(100% + 8px);
    width: 320px;
    padding-top: 8px;
    background-color: var(--backgroundSecondary);
    display: flex;
    flex-direction: column;
    z-index: 20;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
`;

const groupHeaderStyle = cx(TextLabel1, css`
    margin-top: 8px;
    padding: 8px 16px;
    color: var(--foregroundPrimary);
    text-transform: capitalize;
    text-align: left;
`);

const groupHeaderStyleFirst = css`
    margin-top: 0;
`;

const optionStyle = cx(TextBody, css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    padding: 8px 16px;
    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
`);

const optionStyleActive = css`
    background-color: var(--backgroundTertiaryHoverTrans);
`;

const optionLabelStyle = css`
    font-weight: normal;
    color: var(--foregroundPrimary);
    text-align: start;
    flex: 1;
`;

const optionValueStyle = css`
    color: var(--foregroundSecondary);
`;

const CountriesGroup = (props: {
    group: GroupType,
    value: OptionType,
    activeIndex: number | undefined,
    filtered: boolean,
    first: boolean,
    onCountrySelect: (v: OptionType) => void
}) => {
    return (
        <div>
            {!props.filtered && <h4 className={cx(groupHeaderStyle, props.first && groupHeaderStyleFirst)}>{props.group.label}</h4>}
            {props.group.options.map((option, i) => {
                const isSelected = option.value === props.value.value && option.label === props.value.label;
                return (
                    <div key={option.label + option.value} className={cx(optionStyle, i === props.activeIndex && optionStyleActive)} onClick={() => props.onCountrySelect(option)}>
                        <div className={optionLabelStyle}>{option.label}</div>
                        <div className={optionValueStyle}>{option.value}</div>
                        {isSelected && (
                            <XView marginLeft={8}>
                                <UIcon icon={<IcCheck />} color="var(--foregroundTertiary)" size={16} />
                            </XView>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const filterCountryOption = ({ label: rawLabel, value }: { label: string, value: string }, rawInput: string) => {
    let label = rawLabel.toLowerCase();
    let input = rawInput.toLowerCase();
    if (label === US_LABEL.toLowerCase() && ['usa', 'america', 'united states of america', 'u.s.'].some(x => x.startsWith(input))) {
        return true;
    }
    return label.includes(input) || removeSpace(value).replace(/\+/g, '').startsWith(removeSpace(rawInput));
};

interface CountryPickerProps {
    value: OptionType;
    className?: string;
    onChange: (o: OptionType) => void;
    onOpen: () => void;
    onClose: () => void;
}

export const CountryPicker = (props: CountryPickerProps) => {
    const { value, onChange, onOpen, onClose, className } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const inputRef = React.useRef<USearchInputRef>(null);
    const [selectedItem, setSelectedItem] = React.useState<{ groupIndex: number, optionIndex: number }>({ groupIndex: 0, optionIndex: 0 });
    const [searchValue, setSearchValue] = React.useState('');

    const filteredOptions = React.useMemo(() =>
        !searchValue
            ? groupedCountriesCodes
            : [groupedCountriesCodes
                .flatMap(x => x.options)
                .filter(x => filterCountryOption(x, searchValue))
                .reduce((acc, x) => ({ label: '', options: [...acc.options, x] }), { label: '', options: [] })]
        , [searchValue]);

    const handleCountrySelect = React.useCallback((option: OptionType) => {
        onChange(option);
        setIsOpen(false);
    }, []);

    React.useEffect(() => {
        setSearchValue('');
        if (isOpen) {
            onOpen();
            let optionIndex = 0;
            let groupIndex = filteredOptions.findIndex(g => {
                optionIndex = g.options.findIndex(o => o.label === value.label && o.value === value.value);
                return optionIndex !== -1;
            });
            setSelectedItem({ groupIndex, optionIndex });
            inputRef.current?.focus();
        } else {
            onClose();
        }
    }, [isOpen]);

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode !== 13) {
            return;
        }
        let val = filteredOptions[selectedItem.groupIndex]?.options[selectedItem.optionIndex];
        if (val) {
            onChange(val);
            setIsOpen(false);
        }
    };

    useShortcuts([
        { keys: ['Escape'], callback: () => setIsOpen(false) },
        {
            keys: ['ArrowUp'], callback: () => {
                let groupIndex = selectedItem.groupIndex;
                let optionIndex = selectedItem.optionIndex;
                if (selectedItem.optionIndex === 0) {
                    if (selectedItem.groupIndex === 0) {
                        return;
                    } else {
                        groupIndex -= 1;
                        optionIndex = filteredOptions[groupIndex]?.options.length - 1;
                    }
                } else {
                    optionIndex -= 1;
                }
                setSelectedItem({ groupIndex, optionIndex });
            }
        },
        {
            keys: ['ArrowDown'], callback: () => {
                let groupIndex = selectedItem.groupIndex;
                let optionIndex = selectedItem.optionIndex;
                if (selectedItem.optionIndex === filteredOptions[selectedItem.groupIndex]?.options.length - 1) {
                    if (selectedItem.groupIndex === filteredOptions.length - 1) {
                        return;
                    } else {
                        groupIndex += 1;
                        optionIndex = 0;
                    }
                } else {
                    optionIndex += 1;
                }
                setSelectedItem({ groupIndex, optionIndex });
            }
        },
    ], [filteredOptions, selectedItem]);

    React.useEffect(() => {
        setSelectedItem({ groupIndex: 0, optionIndex: 0 });
    }, [searchValue]);

    return (
        <div className={cx('x', wrapper, className)} tabIndex={0} onFocus={() => setIsOpen(true)}>
            <XView
                width="100%"
                height={40}
                backgroundColor="var(--backgroundTertiaryTrans)"
                color="var(--foregroundPrimary)"
                flexDirection="row"
                paddingVertical={8}
                paddingLeft={16}
                paddingRight={48}
                borderRadius={8}
                hoverBackgroundColor="var(--backgroundTertiaryHoverTrans)"
                cursor="pointer"
                onMouseDown={() => { setIsOpen(x => !x); }}
                zIndex={11}
            >
                <span className={triggerTextStyle}>{value.label}</span>
                <UIcon
                    className={arrowWrapper}
                    icon={
                        <IcDropdown
                            className={cx(arrowStyle, isOpen && arrowOpenStyle)}
                        />
                    }
                    size={16}
                    color="var(--foregroundTertiary)"
                />
            </XView>
            {isOpen && (
                <>
                    <div className={menuWrapper}>
                        <USearchInput
                            ref={inputRef}
                            marginTop={8}
                            marginHorizontal={16}
                            marginBottom={8}
                            placeholder="Country"
                            onChange={setSearchValue}
                            onKeyDown={handleEnter}
                        />
                        <VirtualMenuList options={filteredOptions} filtered={!!searchValue} value={value}>
                            {filteredOptions.map((group, i) => (
                                <CountriesGroup
                                    first={i === 0}
                                    filtered={!!searchValue}
                                    activeIndex={selectedItem.groupIndex === i ? selectedItem.optionIndex : undefined}
                                    key={group.label}
                                    group={group}
                                    value={value}
                                    onCountrySelect={handleCountrySelect}
                                />
                            ))}
                        </VirtualMenuList>
                        {searchValue && filteredOptions[0]?.options.length === 0 && (
                            <XView {...TextStyles.Body} color="var(--foregroundTertiary)" paddingHorizontal={16} paddingBottom={16}>
                                No country
                            </XView>
                        )}
                    </div>
                    <XView position="fixed" zIndex={10} top={0} left={0} right={0} bottom={0} onClick={() => setIsOpen(false)} />
                </>
            )}
        </div>
    );
};
