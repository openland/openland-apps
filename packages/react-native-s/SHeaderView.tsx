import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';

export const SHeaderView = React.memo<{ iconColor?: string, accentColor?: string; children?: any }>(props => {
    const renderHeader = React.useCallback(() => props.children, [props.children]);
    return (
        <HeaderConfigRegistrator
            config={{
                titleView: renderHeader,
                iconColor: props.iconColor,
                accentColor: props.accentColor
            }}
        />
    );
});
