import * as React from 'react';

export const XModalContext = React.createContext<{ close: () => void } | undefined>(undefined);