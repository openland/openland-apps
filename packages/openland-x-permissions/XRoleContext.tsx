import * as React from 'react';

export const XRoleContext = React.createContext<{ roles: string[], currentOrganizatonId?: string } | undefined>(undefined);