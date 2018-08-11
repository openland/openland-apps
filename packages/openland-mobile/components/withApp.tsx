import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ZAppContent } from './ZAppContent';
import { ZHeaderContextDirect } from './navigation/ZHeaderContextDirect';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>, args?: { noSafeWrapper?: boolean, isInTab?: boolean, navigationStyle?: 'large' | 'small' }) => {
    let res = (props: NavigationInjectedProps) => {
        return (
            <ZAppContent navigation={props.navigation} useParent={args && args.isInTab} navigationStyle={(args && args.navigationStyle) || 'large'}>
                {args && args.isInTab && <Wrapped {...props} />}
                {!(args && args.isInTab) && (
                    <ZHeaderContextDirect navigation={props.navigation}>
                        <Wrapped {...props} />
                    </ZHeaderContextDirect>
                )}
            </ZAppContent>
        );
    };

    hoistNonReactStatics(res, Wrapped);

    return res;
};