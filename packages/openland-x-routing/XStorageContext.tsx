import * as React from 'react';
import { SharedStorage } from 'openland-x-utils/SharedStorage';

export const XStorageContext = React.createContext<SharedStorage | undefined>(undefined);