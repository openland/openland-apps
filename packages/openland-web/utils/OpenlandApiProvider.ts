import * as React from 'react';
import { OpenlandClient } from 'openland-api/OpenlandClient';

export const OpenlandApiContext = React.createContext<OpenlandClient | undefined>(undefined);