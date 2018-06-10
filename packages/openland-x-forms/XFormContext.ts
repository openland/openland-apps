import * as React from 'react';
import { XStoreState } from 'openland-x-store/XStoreState';

export interface XFormContextValue {
    store: XStoreState;
    submit: (action?: (data: any) => any) => void;
}
export const XFormContext = React.createContext<XFormContextValue | undefined>(undefined);