import * as React from 'react';
import { XView } from 'react-mental';
import IcDropdown from 'openland-icons/s/ic-dropdown-16.svg';
import { css, cx } from 'linaria';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { VariableSizeList } from 'react-window';
import { countriesMeta } from 'openland-y-utils/auth/countriesMeta';
import { TextLabel1, TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import IcCheck from 'openland-icons/s/ic-done-16.svg';
import { filterCountries } from 'openland-y-utils/auth/filterCountries';
import { throttle } from 'openland-y-utils/timer';

export type OptionType = { label: string, value: string, shortname: string };
type GroupType = { label: string, options: OptionType[] };

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
`);

const optionStyleActive = css`
    background-color: var(--backgroundTertiary);
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

const triggerStyle = cx('x', css`
    width: 100%;
    height: 40;
    background-color: var(--backgroundTertiaryTrans);
    color: var(--foregroundPrimary);
    flex-direction: row;
    padding: 8px 48px 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    z-index: 11;
    user-select: none;

    &:hover {
        background-color:var(--backgroundTertiaryHoverTrans)
    }
`);

const CountriesGroup = (props: {
    group: GroupType,
    value: OptionType,
    activeIndex: number | undefined,
    filtered: boolean,
    index: number,
    onCountrySelect: (v: OptionType) => void,
    onCountryHover: (i: number) => void,
}) => {
    return (
        <div>
            {!props.filtered && <h4 className={cx(groupHeaderStyle, props.index === 0 && groupHeaderStyleFirst)}>{props.group.label}</h4>}
            {props.group.options.map((option, i) => {
                const isSelected = option.value === props.value.value && option.label === props.value.label;
                const isActive = i === props.activeIndex;
                return (
                    <div
                        key={option.label + option.value}
                        className={cx(optionStyle, isActive && optionStyleActive)}
                        onClick={() => props.onCountrySelect(option)}
                        onMouseOver={() => {
                            props.onCountryHover(i);
                        }}
                        data-index={`${props.index}-${i}`}
                    >
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

type SelectionItem = { groupIndex: number, optionIndex: number };

interface CountryPickerMenuProps {
    filteredOptions: GroupType[];
    setSearchValue: (value: string) => void;
    searchValue: string;
    value: OptionType;
    selectedItem: SelectionItem;
    selectionMode: 'keyboard' | 'mouse';
    handleCountrySelect: (v: OptionType) => void;
    setSelectedItem: React.Dispatch<React.SetStateAction<SelectionItem>>;
    setSelectionMode: (mode: 'keyboard' | 'mouse') => void;
    setIsOpen: (flag: boolean) => void;
    onChange: (o: OptionType) => void;
}

const CountryPickerMenu = React.forwardRef((props: CountryPickerMenuProps, ref: React.RefObject<USearchInputRef>) => {
    const { setSearchValue, onChange, setSelectionMode, filteredOptions, searchValue, value, selectedItem, selectionMode, handleCountrySelect, setSelectedItem, setIsOpen } = props;

    const handleEnter = () => {
        let val = filteredOptions[selectedItem.groupIndex]?.options[selectedItem.optionIndex];
        if (val) {
            onChange(val);
            setIsOpen(false);
        }
    };
    const scrollToItem = ({ groupIndex, optionIndex }: SelectionItem) => {
        let el = document.querySelector(`div[data-index="${groupIndex}-${optionIndex}"]`);
        if (el) {
            el.scrollIntoView({ block: 'nearest' });
        }
    };

    useShortcuts([
        { keys: ['Escape'], callback: () => setIsOpen(false) },
        { keys: ['Enter'], callback: () => handleEnter() },
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
                setSelectionMode('keyboard');
                scrollToItem({ groupIndex, optionIndex });
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
                setSelectionMode('keyboard');
                scrollToItem({ groupIndex, optionIndex });
            }
        },
    ], [filteredOptions, selectedItem]);

    return (
        <>
            <div className={menuWrapper}>
                <USearchInput
                    ref={ref}
                    marginTop={8}
                    marginHorizontal={16}
                    marginBottom={16}
                    placeholder="Country"
                    autoFocus={true}
                    onChange={setSearchValue}
                />
                <VirtualMenuList options={filteredOptions} filtered={!!searchValue} value={value}>
                    {filteredOptions.map((group, i) => (
                        <CountriesGroup
                            index={i}
                            filtered={!!searchValue}
                            activeIndex={selectedItem.groupIndex === i ? selectedItem.optionIndex : undefined}
                            key={group.label}
                            group={group}
                            value={value}
                            onCountrySelect={handleCountrySelect}
                            onCountryHover={(optionIndex) => {
                                if (selectionMode === 'keyboard') {
                                    return;
                                }
                                setSelectedItem(prev => {
                                    if (prev && prev.groupIndex === i && prev.optionIndex === optionIndex) {
                                        return prev;
                                    }
                                    return { groupIndex: i, optionIndex };
                                });
                            }}
                        />
                    ))}
                </VirtualMenuList>
                {searchValue && filteredOptions[0]?.options.length === 0 && (
                    <XView {...TextStyles.Body} color="var(--foregroundTertiary)" paddingHorizontal={16} paddingBottom={16}>
                        Nothing found
                    </XView>
                )}
            </div>
            <XView position="fixed" zIndex={10} top={0} left={0} right={0} bottom={0} onClick={() => setIsOpen(false)} />
        </>
    );
});

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
    const [selectedItem, setSelectedItem] = React.useState<SelectionItem>({ groupIndex: 0, optionIndex: 0 });
    const [searchValue, setSearchValue] = React.useState('');
    const [selectionMode, setSelectionMode] = React.useState<'mouse' | 'keyboard'>('mouse');

    const filteredOptions = React.useMemo(() =>
        !searchValue
            ? groupedCountriesCodes
            : [filterCountries(searchValue, groupedCountriesCodes.flatMap(x => x.options))
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

    React.useEffect(() => {
        setSelectedItem({ groupIndex: 0, optionIndex: 0 });
    }, [searchValue]);

    React.useEffect(() => {
        const onMouseMove = throttle(() => {
            setSelectionMode('mouse');
        }, 200);
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className={cx('x', wrapper, className)} tabIndex={0}>
            <div
                className={triggerStyle}
                onClick={() => {
                    setIsOpen(x => !x);
                }}
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
            </div>
            {isOpen && (
                <CountryPickerMenu
                    setSearchValue={setSearchValue}
                    filteredOptions={filteredOptions}
                    searchValue={searchValue}
                    value={value}
                    selectedItem={selectedItem}
                    selectionMode={selectionMode}
                    handleCountrySelect={handleCountrySelect}
                    setSelectedItem={setSelectedItem}
                    setIsOpen={setIsOpen}
                    onChange={onChange}
                    setSelectionMode={setSelectionMode}
                />
            )}
        </div>
    );
};
