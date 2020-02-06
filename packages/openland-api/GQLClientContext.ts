import * as React from 'react';
import { OpenlandClient } from 'openland-api/OpenlandClient';

export const GQLClientContext = React.createContext<OpenlandClient | undefined>(undefined);

export function useClient() {
    const res = React.useContext(GQLClientContext);
    if (!res) {
        console.log('Openland Client is not set');
    }
    return res!;
}
