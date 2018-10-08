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
import { DialogDataSourceItem, formatMessage } from 'openland-engines/messenger/DialogListEngine';
import { ZLoader } from '../../components/ZLoader';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';

class DialogsSearch extends React.Component<{ query: string }> {
    render() {
        return this.props.query.trim().length > 0 ? (
            <SRouterContext.Consumer>
                {r => (
                    <MobileMessengerContext.Consumer>
                        {engine => (
                            <ZQuery query={ChatSearchTextQuery} variables={{ query: this.props.query }}>
                                {resp => {

                                    if (resp.loading) {
                                        return <ZLoader />;
                                    }

                                    if (resp.data.items.length === 0) {
                                        return (
                                            <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No chats found' + randomEmptyPlaceholderEmoji()}</Text>
                                            </View>
                                        );

                                    }

                                    let data: DialogDataSourceItem[] = resp.data.items.map(d => {
                                        let isOut = d.topMessage ? d.topMessage.sender.id === engine.engine.user.id : undefined;
                                        let sender = d.topMessage ? isOut ? 'You' : d.topMessage.sender.name : undefined;
                                        return {
                                            key: d.id,
                                            flexibleId: d.flexibleId,
                                            title: d.title,
                                            type: d.__typename,
                                            unread: d.unreadCount,
                                            photo: d.photos[0],
                                            sender: sender,
                                            message: d.topMessage ? formatMessage(d.topMessage) : undefined,
                                            date: d.topMessage ? parseInt(d.topMessage.date, 10) : undefined,
                                        };
                                    });
                                    console.warn(resp.data.items);

                                    return (
                                        <SScrollView keyboardDismissMode="on-drag">
                                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                                {data.map((item) => (
                                                    <ASView style={{ height: 80 }}>
                                                        <DialogItemViewAsync item={item} onPress={() => r!!.push('Conversation', { id: item.key })} />
                                                    </ASView>
                                                ))}
                                            </View>

                                        </SScrollView>

                                    );
                                }}
                            </ZQuery>
                        )}
                    </MobileMessengerContext.Consumer>
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
                <SHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.router.push('ComposeInitial')} />
                <SSearchControler searchRender={<DialogsSearch query="" />}>
                    <MobileMessengerContext.Consumer>
                        {engine => (<DialogListComponent dialogs={engine.dialogs} />)}
                    </MobileMessengerContext.Consumer>
                </SSearchControler>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);