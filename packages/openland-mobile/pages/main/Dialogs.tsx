import * as React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext } from '../../messenger/MobileMessenger';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { ZSafeAreaProvider } from '../../components/layout/ZSafeAreaContext';

function startAnimation() {
    LayoutAnimation.configureNext({
        duration: 500,
        update: {
            type: 'easeInEaseOut',
            duration: 340
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
        startAnimation();
        this.setState({ search: true });
    }

    handleSearchStop = () => {
        startAnimation();
        this.setState({ search: false });
    }

    render() {
        return (
            <>
                <FastHeader title="Messages" />
                <FastHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.router.push('ComposeModal')} />
                <FastHeaderConfigRegistrator
                    config={new FastHeaderConfig({
                        search: true,
                        searchActive: this.state.search,
                        searchClosed: this.handleSearchStop, searchPress: this.handleSearchStart
                    })}
                />
                <ZSafeAreaProvider top={44}>
                    <View style={{ flexGrow: 1, marginTop: this.state.search ? -88 : 0 }}>
                        <MobileMessengerContext.Consumer>
                            {engine => (<DialogListComponent engine={engine} />)}
                        </MobileMessengerContext.Consumer>
                    </View>
                </ZSafeAreaProvider>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);