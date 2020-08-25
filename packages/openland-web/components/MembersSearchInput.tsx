import * as React from 'react';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { css, cx } from 'linaria';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

const membersSearchStyle = css`
    width: 160px;
    will-change: width;
    transition: width 0.15s ease;

    &:focus-within {
        width: 240px;
    }
`;

const membersSearchFilledStyle = css`
    width: 240px;
`;

export const MembersSearchInput = (props: {
    query: string;
    loading: boolean;
    onChange: (v: string) => void;
}) => {
    const { query, loading, onChange } = props;
    const searchInputRef = React.useRef<USearchInputRef>(null);
    const [searchFocused, setSearchFocused] = React.useState(false);
    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            if (searchFocused) {
                onChange('');
                searchInputRef.current?.blur();
                return true;
            }
            return false;
        },
    });

    return (
        <div className={cx(membersSearchStyle, query.length > 0 && membersSearchFilledStyle)}>
            <USearchInput
                ref={searchInputRef}
                placeholder="Search"
                rounded={true}
                value={query}
                loading={loading}
                onChange={onChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
            />
        </div>
    );
};