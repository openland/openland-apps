import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { MobileMessengerContext, DialogItemViewAsync } from '../../messenger/MobileMessenger';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text, Platform } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZQuery } from '../../components/ZQuery';
import { ASView } from 'react-native-async-view/ASView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ZLoader } from '../../components/ZLoader';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { RoomSearchTextQuery } from 'openland-api';
import { CenteredHeader } from './components/CenteredHeader';
import { SRouter } from 'react-native-s/SRouter';

class DialogsSearch extends React.Component<{ query: string, router: SRouter }> {
    render() {
        return this.props.query.trim().length > 0 ? (
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

                    return (
                        <SScrollView keyboardDismissMode="on-drag">
                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                {data.map((item) => (
                                    <ASView style={{ height: 48 }}>
                                        <DialogItemViewAsync item={item} compact={true} onPress={() => this.props.router.push('Conversation', { id: item.key })} />
                                    </ASView>
                                ))}
                            </View>

                        </SScrollView>

                    );
                }}
            </ZQuery>
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
                {Platform.OS === 'ios' && (
                    <SHeader title="Messages" />
                )}
                {Platform.OS === 'android' && (
                    <CenteredHeader title="Messages" padding={98} />
                )}
                <SHeaderButton title="New" icon={Platform.OS === 'ios' ? require('assets/ic-new.png') : require('assets/ic-edit.png')} onPress={() => this.props.router.push('ComposeInitial')} />
                {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
                <SSearchControler key={this.props.router.key + new Date().getTime()} searchRender={(props) => (<DialogsSearch query={props.query} router={this.props.router} />)}>
                    <MobileMessengerContext.Consumer>
                        {engine => (<DialogListComponent dialogs={engine.dialogs} />)}
                    </MobileMessengerContext.Consumer>
                </SSearchControler>
            </>
        );
    }
}

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });