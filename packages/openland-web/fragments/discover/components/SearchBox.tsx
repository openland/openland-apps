import React from 'react';
import { css } from 'linaria';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

const searchContainer = css`
    border-bottom: 1px solid #ececec;
    flex-shrink: 0;
    padding-top: 16px;
    padding-bottom: 16px;
`;

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

    return (
        <div className={searchContainer}>
            <XContentWrapper>
                <XHorizontal justifyContent="space-between" alignItems="center" flexShrink={0}>
                    <XHorizontal separator={0} alignItems="center" flexGrow={1}>
                        <USearchInput
                            value={props.value}
                            onChange={onChange}
                            flexGrow={1}
                            placeholder={props.placeholder}
                            autoFocus={!isMobile}
                        />
                    </XHorizontal>
                    {layout !== 'mobile' && <UButton text="Search" style="primary" />}
                </XHorizontal>
            </XContentWrapper>
        </div>
    );
});
