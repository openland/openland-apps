import * as React from 'react';
import { SRouter } from './SRouter';

export const SRouterContext = React.createContext<SRouter | undefined>(undefined);

export const SRouterMountedContext = React.createContext<{ mounted: string[] | [] }>({ mounted: [] });