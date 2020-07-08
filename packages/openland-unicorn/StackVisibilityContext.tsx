import * as React from 'react';

export const StackVisibilityContext = React.createContext<(v: boolean) => void>(() => { /* */ });

export const useStackVisibility = () => React.useContext(StackVisibilityContext);
