import * as React from 'react';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { css, cx } from 'linaria';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import SearchIcon from 'openland-icons/s/ic-search-24.svg';
import { UIconButton } from './unicorn/UIconButton';

const membersListClass = css`
    background-color: var(--backgroundPrimary);
    will-change: transform;
    transform: translateY(-45px);
`;

const showSearchClass = css`
    animation-name: showSearch;
    animation-duration: 250ms;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: forwards;
    @keyframes showSearch {
        from {
            transform: translateY(-45px);
        }
        to {
            transform: translateY(16px);
        }
    }
`;

const hideSearchClass = css`
    animation-name: hideSearch;
    animation-duration: 250ms;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: forwards;
    @keyframes hideSearch {
        from {
            transform: translateY(16px);
        }
        to {
            transform: translateY(-45px);
        }
    }
`;

enum SEARCH_STATE {
    INITIAL = 'INITIAL',
    VISIBLE = 'VISIBLE',
    HIDDEN = 'HIDDEN',
}

export const MembersSearchInput = (props: {
    query: string;
    children: any;
    loading: boolean;
    onChange: (v: string) => void;
}) => {
    const { query, loading, onChange } = props;
    const searchInputRef = React.useRef<USearchInputRef>(null);
    const [searchFocused, setSearchFocused] = React.useState(false);
    const [searchState, setSearchState] = React.useState(SEARCH_STATE.INITIAL);

    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            if (searchFocused) {
                onChange('');
                searchInputRef.current?.blur();
                setSearchState(SEARCH_STATE.HIDDEN);
                return true;
            }
            return false;
        },
    });

    const handleSearchClick = React.useCallback(() => {
        if (searchState === SEARCH_STATE.VISIBLE) {
            searchInputRef?.current?.blur();
            setSearchState(SEARCH_STATE.HIDDEN);
        } else {
            searchInputRef?.current?.focus();
            setSearchState(SEARCH_STATE.VISIBLE);
        }
    }, [searchState]);

    const memberListClassNames = cx(
        membersListClass,
        searchState === SEARCH_STATE.VISIBLE && showSearchClass,
        searchState === SEARCH_STATE.HIDDEN && hideSearchClass,
    );

    return (
        <>
            <UIconButton
                icon={<SearchIcon />}
                onClick={handleSearchClick}
                position="absolute"
                right={7}
                top={-48}
            />
            <USearchInput
                maxWidth={504}
                width="calc(100% - 32px)"
                marginLeft={16}
                ref={searchInputRef}
                placeholder="Search"
                value={query}
                loading={loading}
                onChange={onChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
            />
            <div className={memberListClassNames}>{props.children}</div>
        </>
    );
};
