import * as React from 'react';
import { UnicornContext } from './components/UnicornContext';

export function useUnicorn() {
    return React.useContext(UnicornContext)!;
}