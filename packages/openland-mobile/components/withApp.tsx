import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { PageProps } from './PageProps';
import { withRouter } from 'react-native-s/withRouter';
import { SHeaderAppearance, SHeader } from 'react-native-s/SHeader';
import { SHeaderSafeArea } from 'react-native-s/SHeaderSafeArea';
import { ZLoader } from './ZLoader';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { View, Image, Text, TextStyle } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SRouter } from 'react-native-s/SRouter';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

function PageError(props: { router: SRouter }) {
    let theme = React.useContext(ThemeContext);
    return (
        <>
            <SHeader title="Content is unavailable" />
            <ASSafeAreaView flexGrow={1} paddingHorizontal={16}>
                <View height="73%" alignItems="center" justifyContent="center">
                    <Image source={require('assets/img-empty.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                    <Text style={{ textAlign: 'center', fontSize: 22, lineHeight: 28, color: theme.textColor, marginBottom: 10, fontWeight: TextStyles.weight.medium } as TextStyle} allowFontScaling={false}>Content is unavailable</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, color: theme.textColor, opacity: 0.6 }} allowFontScaling={false}>This content doesn't exist or you don't have permission to view it</Text>
                </View>
                <View height="27%" alignItems="center" justifyContent="center">
                    <View width={118}>
                        <ZRoundedButton
                            size="large"
                            title="Go back"
                            uppercase={false}
                            onPress={() => props.router.back()}
                        />
                    </View>
                </View>
            </ASSafeAreaView>
        </>
    )
}

class PageErrorBoundary extends React.Component<{ router: SRouter }, { isError: boolean }> {

    constructor(props: { router: SRouter }) {
        super(props)

        this.state = { isError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ isError: true });
    }

    render() {
        if (this.state.isError) {
            return (
                <PageError router={this.props.router} />
            )
        }
        return <>{this.props.children}</>
    }
}

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