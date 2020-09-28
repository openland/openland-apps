import * as React from 'react';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { css, cx } from 'linaria';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import SearchIcon from 'openland-icons/s/ic-search-24.svg';
import { UIconButton } from './unicorn/UIconButton';

const membersSearchStyle = css`
    height: 0px;
    will-change: height;
    margin-bottom: 0px;
    overflow: hidden;
    transition: height 0.15s ease;

    &:focus-within {
        height: 40px;
    }
`;

const membersSearchFilledStyle = css`
    height: 40px;
    margin-bottom: 16px;
`;

export const MembersSearchInput = (props: {
    query: string;
    loading: boolean;
    onChange: (v: string) => void;
}) => {
    const { query, loading, onChange } = props;
    const searchInputRef = React.useRef<USearchInputRef>(null);
    const [searchFocused, setSearchFocused] = React.useState(false);
    const [searchVisible, setSearchVisible] = React.useState(false);

    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            if (searchFocused) {
                onChange('');
                searchInputRef.current?.blur();
                setSearchVisible(false);
                return true;
            }
            return false;
        },
    });

    const handleSearchClick = React.useCallback(() => {
        setSearchVisible(prevVisible => {
            if (prevVisible) {
                searchInputRef?.current?.blur();
                return !prevVisible;
            } else {
                searchInputRef?.current?.focus();
                return !prevVisible;
            }
        });
    }, [setSearchVisible]);

    return (
        <div className={cx(membersSearchStyle, searchVisible && membersSearchFilledStyle)}>
            <UIconButton icon={<SearchIcon />} onClick={handleSearchClick} position="absolute" right={0} top={-48}/>
            <USearchInput
                width={484}
                marginLeft={16}
                ref={searchInputRef}
                placeholder="Search"
                value={query}
                loading={loading}
                onChange={onChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
            />
        </div>
    );
};