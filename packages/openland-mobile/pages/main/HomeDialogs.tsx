import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { DialogItemViewAsync } from '../../messenger/MobileMessenger';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text, Platform } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASView } from 'react-native-async-view/ASView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { CenteredHeader } from './components/CenteredHeader';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { getMessenger } from 'openland-mobile/utils/messenger';

const DialogsSearch = React.memo<{ query: string, router: SRouter }>((props) => {
    if (props.query.trim().length === 0) {
        return null;
    }

    let search = getClient().useRoomSearchText({ query: props.query });

    if (search.items.length === 0) {
        return (
            <ASSafeAreaView>
                <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No chats found' + randomEmptyPlaceholderEmoji()}</Text>
                </View>
            </ASSafeAreaView>
        );

    }

    let data: DialogDataSourceItem[] = search.items.map(d => {
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
                        <DialogItemViewAsync item={item} compact={true} onPress={() => props.router.push('Conversation', { id: item.key })} />
                    </ASView>
                ))}
            </View>
        </SScrollView>
    );
});

const DialogsComponent = React.memo<PageProps>((props) => {
    return (
        <>
            {Platform.OS === 'ios' && (
                <SHeader title="Messages" />
            )}
            {Platform.OS === 'android' && (
                <CenteredHeader title="Messages" padding={98} />
            )}
            <SHeaderButton
                title="New"
                icon={Platform.OS === 'ios' ? require('assets/ic-new.png') : require('assets/ic-edit.png')}
                onPress={() => props.router.push('Compose')}
            />

            {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
            <SSearchControler
                key={props.router.key + new Date().getTime()}
                searchRender={(p) => (<DialogsSearch query={p.query} router={props.router} />)}
            >
                <DialogListComponent dialogs={getMessenger().dialogs} />
            </SSearchControler>
        </>
    );
});

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });