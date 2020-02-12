import React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
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

export const SearchBox = React.memo((props: SearchBoxProps) => {
    const layout = useLayout();
    const isMobile = React.useContext(IsMobileContext);
    const onChange = (value: string) => {
        props.onChange(value);
    };

    return (
        <div className={searchContainer}>
            <XView paddingHorizontal={16} flexDirection="row" justifyContent="space-between" alignItems="center">
                <USearchInput
                    value={props.value}
                    onChange={onChange}
                    flexGrow={1}
                    placeholder={props.placeholder}
                    autoFocus={!isMobile}
                />
                {layout !== 'mobile' && <UButton text="Search" style="primary" marginLeft={16} />}
            </XView>
        </div>
    );
});
