import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { PageProps } from './PageProps';
import { withRouter } from 'react-native-s/withRouter';
import { SHeaderAppearance, SHeader } from 'react-native-s/SHeader';
import { SHeaderSafeArea } from 'react-native-s/SHeaderSafeArea';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { View, Image, Text } from 'react-native';
import { ZButton } from './ZButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { QueryCacheProvider } from '@openland/spacex';
import { ZSuspense } from './ZSuspense';

function PageError(props: { refresh: () => void }) {
    let theme = React.useContext(ThemeContext);
    return (
        <>
            <HeaderConfigRegistrator config={{ appearance: 'small' }} />
            <SHeader title="Error" />
            <ASSafeAreaView flexGrow={1} alignContent="center" justifyContent="center">
                <View alignItems="center" justifyContent="center" paddingHorizontal={32} paddingVertical={16}>
                    <Image source={require('assets/art-error.png')} style={{ width: 240, height: 150, marginBottom: 4 }} />
                    <Text style={{ ...TextStyles.Title2, textAlign: 'center', color: theme.foregroundPrimary, marginBottom: 4, }} allowFontScaling={false}>Content is unavailable</Text>
                    <Text style={{ ...TextStyles.Body, textAlign: 'center', color: theme.foregroundSecondary, marginBottom: 16 }} allowFontScaling={false}>This content doesn’t exist or you don’t have an access</Text>
                    <ZButton
                        title="Try again"
                        onPress={props.refresh}
                    />
                </View>
            </ASSafeAreaView>
        </>
    );
}

class PageErrorBoundary extends React.Component<{}, { isError: boolean, retry: number }> {

    constructor(props: {}) {
        super(props);

        this.state = { isError: false, retry: 0 };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ isError: true });
    }

    private refresh = () => {
        this.setState({ isError: false, retry: this.state.retry + 1 });
    }

    render() {
        if (this.state.isError) {
            return (
                <PageError refresh={this.refresh} />
            );
        }
        return <View key={'try-' + this.state.retry} width="100%" height="100%">{this.props.children}</View>;
    }
}

export const withApp = (Wrapped: React.ComponentType<PageProps>, args?: { navigationAppearance?: SHeaderAppearance, hideBackText?: boolean, hideHairline?: boolean, backButtonRootFallback?: () => void }) => {

    let res = class WrappedPage extends React.Component<PageProps> {
        shouldComponentUpdate() {
            return false;
        }
        render() {
            return (
                <SHeaderSafeArea appearance={args && args.navigationAppearance || 'large'}>
                    {args && (args.hideBackText || args.hideHairline || args.backButtonRootFallback) && <SHeader hideBackText={args.hideBackText} hairline={args.hideHairline ? 'hidden' : undefined} backButtonRootFallback={args.backButtonRootFallback} />}
                    <QueryCacheProvider>
                        <PageErrorBoundary>
                            <ZSuspense>
                                <Wrapped {...this.props} />
                            </ZSuspense>
                        </PageErrorBoundary>
                    </QueryCacheProvider>
                </SHeaderSafeArea>
            );
        }
    };
    hoistNonReactStatics(res, Wrapped);

    return withRouter(res);
};