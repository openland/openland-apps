import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { PageProps } from './PageProps';
import { withRouter } from 'react-native-fast-navigation/withRouter';
import { FastHeaderAppearance } from 'react-native-fast-navigation/FastHeaderAppearance';
import { FastHeaderSafeArea } from 'react-native-fast-navigation/FastHeaderSafeArea';

export const withApp = (Wrapped: React.ComponentType<PageProps>, args?: { navigationAppearance?: FastHeaderAppearance }) => {

    let res = class WrappedPage extends React.Component<PageProps> {
        shouldComponentUpdate() {
            return false;
        }
        render() {
            return (
                <FastHeaderSafeArea appearance={args && args.navigationAppearance || 'large'}>
                    <Wrapped {...this.props} />
                </FastHeaderSafeArea>
            );
        }
    };
    hoistNonReactStatics(res, Wrapped);

    return withRouter(res);
};