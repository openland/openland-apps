import * as React from 'react';
import { css } from 'linaria';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import {
    DesktopSidebar,
    MobileSidebar,
} from 'openland-web/pages/root/components/AuthPageSidebar';

const rootContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

export const AuthPageContainer = React.memo((props: { children: JSX.Element }) => {
    const isMobile = useIsMobile();
    return (
        <div className={rootContainer}>
            {!isMobile && <DesktopSidebar />}
            <div className={mainContainer}>
                {isMobile && <MobileSidebar />}
                {props.children}
            </div>
        </div>
    );
});
