import * as React from 'react';
import { HeaderConfig } from './components/HeaderConfig';
import { HeaderConfigRegistrator } from './components/HeaderConfigRegistrator';

export const UHeader = React.memo((props: HeaderConfig) => {
    return (<HeaderConfigRegistrator config={props} />);
});