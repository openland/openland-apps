import * as React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';
// import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext } from '../../messenger/MobileMessenger';
// import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
// import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { SHeader } from 'react-native-s/SHeader';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';

function startAnimation() {
    LayoutAnimation.configureNext({
        duration: 540,
        update: {
            type: 'spring',
            springDamping: 50
        }
    });
}

class DialogsComponent extends React.Component<PageProps, { search: boolean }> {

    constructor(props: PageProps) {
        super(props);
        this.state = {
            search: false
        };
    }

    handleItemClick = (item: string) => {
        this.props.router.push('Conversation', { id: item });
    }

    handleSearchStart = () => {
        // startAnimation();
        this.setState({ search: true });
    }

    handleSearchStop = () => {
        // startAnimation();
        this.setState({ search: false });
    }

    render() {
        return (
            <>
                <SHeader title="Messages" />
                <HeaderConfigRegistrator
                    config={{
                        search: true,
                        searchActive: this.state.search,
                        searchClosed: this.handleSearchStop,
                        searchPress: this.handleSearchStart
                    }}
                />
                {/* 
                <FastHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.router.push('ComposeModal')} />
                <FastHeaderConfigRegistrator
                    config={new FastHeaderConfig({
                        search: true,
                        searchActive: this.state.search,
                        searchClosed: this.handleSearchStop, searchPress: this.handleSearchStart
                    })}
                /> */}
                <ASSafeAreaProvider top={44}>
                    <View style={{ flexGrow: 1, marginBottom: this.state.search ? -96 : 0 }}>
                        <MobileMessengerContext.Consumer>
                            {engine => (<DialogListComponent engine={engine} />)}
                        </MobileMessengerContext.Consumer>
                    </View>
                </ASSafeAreaProvider>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);