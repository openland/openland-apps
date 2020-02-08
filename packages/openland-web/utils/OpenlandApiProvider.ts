import * as React from 'react';
import { OpenlandClient } from 'openland-api/spacex';

export const OpenlandApiContext = React.createContext<OpenlandClient | undefined>(undefined);
