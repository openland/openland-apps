import * as React from 'react';

export const MobileSidebarContext = React.createContext<{
    showSidebar: boolean;
    setShowSidebar: Function;
    showMenu: boolean;
    setShowMenu: Function;
}>({
    showSidebar: false,
    setShowSidebar: () => {
        //
    },
    showMenu: false,
    setShowMenu: () => {
        //
    },
});
