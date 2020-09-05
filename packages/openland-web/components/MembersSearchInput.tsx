import * as React from 'react';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { css, cx } from 'linaria';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

const membersSearchStyle = css`
    height: 0px;
    will-change: width;
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
    visible: boolean;
    onChange: (v: string) => void;
}) => {
    const { query, loading, visible, onChange } = props;
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
        <div className={cx(membersSearchStyle, visible && membersSearchFilledStyle)}>
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