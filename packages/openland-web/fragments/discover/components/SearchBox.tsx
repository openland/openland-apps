import React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XInput } from 'openland-x/XInput';
import { UButton } from 'openland-web/components/unicorn/UButton';
import SearchIcon from 'openland-icons/ic-search-small.svg';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

const SearchWrapper = Glamorous.div({
    borderBottom: '1px solid #ececec',
    flexShrink: 0,
});

const SearchInner = Glamorous(XHorizontal)({
    height: 60,

    '& > div:focus-within': {
        '& .search-icon > g > path:last-child': {
            fill: 'rgba(23, 144, 255, 0.5)',
        },
    },
    '& .search-icon': {
        marginLeft: '2px!important',

        '& > g > path:last-child': {
            fill: 'rgba(0, 0, 0, 0.25)',
        },
    },
});

const SearchInput = Glamorous(XInput)({
    height: 59,
    marginTop: -2,
    border: 'none',
    fontSize: 16,
    fontWeight: 500,
    '&:focus-within': {
        boxShadow: 'none',
        border: 'none',
    },

    '& > input, & > .input-placeholder': {
        paddingLeft: 14,
    },
});

interface SearchBoxProps {
    value: string;
    placeholder?: string;
    onChange: (e: any) => void;
}

export const SearchBox = XMemo<SearchBoxProps>(props => {
    const layout = useLayout();
    const isMobile = React.useContext(IsMobileContext);
    const onChange = (value: string) => {
        props.onChange(value);
    };

    const onClear = () => {
        props.onChange('');
    };
    return (
        <SearchWrapper>
            <XContentWrapper>
                <SearchInner justifyContent="space-between" alignItems="center" flexShrink={0}>
                    <XHorizontal separator={0} alignItems="center" flexGrow={1}>
                        <SearchIcon className="search-icon" />
                        <SearchInput
                            value={props.value}
                            onChange={onChange}
                            flexGrow={1}
                            placeholder={props.placeholder}
                            autofocus={!isMobile}
                        />
                    </XHorizontal>
                    {props.value.length > 0 && (
                        <UButton text="Clear" style="secondary" onClick={onClear} flexShrink={0} />
                    )}
                    {layout !== 'mobile' && <UButton text="Search" style="primary" />}
                </SearchInner>
            </XContentWrapper>
        </SearchWrapper>
    );
});
