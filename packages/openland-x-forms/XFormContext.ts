import * as React from 'react';
import { XStoreState } from 'openland-y-store/XStoreState';

export interface XFormContextValue {
    store: XStoreState;
    submit: (action?: (data: any) => any) => any;
}
export const XFormContext = React.createContext<XFormContextValue | undefined>(undefined);