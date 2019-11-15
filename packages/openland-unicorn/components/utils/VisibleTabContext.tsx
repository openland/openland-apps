import * as React from 'react';

export const VisibleTabContext = React.createContext<boolean>(false);

export const useVisibleTab = () => {
    return React.useContext(VisibleTabContext);
};
