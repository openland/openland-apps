import * as React from 'react';
import { View } from 'react-native';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext } from '../../messenger/MobileMessenger';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { SHeader } from 'react-native-s/SHeader';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

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
                <SHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.router.push('ComposeModal')} />
                <HeaderConfigRegistrator
                    config={{
                        search: true,
                        searchActive: this.state.search,
                        searchClosed: this.handleSearchStop,
                        searchPress: this.handleSearchStart
                    }}
                />
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