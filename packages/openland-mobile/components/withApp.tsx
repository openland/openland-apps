import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { PageProps } from './PageProps';
import { withRouter } from 'react-native-s/withRouter';
import { SHeaderAppearance, SHeader } from 'react-native-s/SHeader';
import { SHeaderSafeArea } from 'react-native-s/SHeaderSafeArea';
import { ZLoader } from './ZLoader';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { View, Image, Text } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';

function PageError(props: { refresh: () => void }) {
    let theme = React.useContext(ThemeContext);
    return (
        <>
            <HeaderConfigRegistrator config={{ appearance: 'small' }} />
            <SHeader title="Error" />
            <ASSafeAreaView flexGrow={1} paddingHorizontal={16}>
                <View height="73%" alignItems="center" justifyContent="center">
                    <Image source={theme.type === 'Light' ? require('assets/img-empty.png') : require('assets/img-empty-dark.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                    <Text style={{ textAlign: 'center', fontSize: 22, lineHeight: 28, color: theme.foregroundPrimary, marginBottom: 10, fontWeight: FontStyles.Weight.Medium }} allowFontScaling={false}>Content is unavailable</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, color: theme.foregroundSecondary }} allowFontScaling={false}>This content doesn't exist or you don't have permission to view it</Text>
                </View>
                <View height="27%" alignItems="center" justifyContent="center">
                    <View width={118}>
                        <ZRoundedButton
                            // size="large"
                            title="Try again"
                            onPress={props.refresh}
                        />
                    </View>
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
                    {args && (args.hideBackText || args.hideHairline || args.backButtonRootFallback) && <SHeader hideBackText={args.hideBackText} hairline={args.hideHairline ? 'hidden' : undefined} backButtonRootFallback={args.backButtonRootFallback}/>}
                    <ClientCacheProvider>
                        <PageErrorBoundary>
                            <React.Suspense fallback={<ZLoader />} >
                                <Wrapped {...this.props} />
                            </React.Suspense>
                        </PageErrorBoundary>
                    </ClientCacheProvider>
                </SHeaderSafeArea>
            );
        }
    };
    hoistNonReactStatics(res, Wrapped);

    return withRouter(res);
};