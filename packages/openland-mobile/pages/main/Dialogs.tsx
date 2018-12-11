import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext, DialogItemViewAsync } from '../../messenger/MobileMessenger';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZQuery } from '../../components/ZQuery';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { ASView } from 'react-native-async-view/ASView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ZLoader } from '../../components/ZLoader';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { RoomSearchTextQuery } from 'openland-api';

class DialogsSearch extends React.Component<{ query: string }> {
    render() {
        console.log('dialogs');
        console.log(this.props.query);
        return this.props.query.trim().length > 0 ? (
            <SRouterContext.Consumer>
                {r => (
                    <MobileMessengerContext.Consumer>
                        {engine => (
                            <ZQuery query={RoomSearchTextQuery} variables={{ query: this.props.query }}>
                                {resp => {

                                    if (resp.loading) {
                                        return <ZLoader />;
                                    }

                                    if (resp.data.items.length === 0) {
                                        return (
                                            <KeyboardSafeAreaView>
                                                <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No chats found' + randomEmptyPlaceholderEmoji()}</Text>
                                                </View>
                                            </KeyboardSafeAreaView>
                                        );

                                    }

                                    let data: DialogDataSourceItem[] = resp.data.items.map(d => {
                                        return {
                                            key: d.id,
                                            flexibleId: d.flexibleId,
                                            title: d.title,
                                            unread: 0,
                                            photo: d.photo,
                                            sender: undefined,
                                            message: undefined,
                                            date: undefined,
                                        } as DialogDataSourceItem;
                                    });
                                    console.warn(resp.data.items);

                                    return (
                                        <SScrollView keyboardDismissMode="on-drag">
                                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                                {data.map((item) => (
                                                    <ASView style={{ height: 48 }}>
                                                        <DialogItemViewAsync item={item} compact={true} onPress={() => r!!.push('Conversation', { id: item.key })} />
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
                <SHeaderButton title="New" icon={Platform.OS === 'ios' ? require('assets/ic-new.png') : require('assets/ic-edit.png')} onPress={() => this.props.router.push('ComposeInitial')} />
                {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
                <SSearchControler key={this.props.router.key + new Date().getTime()} searchRender={(props) => (<DialogsSearch query={props.query} />)}>
                    <MobileMessengerContext.Consumer>
                        {engine => (<DialogListComponent dialogs={engine.dialogs} />)}
                    </MobileMessengerContext.Consumer>
                </SSearchControler>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);