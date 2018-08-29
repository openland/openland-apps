import * as React from 'react';
import { ZKeyboardListener } from './ZKeyboardListener';
import { ZSafeAreaContext } from './ZSafeAreaContext';
import { ZAppConfig } from '../ZAppConfig';
import { ZKeyboardAwareContainer } from './ZKeyboardAwareContainer';

export class ZSafeAreaRoot extends React.PureComponent {
    render() {
        return (
            <ZKeyboardListener bottomOffset={ZAppConfig.bottomNavigationBarInset}>
                {(height) => (
                    <ZSafeAreaContext.Consumer>
                        {area => (
                            <ZSafeAreaContext.Provider value={{ top: ZAppConfig.navigationBarContentInsetSmall + area.top, bottom: ZAppConfig.bottomNavigationBarInset + area.bottom + height, keyboardHeight: height }}>
                                <ZKeyboardAwareContainer>
                                    {this.props.children}
                                </ZKeyboardAwareContainer>
                            </ZSafeAreaContext.Provider>
                        )}
                    </ZSafeAreaContext.Consumer>
                )}
            </ZKeyboardListener>
        );
    }
}