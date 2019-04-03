import * as React from 'react';
import { OpenlandApiContext } from './OpenlandApiProvider';

export function useClient() {
    const res = React.useContext(OpenlandApiContext);
    if (!res) {
        console.log('Openland Client is not set');
    }
    return res!;
}
