import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { View, Platform } from 'react-native';
import { SAnimatedView, SAnimatedShadowView } from 'react-native-fast-animations';
import UUID from 'uuid/v4';
import { HeaderContextNone } from './navigation/HeaderContextNone';
import { SearchContext } from './navigation/SearchContext';
import { SNativeConfig } from './SNativeConfig';
import { SDevice } from './SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SSearchControllerRefContext } from 'openland-mobile/pages/main/Home';

export interface SSearchControlerProps {
    backgroundColor?: string;
    searchRender: (params: { query: string }) => JSX.Element;
    children?: any;
    openOnMount?: boolean;
    onSearchClose?: () => void;
}

export class SSearchControlerComponent extends React.PureComponent<SSearchControlerProps & { theme: ThemeGlobal }, { search: boolean, searchMounted: boolean, query: string }> {

    private containerShadowView = new SAnimatedShadowView(UUID());
    private searchShadowView = new SAnimatedShadowView(UUID());
    private searchContext: SearchContext;

    constructor(props: SSearchControlerProps & { theme: ThemeGlobal }) {
        super(props);
        this.searchContext = new SearchContext(this.handleSearchChanged);
        this.state = {
            search: !!props.openOnMount,
            searchMounted: !!props.openOnMount,
            query: ''
        };
    }

    handleSearchStart = () => {
        this.setState({ search: true, searchMounted: true, query: '' });
    }

    handleSearchStop = () => {
        if (this.props.onSearchClose) {
            this.props.onSearchClose();
        } else {
            this.setState({ search: false, searchMounted: false });
        }
    }

    handleSearchStopCompleted = () => {
        this.setState({ search: false, searchMounted: false, query: '' });
        this.searchContext.value = '';
        if (this.searchContext.headerOnChanged) {
            this.searchContext.headerOnChanged!();
        }
    }

    handleSearchChanged = () => {
        this.setState({ query: this.searchContext.value });
    }

    render() {
        const content = Platform.OS === 'ios'
            ? (
                <>
                    <SAnimatedView name={this.containerShadowView.name} style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>

                        <ASSafeAreaProvider top={52}>
                            <View style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
                                <View style={{ flexGrow: 1, flexBasis: 0, width: '100%', marginBottom: this.state.searchMounted ? -96 : 0 }}>
                                    {this.props.children}
                                </View>

                            </View>
                        </ASSafeAreaProvider>

                    </SAnimatedView>
                    <SAnimatedView
                        name={this.searchShadowView.name}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: this.props.backgroundColor || this.props.theme.backgroundPrimary }}
                        pointerEvents="box-none"
                    >
                        {this.state.searchMounted && (
                            // <ASSafeAreaContext.Provider value={{ top: SDevice.safeArea.top + 96, bottom: SDevice.safeArea.bottom, keyboardHeight: 0 }}>
                            //     <SContentContext>
                            <HeaderContextNone>
                                <ASSafeAreaProvider top={-SDevice.navigationBarHeight}>
                                    <View width="100%" height="100%">
                                        <React.Suspense fallback={SNativeConfig.loader}>
                                            {this.props.searchRender({ query: this.state.query })}
                                        </React.Suspense>
                                    </View>
                                </ASSafeAreaProvider>
                            </HeaderContextNone>
                            //     </SContentContext>
                            // </ASSafeAreaContext.Provider>
                        )}
                    </SAnimatedView>
                </>
            )
            : (
                <View style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
                    {this.props.children}
                    {this.state.searchMounted && (
                        <SAnimatedView
                            name={this.searchShadowView.name}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: !this.state.query ? this.props.theme.overlayMedium : this.props.theme.backgroundPrimary }}
                        >
                            <HeaderContextNone>
                                <ASSafeAreaProvider top={-56}>
                                    <View width="100%" height="100%">
                                        <React.Suspense fallback={SNativeConfig.loader}>
                                            {this.props.searchRender({ query: this.state.query })}
                                        </React.Suspense>
                                    </View>
                                </ASSafeAreaProvider>
                            </HeaderContextNone>
                        </SAnimatedView>
                    )}
                </View>
            );

        return (
            <>
                <HeaderConfigRegistrator
                    config={{
                        search: true,
                        searchActive: this.state.search,
                        searchClosed: this.handleSearchStop,
                        searchClosingCompleted: this.handleSearchStopCompleted,
                        searchPress: this.handleSearchStart,
                        searchUnderlay: this.containerShadowView,
                        searchContainer: this.searchShadowView,
                        searchContext: this.searchContext
                    }}
                />
                {content}
            </>
        );
    }
}

export const SSearchControler = React.memo<SSearchControlerProps>((props) => {
    let theme = React.useContext(ThemeContext);
    const searchControllerRef = React.useContext(SSearchControllerRefContext);
    return (<SSearchControlerComponent {...props} theme={theme} ref={searchControllerRef} />);
});