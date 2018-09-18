import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext, DialogItemViewAsync } from '../../messenger/MobileMessenger';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text, TouchableOpacity } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZQuery } from '../../components/ZQuery';
import { ChatSearchTextQuery } from 'openland-api';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { ASView } from 'react-native-async-view/ASView';

class DialogsSearch extends React.Component<{ query: string }> {
    render() {
        return this.props.query.trim().length > 0 ? (
            <SRouterContext.Consumer>
                {r => (
                    <ZQuery query={ChatSearchTextQuery} variables={{ query: this.props.query }}>
                        {resp => {
                            let data = resp.data.items.map(d => ({ key: d.flexibleId, title: d.title, type: d.__typename, unread: d.unreadCount }));
                            console.warn(resp.data.items);

                            return (
                                <SScrollView keyboardDismissMode="on-drag">
                                    <View style={{ flexDirection: 'column', width: '100%'}}>
                                        {data.map((item) => (
                                            <ASView style={{ height: 100 }}>
                                                <DialogItemViewAsync item={item} onPress={() => r!!.push('Conversation', { id: item.key })} />
                                            </ASView>
                                            // <View><Text>{item.key}</Text></View>
                                        ))}
                                    </View>

                                </SScrollView>

                            );
                        }}
                    </ZQuery>
                )}
            </SRouterContext.Consumer>
        ) : null;
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
                        {engine => (<DialogListComponent dialogs={engine.dialogs} />)}
                    </MobileMessengerContext.Consumer>
                </SSearchControler>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);