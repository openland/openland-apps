import * as React from 'react';

export const MobileSidebarContext = React.createContext<{
    showSidebar: boolean;
    setShowSidebar: Function;
    showMenu: boolean;
    setShowMenu: Function;
    isMobile: boolean;
    renderedOnce: boolean;
}>({
    showSidebar: false,
    setShowSidebar: () => {
        //
    },
    showMenu: false,
    setShowMenu: () => {
        //
    },
    isMobile: false,
    renderedOnce: false,
});
