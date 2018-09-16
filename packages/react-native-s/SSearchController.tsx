import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { View, Platform } from 'react-native';
import { SAnimatedView } from './SAnimatedView';
import UUID from 'uuid/v4';
import { SAnimatedShadowView } from './SAnimatedShadowView';

export class SSearchControler extends React.PureComponent<{}, { search: boolean }> {

    private containerShadowView = new SAnimatedShadowView(UUID());

    constructor(props: {}) {
        super(props);
        this.state = {
            search: false
        };
    }

    handleSearchStart = () => {
        this.setState({ search: true });
    }

    handleSearchStop = () => {
        this.setState({ search: false });
    }

    render() {

        const content = Platform.OS === 'ios'
            ? (
                <SAnimatedView name={this.containerShadowView.name} style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
                    <ASSafeAreaProvider top={44}>
                        <View style={{ flexGrow: 1, flexBasis: 0, width: '100%', marginBottom: this.state.search ? -96 : 0 }}>
                            {this.props.children}
                        </View>
                    </ASSafeAreaProvider>
                </SAnimatedView>
            )
            : (
                <View style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
                    {this.props.children}
                </View>
            );

        return (
            <>
                <HeaderConfigRegistrator
                    config={{
                        search: true,
                        searchActive: this.state.search,
                        searchClosed: this.handleSearchStop,
                        searchPress: this.handleSearchStart,
                        searchUnderlay: this.containerShadowView
                    }}
                />
                {content}
            </>
        );
    }
}