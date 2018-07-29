import * as React from 'react';
import { XStoreState } from 'openland-y-store/XStoreState';

export interface YFormContextValue {
    store: XStoreState;
    submit: (action?: (data: any) => any) => any;
}
export const YFormContext = React.createContext<YFormContextValue | undefined>(undefined);