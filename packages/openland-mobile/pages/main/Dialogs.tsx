import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext } from '../../messenger/MobileMessenger';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';

class DialogsSearch extends React.Component<{ query: string }> {
    render() {
        return (
            <SScrollView keyboardDismissMode="on-drag">
                <View marginTop={0} backgroundColor="#f00"><Text>{this.props.query}</Text></View>
            </SScrollView>
        );
    }
}

class DialogsComponent extends React.Component<PageProps> {

    handleItemClick = (item: string) => {
        this.props.router.push('Conversation', { id: item });
    }

    render() {
        return (
            <>
                <SHeader title="Messages" />
                <SHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.router.push('ComposeModal')} />
                <SSearchControler searchRender={DialogsSearch}>
                    <MobileMessengerContext.Consumer>
                        {engine => (<DialogListComponent engine={engine} />)}
                    </MobileMessengerContext.Consumer>
                </SSearchControler>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);