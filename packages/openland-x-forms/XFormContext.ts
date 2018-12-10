import * as React from 'react';
import { XStoreState } from 'openland-y-store/XStoreState';

export interface XFormContextValue {
    submited?: boolean;
    store: XStoreState;
    submit: (action?: (data: any) => any) => any;
    validated: any;
    touched: string[];
}
export const XFormContext = React.createContext<XFormContextValue | undefined>(
    undefined,
);
