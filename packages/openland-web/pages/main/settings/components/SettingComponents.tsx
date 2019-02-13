import * as React from 'react';
import { XView } from 'react-mental';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { XMemo } from 'openland-y-utils/XMemo';

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
