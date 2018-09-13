import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { PageProps } from './PageProps';
import { withRouter } from 'react-native-s/withRouter';
import { SHeaderAppearance } from 'react-native-s/SHeader';
import { SHeaderSafeArea } from 'react-native-s/SHeaderSafeArea';

export const withApp = (Wrapped: React.ComponentType<PageProps>, args?: { navigationAppearance?: SHeaderAppearance }) => {

    let res = class WrappedPage extends React.Component<PageProps> {
        shouldComponentUpdate() {
            return false;
        }
        render() {
            return (
                <SHeaderSafeArea appearance={args && args.navigationAppearance || 'large'}>
                    <Wrapped {...this.props} />
                </SHeaderSafeArea>
            );
        }
    };
    hoistNonReactStatics(res, Wrapped);

    return withRouter(res);
};