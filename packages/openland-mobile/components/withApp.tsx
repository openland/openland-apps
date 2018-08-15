import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ZHeaderContextDirect } from './navigation/ZHeaderContextDirect';
import { ZHeaderSafeArea } from './layout/ZHeaderSafeArea';
import { ZHeaderAppearance } from './navigation/ZHeaderAppearance';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>, args?: { navigationAppearance?: ZHeaderAppearance }) => {

    let res = class WrappedPage extends React.Component<NavigationInjectedProps> {
        shouldComponentUpdate() {
            return false;
        }
        render() {
            return (
                <ZHeaderContextDirect navigation={this.props.navigation}>
                    <ZHeaderSafeArea appearance={args && args.navigationAppearance || 'large'}>
                        <Wrapped {...this.props} />
                    </ZHeaderSafeArea>
                </ZHeaderContextDirect>
            );
        }
    };
    hoistNonReactStatics(res, Wrapped);

    return res;
};