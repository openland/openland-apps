import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { XMemo } from 'openland-y-utils/XMemo';

export const Header = (props: { children?: any }) => (
    <XView fontSize={22} lineHeight="24px" opacity={0.9} marginBottom={25}>
        {props.children}
    </XView>
);

export const Group = (props: { children?: any }) => <XView maxWidth={575}>{props.children}</XView>;

export const GroupText = css`
    font-size: 14px;
    line-height: 20px;
    margin-top: -3px;
    margin-bottom: 16px;
    opacity: 0.9;

    &:last-child {
        margin-bottom: 0;
    }

    & > strong {
        font-weight: 600;
    }
`;

export const GroupTitle = (props: { children?: any }) => (
    <XView fontSize={16} lineHeight="20px" fontWeight={'600'} marginBottom={12}>
        {props.children}
    </XView>
);

export const GroupSubTitle = (props: { children?: any }) => (
    <XView fontSize={14} lineHeight="16px" paddingTop={4} marginBottom={12}>
        {props.children}
    </XView>
);

export const Content = XMemo<{ children: any }>(props => {
    const { isMobile } = React.useContext(MobileSidebarContext);

    return (
        <XView paddingVertical={20} paddingHorizontal={isMobile ? 20 : 30} flexGrow={1}>
            {props.children}
        </XView>
    );
});

export const HeadTitle = (props: { children?: any }) => (
    <XView fontSize={18} fontWeight="600" color="#000000">
        {props.children}
    </XView>
);
