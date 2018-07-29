import * as React from 'react';
import { XStoreState } from './XStoreState';

export const XStoreContext = React.createContext<XStoreState | undefined>(undefined);