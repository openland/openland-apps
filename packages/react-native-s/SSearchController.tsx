import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { View, Platform } from 'react-native';
import { SAnimatedView } from './SAnimatedView';
import UUID from 'uuid/v4';
import { SAnimatedShadowView } from './SAnimatedShadowView';
import { HeaderContextNone } from './navigation/HeaderContextNone';
import { SearchContext } from './navigation/SearchContext';
import { SNativeConfig } from './SNativeConfig';
import { SDevice } from './SDevice';
import { AppTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface SSearchControlerProps {
    backgroundColor?: string;
    searchRender: React.ComponentType<{ query: string }>;
}

class SSearchControlerComponent extends React.PureComponent<SSearchControlerProps & { theme: AppTheme }, { search: boolean, searchMounted: boolean, query: string }> {

    private containerShadowView = new SAnimatedShadowView(UUID());
    private searchShadowView = new SAnimatedShadowView(UUID());
    private searchContext: SearchContext;

    constructor(props: SSearchControlerProps & { theme: AppTheme }) {
        super(props);
        this.searchContext = new SearchContext(this.handleSearchChanged);
        this.state = {
            search: false,
            searchMounted: false,
            query: ''
        };
    }

    handleSearchStart = () => {
        this.setState({ search: true, searchMounted: true, query: '' });
    }

    handleSearchStop = () => {
        this.setState({ search: false, searchMounted: false });
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

        const Render = this.props.searchRender;
        const content = Platform.OS === 'ios'
            ? (
                <>
                    <SAnimatedView name={this.containerShadowView.name} style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>

                        <ASSafeAreaProvider top={48}>
                            <View style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
                                <View style={{ flexGrow: 1, flexBasis: 0, width: '100%', marginBottom: this.state.searchMounted ? -96 : 0 }}>
                                    {this.props.children}
                                </View>

                            </View>
                        </ASSafeAreaProvider>

                    </SAnimatedView>
                    <SAnimatedView
                        name={this.searchShadowView.name}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: this.props.backgroundColor || this.props.theme.backgroundColor }}
                        pointerEvents="box-none"
                    >
                        {this.state.searchMounted && (
                            // <ASSafeAreaContext.Provider value={{ top: SDevice.safeArea.top + 96, bottom: SDevice.safeArea.bottom, keyboardHeight: 0 }}>
                            //     <SContentContext>
                            <HeaderContextNone>
                                <ASSafeAreaProvider top={-SDevice.navigationBarHeight}>
                                    <View width="100%" height="100%">
                                        <React.Suspense fallback={SNativeConfig.loader}>
                                            <Render query={this.state.query} />
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
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: !this.state.query ? 'rgba(0,0,0,0.3)' : 'white' }}
                        >
                            <HeaderContextNone>
                                <ASSafeAreaProvider top={-56}>
                                    <View width="100%" height="100%">
                                        <React.Suspense fallback={SNativeConfig.loader}>
                                            <Render query={this.state.query} />
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
    return (<SSearchControlerComponent {...props} theme={theme} />);
});