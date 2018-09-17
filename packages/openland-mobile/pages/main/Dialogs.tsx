import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext } from '../../messenger/MobileMessenger';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text, TouchableOpacity } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZQuery } from '../../components/ZQuery';
import { ChatSearchTextQuery } from 'openland-api';
import { SRouter } from 'react-native-s/SRouter';
import { SRouterContext } from 'react-native-s/SRouterContext';

class DialogsSearch extends React.Component<{ query: string }> {
    render() {
        if (this.props.query.trim().length > 0) {
            return (
                <SRouterContext.Consumer>
                    {r => (
                        <ZQuery query={ChatSearchTextQuery} variables={{ query: this.props.query }}>
                            {resp => {
                                return (
                                    <SScrollView keyboardDismissMode="on-drag">
                                        {resp.data.items.map((v) => (
                                            <TouchableOpacity onPress={() => r!!.push('Conversation', { id: v.id })}>
                                                <View marginTop={0} height={56}><Text>{v.title}</Text></View>
                                            </TouchableOpacity>
                                        ))}
                                    </SScrollView>
                                );
                            }}
                        </ZQuery>
                    )}
                </SRouterContext.Consumer>
            );
        } else {
            return null;
        }
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