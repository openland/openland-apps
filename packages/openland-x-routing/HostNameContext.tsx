import * as React from 'react';

export const HostNameContext = React.createContext<{ hostName: string, protocol: string } | undefined>(undefined);