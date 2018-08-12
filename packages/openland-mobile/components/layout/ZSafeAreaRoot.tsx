import * as React from 'react';
import { ZKeyboardListener } from './ZKeyboardListener';
import { ZSafeAreaProvider } from './ZSafeAreaContext';
import { ZAppConfig } from '../ZAppConfig';

export class ZSafeAreaRoot extends React.PureComponent {
    render() {
        return (
            <ZKeyboardListener bottomOffset={ZAppConfig.bottomNavigationBarInset}>
                {(height) => (
                    <ZSafeAreaProvider top={ZAppConfig.navigationBarContentInsetSmall} bottom={ZAppConfig.bottomNavigationBarInset + height}>
                        {this.props.children}
                    </ZSafeAreaProvider>
                )}
            </ZKeyboardListener>
        );
    }
}