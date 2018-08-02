import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ZAppContent } from './ZAppContent';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>, args?: { noSafeWrapper?: boolean, isInTab?: boolean, navigationStyle?: 'large' | 'small' }) => {
    let res = (props: NavigationInjectedProps) => {
        return (
            <ZAppContent navigation={props.navigation} useParent={args && args.isInTab} navigationStyle={(args && args.navigationStyle) || 'large'}>
                <Wrapped {...props} />
            </ZAppContent>
        );
    };

    hoistNonReactStatics(res, Wrapped);

    return res;
};