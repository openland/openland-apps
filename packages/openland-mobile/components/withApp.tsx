import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { PageProps } from './PageProps';
import { withRouter } from 'react-native-s/withRouter';
import { SHeaderAppearance, SHeader } from 'react-native-s/SHeader';
import { SHeaderSafeArea } from 'react-native-s/SHeaderSafeArea';
import { ZLoader } from './ZLoader';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';

export const withApp = (Wrapped: React.ComponentType<PageProps>, args?: { navigationAppearance?: SHeaderAppearance, hideBackText?: boolean, hideHairline?: boolean }) => {

    let res = class WrappedPage extends React.Component<PageProps> {
        shouldComponentUpdate() {
            return false;
        }
        render() {
            return (
                <SHeaderSafeArea appearance={args && args.navigationAppearance || 'large'}>
                    {args && args.hideBackText && <SHeader hideBackText={true} />}
                    {args && args.hideHairline && <SHeader hairline="hidden" />}
                    <ClientCacheProvider>
                        <React.Suspense fallback={<ZLoader />} >
                            <Wrapped {...this.props} />
                        </React.Suspense>
                    </ClientCacheProvider>
                </SHeaderSafeArea>
            );
        }
    };
    hoistNonReactStatics(res, Wrapped);

    return withRouter(res);
};